// src/App.tsx
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { auth } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Login from "./components/Login";
import CharacterSheet from "./components/CharacterSheet";
import MasterPanel from "./pages/MasterPanel";

// UID do mestre (deve ser definido no .env)
const MASTER_UID = import.meta.env.VITE_MASTER_UID;

function AuthenticatedRouter({ user }: { user: User }) {
  const [, setLocation] = useLocation();
  const isMaster = MASTER_UID && user.uid === MASTER_UID;

  return (
    <Switch>
      <Route path="/">
        <Home
          user={user}
          onSelectCharacter={(id: string) => setLocation(`/sheet/${id}`)}
          isMaster={isMaster}
          onGoToMasterPanel={() => setLocation("/mestre")}
        />
      </Route>
      <Route path="/sheet/:characterId">
        {(params) => (
          <CharacterSheet
            characterId={params.characterId}
            onBackToSelect={() => setLocation("/")}
          />
        )}
      </Route>

      <Route path="/mestre">
        {() => {
          if (!user || user.uid !== MASTER_UID) {
            setLocation("/");
            return null;
          }
          return <MasterPanel onBack={() => setLocation("/")} />;
        }}
      </Route>

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });
    return () => unsub();
  }, []);

  function handleLoginCallback() {
    setUser(auth.currentUser);
  }

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] text-white">
        <p className="text-green-400">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Login onLogin={handleLoginCallback} />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AuthenticatedRouter user={user} />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
