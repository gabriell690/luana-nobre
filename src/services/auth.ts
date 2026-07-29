import { supabase } from "../lib/supabase";

export const AuthService = {

    signIn(email: string, password: string) {

        return supabase.auth.signInWithPassword({
            email,
            password,
        });

    },

    signOut() {

        return supabase.auth.signOut();

    },

};