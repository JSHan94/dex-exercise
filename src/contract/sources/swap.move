module addr::dex {
    use aptos_framework::account;
    use std::signer;
    use aptos_framework::event;
    
    const E_NOT_INITIALIZED: u64 = 1;

    struct SwapStore has key {
        balance: u64,
        swap_events: event::EventHandle<SwapEvent>
    }

    struct SwapEvent has drop, store, copy {
        swap: u64,
        address: address
    }

    public entry fun create_store(account: &signer){
        let swap_store = SwapStore {
            balance : 0,
            swap_events: account::new_event_handle<SwapEvent>(account),
        };
        move_to(account, swap_store);
    }

    public entry fun create_swap(
        account: &signer,
        amount: u64
    ) acquires SwapStore {
        let signer_address = signer::address_of(account);
        assert!(exists<SwapStore>(signer_address), E_NOT_INITIALIZED);
        let swap_store = borrow_global_mut<SwapStore>(signer_address);
        let new_balance = swap_store.balance + amount;
        swap_store.balance = new_balance;
        let new_swap = SwapEvent {
            swap: amount,
            address: signer_address
        };
        event::emit_event<SwapEvent>(
            &mut borrow_global_mut<SwapStore>(signer_address).swap_events,
            new_swap
        );
    }

    #[test(admin = @0x123)]
    public entry fun swap_10(admin: signer) acquires SwapStore {
        account::create_account_for_test(signer::address_of(&admin));
        create_store(&admin);
        let swap_store = borrow_global_mut<SwapStore>(signer::address_of(&admin));
        assert!(swap_store.balance == 0, 1);
        
        create_swap(&admin, 10);
        let swap_store = borrow_global_mut<SwapStore>(signer::address_of(&admin));
        assert!(swap_store.balance == 10, 2);
    }
}