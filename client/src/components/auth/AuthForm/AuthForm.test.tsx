import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../../../features/auth/slices/userSlice";
import authReducer from "../../../features/auth/slices/authSlice";
import AuthForm from "./AuthForm";
import { AuthFormOptions } from "../../../features/auth/authTypes";
import { registerUser } from "../../../features/auth/api/register";
import { loginUser } from "../../../features/auth/api/login";
import { MemoryRouter } from "react-router-dom";

// Mocking modules
const navigateMock = jest.fn();
const getNavigateMock = () => navigateMock;

jest.mock("../../../features/auth/api/register");
jest.mock("../../../features/auth/api/login");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: getNavigateMock 
}));

describe("<AuthForm />", () => {
    const store = configureStore({
        reducer: combineReducers({
            user: userReducer,
            auth: authReducer
        })
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderWithProviders = (mode: AuthFormOptions) => {
        return render(
            <Provider store={store}>
                <MemoryRouter>
                    <AuthForm mode={mode} />
                </MemoryRouter>
            </Provider>
        );
    };

    it("registers a new user and navigates to /login on success", async () => {
        (registerUser as jest.Mock).mockResolvedValueOnce({ user: { fName: "John", lName: "Doe", email: "john@example.com" } });

        const { getByLabelText, getByRole, getByText } = renderWithProviders(AuthFormOptions.Register); // Added getByText here

        fireEvent.input(getByLabelText(/first name/i), { target: { value: "John" } });
        fireEvent.input(getByLabelText(/last name/i), { target: { value: "Doe" } });
        fireEvent.input(getByLabelText(/email/i), { target: { value: "john@example.com" } });
        fireEvent.input(getByLabelText(/password/i), { target: { value: "password" } });

        fireEvent.submit(getByRole("button", { name: /register/i }));

        await waitFor(() => {
            expect(registerUser).toHaveBeenCalledWith("John", "Doe", "john@example.com", "password");
            expect(navigateMock).toHaveBeenCalledWith("/login");
        });

        expect(registerUser).toHaveBeenCalledWith("John", "Doe", "john@example.com", "password");
        expect(navigateMock).toHaveBeenCalledWith("/login");
    });

    it("logs in a user and navigates to /tasks on success", async () => {
        (loginUser as jest.Mock).mockResolvedValueOnce({ token: "sample-token", user: { fName: "John", lName: "Doe", email: "john@example.com" } });

        const { getByLabelText, getByRole, getByText } = renderWithProviders(AuthFormOptions.Login); // Added getByText here

        fireEvent.input(getByLabelText(/email/i), { target: { value: "john@example.com" } });
        fireEvent.input(getByLabelText(/password/i), { target: { value: "password" } });

        fireEvent.submit(getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(loginUser).toHaveBeenCalledWith("john@example.com", "password");
            expect(navigateMock).toHaveBeenCalledWith("/tasks");
        });
    });
});
