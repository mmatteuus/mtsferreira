import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { seedIfEmpty } from "@/lib/osStorage";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/AuthContext";

const linkBase = "px-3 py-2 rounded-md text-sm font-medium";
const active = "bg-primary text-primary-foreground";
const inactive = "hover:bg-muted";

export default function OsLayout() {
  useEffect(() => {
    seedIfEmpty();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="font-heading font-bold text-lg">MtsFerreira</Link>
            <span className="text-muted-foreground">/ Gestão de O.S</span>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/">Voltar ao site</Link>
            </Button>
            <AuthActions />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-2 mb-6">
          <NavLink to="/os" end className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
            Ordens
          </NavLink>
          <NavLink to="/os/nova" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
            Nova O.S
          </NavLink>
          <NavLink to="/os/clientes" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
            Clientes
          </NavLink>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

function AuthActions() {
  const { isAuthenticated, logout } = useAuth();
  if (!isAuthenticated) return null;
  return (
    <Button variant="destructive" onClick={logout}>Sair</Button>
  );
}
