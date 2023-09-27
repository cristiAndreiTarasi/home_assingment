import { fetchAPIInstace } from "../../../shared/fetchApiInstance";
import { RegisterResponseType } from "../authTypes";

export const registerUser = async (fName: string, lName: string, email: string, password: string) => {
    try {
        const body = JSON.stringify({ fName, lName, email, password });
        const options = {
            method: "POST",
            body,
        };

        const { data, status } = await fetchAPIInstace<RegisterResponseType>("/auth/register", options);

        if (status >= 400 && status < 600) {
            throw new Error("Registration failed");
        }

        return data;
    } catch (error) {
        throw error;
    }
};