import { type FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { adminAuth } from "../../services/adminAuth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

 useEffect(() => {
  async function checkSession() {
    try {
      const session = await adminAuth.session();

      console.log(session);

      if (session?.data?.session) {
        navigate("/admin", { replace: true });
        return;
      }
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
    } finally {
      setCheckingSession(false);
    }
  }

  checkSession();
}, [navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await adminAuth.login(email, password);

    setLoading(false);

    if (!result.success) {
      setError(result.message || "Não foi possível entrar.");
      return;
    }

    navigate("/admin", {
      replace: true,
    });
  }

  if (checkingSession) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FAF8F4]">
        <div className="text-zinc-600 font-medium">
          Verificando sessão...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-[#FAF8F4] via-white to-[#F4EFE6]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Painel */}

        <section className="hidden lg:flex flex-col justify-between bg-[#1A1A1A] p-16 text-white">

          <div>

            <span className="uppercase tracking-[8px] text-[#C89A2D] text-sm">
              Luana Nobre
            </span>

            <h1 className="mt-8 text-6xl font-black leading-tight">
              Painel
              <br />
              Administrativo
            </h1>

            <p className="mt-8 max-w-md text-zinc-300 leading-8">
              Gerencie pedidos, produtos, banners,
              cupons, clientes e toda operação da loja.
            </p>

          </div>

          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Luana Nobre
          </p>

        </section>

        {/* Login */}

        <section className="flex items-center justify-center p-8">

          <div className="w-full max-w-107.5">

            <div className="mb-12 text-center">

              <h2 className="text-5xl font-black tracking-[8px]">
                LUANA
              </h2>

              <p className="mt-2 tracking-[12px] text-[#C89A2D]">
                NOBRE
              </p>

            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-[0_20px_60px_rgba(0,0,0,.08)]">

              <h3 className="text-3xl font-bold">
                Bem-vindo
              </h3>

              <p className="mt-2 text-zinc-500">
                Faça login para acessar o painel.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >

                <div>

                  <label className="text-sm font-medium">
                    Email
                  </label>

                  <div className="mt-2 flex h-14 items-center rounded-2xl border border-zinc-300 px-4 focus-within:border-[#C89A2D] focus-within:ring-4 focus-within:ring-[#C89A2D]/10">

                    <Mail
                      size={18}
                      className="text-zinc-400"
                    />

                    <input
                      type="email"
                      disabled={loading}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="adm@luananobre.com"
                      className="ml-3 flex-1 bg-transparent outline-none disabled:opacity-60"
                    />

                  </div>

                </div>

                <div>

                  <label className="text-sm font-medium">
                    Senha
                  </label>

                  <div className="mt-2 flex h-14 items-center rounded-2xl border border-zinc-300 px-4 focus-within:border-[#C89A2D] focus-within:ring-4 focus-within:ring-[#C89A2D]/10">

                    <LockKeyhole
                      size={18}
                      className="text-zinc-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      disabled={loading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="ml-3 flex-1 bg-transparent outline-none disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 w-full rounded-2xl bg-[#1A1A1A] font-semibold text-white transition hover:bg-black disabled:opacity-60"
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>

              </form>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}