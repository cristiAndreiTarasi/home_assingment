import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store"; 
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
    test("renders the home page by default", () => {
        render(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        </Provider>
        );

        expect(screen.getByText("Home Assignment")).toBeInTheDocument();
    });

    test("renders the registration form when navigating to /register", () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/register"]}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByRole("heading", { name: "Register" })).toBeInTheDocument(); 
    });

    test("renders the login form when navigating to /login", () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/login"]}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    });

    // more test can be added
});
