// components/ProtectedRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router"; // for navigation redirection

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return null; // or <Loading />
  }

  if (!isAuthenticated) {
    console.log("Redirecting to login...");
    return <Redirect href="/(auth)" />;
  }

  return <>{children}</>;
}
