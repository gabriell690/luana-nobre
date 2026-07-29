import { supabase } from "../lib/supabase";

export interface LoginResult {
  success: boolean;
  message?: string;
}

class AdminAuthService {
  async login(email: string, password: string): Promise<LoginResult> {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        message: "Email ou senha inválidos.",
      };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "Usuário não encontrado.",
      };
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();

      return {
        success: false,
        message: "Perfil não encontrado.",
      };
    }

    if (profile.role !== "admin") {
      await supabase.auth.signOut();

      return {
        success: false,
        message: "Você não possui permissão para acessar este painel.",
      };
    }

    return {
      success: true,
    };
  }

  async logout() {
    await supabase.auth.signOut();
  }

  async session() {
    return supabase.auth.getSession();
  }

  async user() {
    return supabase.auth.getUser();
  }
}

export const adminAuth = new AdminAuthService();