import { useLocation, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { JSX } from "react/jsx-runtime";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
