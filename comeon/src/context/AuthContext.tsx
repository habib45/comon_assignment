"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface Player {
  name: string;
  avatar: string;
  event: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (player: Player) => void;
  logout: () => void;
  loading: boolean;
  player: Player | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState<Player | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/session", { cache: "no-store" });
      if (!res.ok) {
        setIsAuthenticated(false);
        setPlayer(null);
        return;
      }
      const data = await res.json();
      setIsAuthenticated(Boolean(data.isAuthenticated));
      setPlayer(data.player ?? null);
    } catch (error) {
      console.error("Failed to check session:", error);
      setIsAuthenticated(false);
      setPlayer(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
    if (isAuthenticated && pathname === "/login") {
      router.push("/games");
    }
  }, [isAuthenticated, loading, pathname, router]);

  const login = (player: Player) => {
    setIsAuthenticated(true);
    setPlayer(player);
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthenticated(false);
      setPlayer(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, player }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
