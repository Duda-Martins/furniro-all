const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = async (endpoint: string, options: RequestInit = {}) => {
    const defaultOptions: RequestInit = {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, defaultOptions);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error");
    }

    return response;
};
