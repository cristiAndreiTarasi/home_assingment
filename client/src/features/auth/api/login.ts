import { fetchAPIInstace } from "../../../shared/fetchApiInstance";
import { LoginResponseType } from "../authTypes";

export const loginUser = async (email: string, password: string) => {
    try {
        const body = JSON.stringify({ email, password });
        const options = {
            method: "POST",
            body,
        };

        const { data, status } = await fetchAPIInstace<LoginResponseType>("/auth/login", options);

        if (status >= 400 && status < 600) {
            throw new Error("Login failed");
        }

        return data;
    } catch (error) {
        throw error;
    }
};