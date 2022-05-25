import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

import Admins "Admins";

module {

    public class Factory (state : State) {

        ////////////
        // State //
        //////////

        var registry = HashMap.HashMap<Principal, Metadata>(0, Principal.equal, Principal.hash);

        /// Returns all state of the registry module.
        public func backup () : StableState {
            {
                s_registry = Iter.toArray(registry.entries());
            }
        };

        /// Restores state of registry module from backup.
        public func restore (
            backup : StableState,
        ) : () {
            for (canister in state.s_registry.vals()) {
                registry.put(canister);
            };
        };


        /////////////////
        // Public API //
        ///////////////


        public func name () : Text {
            "Tarot Decks";
        };

        public func get (
            principal : Principal,
        ) : ?Metadata {
            return registry.get(principal);
        };

        public func getAll () : [Metadata] {
            return Iter.toArray(registry.vals());
        };


        //////////////////
        // Private API //
        ////////////////


        public func add (
            caller : Principal,
            metadata : Metadata,
        ) : Response {
            // TODO: Enforce certain deck properties, isDeck property. Separate bazaar dab?
            if (not state._Admins._isAdmin(caller)) {
                return #Err(#NotAuthorized);
            };
            state._log(caller, "add", "ADMIN :: new canister " # Principal.toText(metadata.principal_id));
            registry.put(metadata.principal_id, metadata);
            #Ok(null);
        };

        public func remove (
            caller : Principal,
            principal : Principal,
        ) : Response {
            if (not state._Admins._isAdmin(caller)) {
                return #Err(#NotAuthorized);
            };
            state._log(caller, "remove", "ADMIN :: removed canister " # Principal.toText(principal));
            registry.delete(principal);
            #Ok(null);
        };

    };


    ////////////
    // Types //
    //////////


    /// Stable state utilized by this module.
    public type StableState = {
        s_registry : [(Principal, Metadata)];
    };

    /// External state and functions utilized by this module.
    public type Dependencies = {
        _log : (caller  : Principal, method  : Text, message : Text) -> ();
        _Admins : Admins.Factory;
    };

    /// Total state utilized by this module.
    public type State = StableState and Dependencies;


    // The DAB registry standard interface
    // https://github.com/Psychedelic/dab/blob/278f25c20ad426c58f8d97dfa352c20dfb9999de/candid/STANDARD.md

    public type DabRegistry = actor {
        name   : query () -> async (Text);
        
        get    : query (Principal) -> async (?Metadata);
        add    : (Metadata) -> async (Response);
        remove : (Principal) -> async (Response);
    };

    type DetailValue = {
        #True;
        #False;
        #I64       : Int64;
        #U64       : Nat64;
        #Vec       : [DetailValue];
        #Slice     : [Nat8];
        #Text      : Text;
        #Float     : Float;
        #Principal : Principal;
    };

    public type Metadata = {
        name         : Text;
        description  : Text;
        thumbnail    : Text;
        frontend     : ?Text;
        principal_id : Principal;
        details      : [(Text, DetailValue)];
    };

    type Error = {
        #NotAuthorized;
        #NonExistentItem;
        #BadParameters;
        #Unknown : Text;
    };

    public type Response = {
        #Ok  : ?Text;
        #Err : Error;
    };
}