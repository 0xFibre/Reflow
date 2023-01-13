module reflow::stream {
    use std::option::{Self, Option};
    use std::string::{Self, String};
    use std::type_name;
    use std::vector;

    use sui::object::{Self, UID, ID};
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event::emit;

    use reflow::error;
    use reflow::registry::{Self, Registry};
    use reflow::fraction::{Self, Fraction};
    use reflow::coin as coin_helper;

    const STREAM_ACTIVE_STATUS: u8 = 0;
    const STREAM_COMPLETED_STATUS: u8 = 1;
    const STREAM_CANCELED_STATUS: u8 = 2;

    struct Stream<phantom T> has key {
        id: UID,
        sender: address,
        recipient: address,
        amount_per_second: Fraction,
        withdrawn_amount: u64,
        deposited_amount: u64,
        created_at: u64,
        starts_at: u64,
        ends_at: u64,
        canceled_at: Option<u64>,
        status: u8,
        balance: Balance<T>,
        coin_type: String
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

    struct StopStream has copy, drop {
        id: ID
    }

    fun init(ctx: &mut TxContext) {
        let registry = registry::new(ctx);
        transfer::share_object(registry);
    }

    fun new<T>(balance: Balance<T>, recipient: address, amount_per_second: Fraction, starts_at: u64, ends_at: u64, now: u64, ctx: &mut TxContext): Stream<T> {
        let id = object::new(ctx);
        let sender = tx_context::sender(ctx);
        let deposited_amount = balance::value(&balance);
        let canceled_at = option::none<u64>();
        let coin_type = string::from_ascii(type_name::into_string(type_name::get<T>()));

        Stream<T> {
            id,
            sender ,
            ends_at,
            balance,
            starts_at,
            recipient,
            coin_type,
            canceled_at,
            created_at: now,
            deposited_amount,
            amount_per_second,
            withdrawn_amount: 0,
            status: STREAM_ACTIVE_STATUS
        }
    }

    public entry fun create_stream<T>(registry: &mut Registry, amount: u64, coin: &mut Coin<T>, recipient: address, starts_at: u64, ends_at: u64, now: u64, ctx: &mut TxContext) {
        assert!(amount != 0, error::zero_deposit());
        assert!(starts_at >= now, error::invalid_start_time());
        assert!(starts_at < ends_at, error::invalid_duration());
        assert!(tx_context::sender(ctx) != recipient, error::self_streaming());

        let balance = coin_helper::split_into_balance<T>(coin, amount, ctx);
        let amount_per_second = fraction::new(amount, (ends_at - starts_at));
        let stream = new<T>(balance, recipient, amount_per_second, starts_at, ends_at, now, ctx);

        vector::push_back(registry::borrow_all_streams_mut(registry), object::id(&stream));
        
        registry::register_stream(registry::borrow_outgoing_streams_mut(registry), tx_context::sender(ctx), object::id(&stream));
        registry::register_stream(registry::borrow_incoming_streams_mut(registry), recipient, object::id(&stream));

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
        
        assert!(recipient_amount >= amount, error::balance_exceeded());

        let withdrawal = balance::split(&mut self.balance, amount);

        if(balance::value(&self.balance) == 0) {
            self.status = STREAM_COMPLETED_STATUS;
        };
        self.withdrawn_amount = self.withdrawn_amount + amount;
        
        emit (
            WithdrawFromStream { 
                id: object::id(self),
                amount
            }
        );

        transfer::transfer(coin::from_balance(withdrawal, ctx), self.recipient);
    }

    public entry fun cancel_stream<T>(self: &mut Stream<T>, cap: &AccessCap, now: u64, ctx: &mut TxContext) {
        assert!(object::borrow_id(self) == &cap.stream_id, error::stream_id_mismatch());

        let sender = self.sender;
        let recipient = self.recipient;

        let recipient_amount = balance_of<T>(self, recipient, now);
        if(recipient_amount > 0) {
            let recipient_balance = balance::split(&mut self.balance, recipient_amount);
            self.withdrawn_amount = self.withdrawn_amount + recipient_amount;

            transfer::transfer(coin::from_balance(recipient_balance, ctx), recipient);
        };

        if(balance::value(&self.balance) > 0) {
            let return_amount = balance::value(&self.balance);
            let sender_balance = balance::split(&mut self.balance, return_amount);

            transfer::transfer(coin::from_balance(sender_balance, ctx), sender);
        };

        self.status = STREAM_CANCELED_STATUS;
        option::fill(&mut self.canceled_at, now);

        emit (
            StopStream { 
                id: object::id(self)
            }
        );
    }

    fun balance_of<T>(self: &mut Stream<T>, address: address, now: u64): u64 {
        let delta = delta(self, now);
        let amount_streamed = fraction::multiply_into(&self.amount_per_second, delta);
        let recipient_balance = amount_streamed - self.withdrawn_amount;

        if(address == self.sender) {
            balance::value(&self.balance) - recipient_balance
        } else if(address == self.recipient) {
            recipient_balance
        } else {
            abort error::address_unknown()
        }
    }

    fun delta<T>(self: &mut Stream<T>, now: u64): u64 {
        if(self.starts_at >= now) {
            0
        } else if(option::is_some(&self.canceled_at)) {
            option::extract(&mut self.canceled_at) - now
        } else if(self.ends_at > now) {
            now - self.starts_at
        } else {
            self.ends_at - self.starts_at 
        }
    }
}