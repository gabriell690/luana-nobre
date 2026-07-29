/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string | null;
}

interface AdminContextData {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext({} as AdminContextData);

export function AdminProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    setUser(user);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  useEffect(() => {
    refreshProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      refreshProfile();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AdminContext.Provider
      value={{
        user,
        profile,
        loading,
        refreshProfile,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}