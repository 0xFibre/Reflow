module slide::stream {
    use std::option::Option;
    use std::vector;

    use sui::object::{Self, UID, ID};
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event::emit;
    use sui::table::{Self, Table};


    use slide::error;

    struct StreamRegistry has key {
        id: UID,
        all_streams: vector<ID>,
        user_incoming_streams: Table<address, vector<ID>>,
        user_outgoing_streams: Table<address, vector<ID>>,
    }

    struct Stream<phantom T> has key {
        id: UID,
        sender: address,
        recipient: address,
        stream_per_second: u64,
        amount_withdrawn: u64,
        start_time: u64,
        end_time: u64,
        cliff: Option<u64>,
        status: u8,
        deposit: Balance<T>,
    }

    struct AccessCap has key {
        id: UID,
        type: u8,
        stream_id: ID
    }

    struct CreateStream has copy, drop {
        id: ID
    }

    struct WithdrawFromStream has copy, drop {
        id: ID,
        amount: u64
    }

    struct CloseStream has copy, drop {
        id: ID
    }

    fun init(ctx: &mut TxContext) {
        let stream_registry = StreamRegistry {
            id: object::new(ctx),
            all_streams: vector::empty(),
            user_incoming_streams: table::new(ctx),
            user_outgoing_streams: table::new(ctx),
        };

        transfer::share_object(stream_registry);
    }

    fun new<T>(deposit: Balance<T>, recipient: address, stream_per_second: u64, start_time: u64, end_time: u64, cliff: Option<u64>, ctx: &mut TxContext): Stream<T> {
        let stream = Stream<T> {
            id: object::new(ctx),
            sender: tx_context::sender(ctx),
            amount_withdrawn: 0,
            status: 0,
            stream_per_second,
            start_time,
            end_time,
            cliff,
            deposit,
            recipient,
        };

        stream
    }

    public entry fun create_stream<T>(registry: &mut StreamRegistry, amount: u64, coin: &mut Coin<T>, recipient: address, start_time: u64, end_time: u64, cliff: Option<u64>, now: u64, ctx: &mut TxContext) {
        assert!(amount != 0, error::zero_deposit());
        assert!(start_time >= now, error::invalid_start_time());
        assert!(start_time < end_time, error::invalid_duration());

        let balance = balance::zero<T>();
        let deposit = coin::take(coin::balance_mut(coin), amount, ctx);
        balance::join(&mut balance, coin::into_balance(deposit));

        let stream_per_second = amount / (end_time - start_time);
        let stream = new<T>(balance, recipient, stream_per_second, start_time, end_time, cliff, ctx);

        vector::push_back(&mut registry.all_streams, object::id(&stream));
        register_outgoing_stream(registry, tx_context::sender(ctx), object::id(&stream));
        register_incoming_stream(registry, recipient, object::id(&stream));

        emit (
                CreateStream { 
                    id: object::id(&stream) 
                }
            );

        transfer::transfer(
            AccessCap { 
                id: object::new(ctx), 
                stream_id: object::id(&stream), 
                type: 0 
            }, 
            tx_context::sender(ctx)
        );
        transfer::transfer(
            AccessCap { 
                id: object::new(ctx), 
                stream_id: object::id(&stream), 
                type: 1
            }, 
            recipient
        );
        transfer::share_object(stream);
    }

    public entry fun withdraw_from_stream<T>(self: &mut Stream<T>, cap: &AccessCap, amount: u64, now: u64, ctx: &mut TxContext) {
        assert!(object::borrow_id(self) == &cap.stream_id, error::stream_id_mismatch());

        let recipient = self.recipient;
        let recipient_amount = balance_of<T>(self, recipient, now);
        
        assert!(recipient_amount <= amount, error::balance_exceeded());

        let withdrawal = balance::split(&mut self.deposit, amount);

        if(balance::value(&self.deposit) == 0) self.status = 1;
        self.amount_withdrawn = self.amount_withdrawn + amount;
        
        emit (
            WithdrawFromStream { 
                id: object::id(self),
                amount
            }
        );

        transfer::transfer(coin::from_balance(withdrawal, ctx), self.recipient);
    }

    public entry fun close_stream<T>(self: &mut Stream<T>, cap: &AccessCap, now: u64, ctx: &mut TxContext) {
        assert!(object::borrow_id(self) == &cap.stream_id, error::stream_id_mismatch());

        let sender = self.sender;
        let recipient = self.recipient;

        let recipient_amount = balance_of<T>(self, recipient, now);
        let recipient_balance = balance::split(&mut self.deposit, recipient_amount);

        let remaining_balance = balance::value(&self.deposit);
        let sender_balance = balance::split(&mut self.deposit, remaining_balance);

        emit (
            CloseStream { 
                id: object::id(self)
            }
        );

        transfer::transfer(coin::from_balance(sender_balance, ctx), sender);
        transfer::transfer(coin::from_balance(recipient_balance, ctx), recipient);
    }

    fun balance_of<T>(self: &Stream<T>, address: address, now: u64): u64 {
        let delta = delta(self, now);
        let balance = delta * self.stream_per_second;
        let recipient_balance = balance - self.amount_withdrawn;

        if(address == self.sender) {
            let available_balance = available_balance(self);
            available_balance - recipient_balance
        } else if(address == self.recipient) {
            recipient_balance
        } else {
            abort error::address_unknown()
        }
    }

    fun available_balance<T>(self: &Stream<T>): u64 {
        balance::value(&self.deposit) - self.amount_withdrawn
    }

    fun delta<T>(self: &Stream<T>, now: u64): u64 {
        if(self.start_time >= now) {
            0
        } else if(self.end_time > now) {
            now - self.start_time
        } else {
            self.end_time - self.start_time 
        }
    }

    fun register_incoming_stream(registry: &mut StreamRegistry, address: address, id: ID) {
        if(table::contains(&registry.user_incoming_streams, address)) {
            let streams = table::borrow_mut(&mut registry.user_incoming_streams, address);
            vector::push_back(streams, id);
        } else {
            let streams = vector::empty<ID>();
            vector::push_back(&mut streams, id);
            table::add(&mut registry.user_incoming_streams, address, streams);
        }
    }

    fun register_outgoing_stream(registry: &mut StreamRegistry, address: address, id: ID) {
        if(table::contains(&registry.user_outgoing_streams, address)) {
            let streams = table::borrow_mut(&mut registry.user_outgoing_streams, address);
            vector::push_back(streams, id);
        } else {
            let streams = vector::empty<ID>();
            vector::push_back(&mut streams, id);
            table::add(&mut registry.user_outgoing_streams, address, streams);
        }
    }
}