import { ShieldCheck, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20">
        <ShieldCheck className="w-8 h-8 text-primary" />
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2 justify-center">
          <LayoutDashboard className="w-7 h-7 text-primary" />
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          ¡Bienvenido! Inicio de sesión exitoso.
        </p>
        <p className="text-xs text-muted-foreground/60 mt-4">
          Esta página es un placeholder — aquí irá el panel principal de la plataforma.
        </p>
      </div>

      <Link
        href="/login"
        className="text-sm text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
      >
        ← Volver al login
      </Link>
    </main>
  );
}
