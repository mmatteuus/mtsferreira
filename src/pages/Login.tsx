import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) {
      const from = (location.state as any)?.from || "/os";
      navigate(from, { replace: true });
    } else {
      setError("Credenciais inválidas. Use admin/admin.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 rounded-lg border border-border p-6">
        <h1 className="text-xl font-semibold">Entrar</h1>
        <div>
          <Label>Usuário</Label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" />
        </div>
        <div>
          <Label>Senha</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="admin" />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full">Entrar</Button>
      </form>
    </div>
  );
}

