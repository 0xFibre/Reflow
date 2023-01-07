module slide::error {
    const ERROR_PREFIX: u64 = 2002;

    public fun zero_deposit(): u64 {
        ERROR_PREFIX + 0
    }

    public fun invalid_start_time(): u64 {
        ERROR_PREFIX + 1
    }

    public fun invalid_duration(): u64 {
        ERROR_PREFIX + 2
    }
    
    public fun address_unknown(): u64 {
        ERROR_PREFIX + 3
    }

    public fun balance_exceeded(): u64 {
        ERROR_PREFIX + 4
    }

    public fun stream_id_mismatch(): u64 {
        ERROR_PREFIX + 4
    }
}