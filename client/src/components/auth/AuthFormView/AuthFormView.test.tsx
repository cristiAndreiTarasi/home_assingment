import { render, fireEvent } from "@testing-library/react";
import AuthFormView from "./AuthFormView";
import { AuthFormOptions } from "../../../features/auth/authTypes";

describe("<AuthFormView />", () => {

    const setup = (propsOverrides = {}) => {
        const props = {
            fName: "",
            lName: "",
            email: "",
            password: "",
            handleChange: jest.fn(),
            onSubmit: jest.fn(e => e.preventDefault()),
            mode: AuthFormOptions.Register,
            isLoading: false,
            ...propsOverrides
        };

        const utils = render(<AuthFormView {...props} />);
        return { ...utils, props };
    };

    it("renders registration form correctly", () => {
        const { getByRole, getByLabelText } = setup();

        // Find the button specifically
        expect(getByRole('button', { name: /Register/i })).toBeInTheDocument();
        expect(getByLabelText("First Name")).toBeInTheDocument();
        expect(getByLabelText("Last Name")).toBeInTheDocument();
    });

    it("renders login form correctly", () => {
        const { getByRole, queryByLabelText } = setup({ mode: AuthFormOptions.Login });

        // Find the button specifically
        expect(getByRole('button', { name: /Login/i })).toBeInTheDocument();
        expect(queryByLabelText("First Name")).not.toBeInTheDocument();
        expect(queryByLabelText("Last Name")).not.toBeInTheDocument();
    });

    it("shows \"Loading...\" when isLoading is true", () => {
        const { getByText } = setup({ isLoading: true });

        expect(getByText("Loading...")).toBeInTheDocument();
    });

    it("fires handleChange correctly", () => {
        const { getByLabelText, props } = setup();

        const input = getByLabelText("Email address");
        fireEvent.change(input, { target: { value: "test@example.com" } });

        expect(props.handleChange).toBeCalled();
    });

    it("fires onSubmit correctly", () => {
        const { getByRole, props } = setup();

        // Find the button specifically
        const button = getByRole('button', { name: /Register/i });
        fireEvent.click(button);

        expect(props.onSubmit).toBeCalled();
    });
});
