module reflow::coin {
    use std::vector;

    use sui::coin::{Self, Coin};
    use sui::balance::{Balance};
    use sui::tx_context::{Self, TxContext};
    use sui::pay as payment;

    public fun transfer<T>(coin: &mut Coin<T>, amount: u64, recipient: address, ctx: &mut TxContext) {
        payment::split_and_transfer<T>(coin, amount, recipient, ctx)
    }

    public fun transfer_to_sender<T>(coin: &mut Coin<T>, amount: u64, ctx: &mut TxContext) {
        payment::split_and_transfer<T>(coin, amount, tx_context::sender(ctx), ctx)
    }

    public fun join_multiple<T>(coins: vector<Coin<T>>): Coin<T> {
        let coin = vector::pop_back(&mut coins);
        payment::join_vec(&mut coin, coins);

        coin
    }

    public fun transfer_multiple<T>(coins: vector<Coin<T>>, amount: u64, recipient: address, ctx: &mut TxContext) {
        let coin = join_multiple<T>(coins);
        transfer<T>(&mut coin, amount, recipient, ctx);
        payment::keep(coin, ctx);
    }

    public fun multiple_into_balance<T>(coins: vector<Coin<T>>): Balance<T> {
        let coin = join_multiple<T>(coins);
        coin::into_balance(coin)
    }
}