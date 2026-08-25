import { create } from "zustand";

type AuthStore = {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    hydrate: () => void;
};

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(";").shift() ?? null;
    }

    return null;
};

const setCookie = (name: string, value: string, maxAgeInSeconds: number) => {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAgeInSeconds}; samesite=lax`;
};

const removeCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const useAuthStore = create<AuthStore>()((set) => ({
    token: null,
    isAuthenticated: false,

    login: (token) => {
        set({
            token,
            isAuthenticated: true,
        });

        setCookie("furniro-auth-token", token, 60 * 60 * 24);
    },

    logout: () => {
        removeCookie("furniro-auth-token");

        set({
            token: null,
            isAuthenticated: false,
        });
    },

    hydrate: () => {
        const token = getCookie("furniro-auth-token");

        if (!token) {
            set({
                token: null,
                isAuthenticated: false,
            });
            return;
        }

        set({
            token,
            isAuthenticated: true,
        });
    },
}));

if (typeof window !== "undefined") {
    useAuthStore.getState().hydrate();
}
