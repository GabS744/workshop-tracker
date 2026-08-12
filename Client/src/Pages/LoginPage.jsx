import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { AuthInput } from "../Components/AuthInput";
import { api } from "../Services/Api";

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const response = await api.post("/api/auth/login", { email, password });

        const token = response.data.token;

        localStorage.setItem("@WorkshopTracker:token", token);

        navigate("/");
      } else {
        if (password !== confirmPassword) {
          setError("As senhas não coincidem!");
          setLoading(false);
          return;
        }

        await api.post("/api/auth/register", { email, password });

        setIsLogin(true);
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Ocorreu um erro. Verifique seus dados e tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0f19] relative overflow-hidden font-['Inter']">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#5c6dff] opacity-15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#a35cff] opacity-15 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="bg-[#161c2a] w-full max-w-100 rounded-2xl p-8 shadow-2xl border border-[#252f45] relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-linear-to-br from-[#5c6dff] to-[#a35cff] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#5c6dff]/20">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
            </svg>
          </div>
          <h1 className="text-white text-xl font-bold tracking-wide">
            Workshop Tracker
          </h1>
        </div>

        <div className="flex bg-[#1a2540] p-1 rounded-lg mb-8 border border-[#252f45]">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${isLogin ? "bg-linear-to-r from-[#5c6dff] to-[#a35cff] text-white shadow-md" : "text-[#7a88a4] hover:text-white"}`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${!isLogin ? "bg-linear-to-r from-[#5c6dff] to-[#a35cff] text-white shadow-md" : "text-[#7a88a4] hover:text-white"}`}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="animate-in fade-in duration-300">
            <AuthInput
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              icon={Mail}
              required
            />
          </div>

          <div className="animate-in fade-in duration-300 delay-75">
            <AuthInput
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? "••••••••" : "Mínimo 8 caracteres"}
              icon={Lock}
              required
              minLength={isLogin ? 1 : 8}
              isPassword
              rightElement={
                isLogin && (
                  <a
                    href="#"
                    className="text-[#5c6dff] hover:text-[#4a5ce8] text-xs font-medium transition-colors"
                  >
                    Esqueci a senha
                  </a>
                )
              }
            />
          </div>

          {!isLogin && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <AuthInput
                label="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a senha"
                icon={Lock}
                required={!isLogin}
                isPassword
              />
            </div>
          )}

          {error && (
            <div className="bg-[#ef4444]/10 border border-[#ef4444]/50 text-[#ef4444] text-xs font-medium p-3 rounded-lg text-center animate-in fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-linear-to-r from-[#5c6dff] to-[#a35cff] hover:from-[#4a5ce8] hover:to-[#8c46f2] text-white text-sm font-bold py-3 rounded-lg shadow-lg shadow-[#5c6dff]/25 transition-all mt-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#7a88a4]/60 text-[10px]">
            © 2025 Workshop Tracker · Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
