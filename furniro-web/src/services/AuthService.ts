import { api } from "../api/api";
import { useAuthStore } from "../store/authStore";

type LoginPayload = {
    email: string;
    password: string;
};

type LoginResponse = {
    access_token: string;
};

export class AuthService {
    static async login(payload: LoginPayload) {
        const response = await api("/auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        const data: LoginResponse = await response.json();

        useAuthStore.getState().login(data.access_token);

        return data;
    }

    static async register(payload: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) {
        const response = await api("/users", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        return response.json();
    }
}
