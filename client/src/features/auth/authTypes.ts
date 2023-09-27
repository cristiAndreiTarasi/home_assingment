import { ReactNode } from "react";

export enum AuthFormOptions {
    Register = "register",
    Login = "login"
}

export interface AuthFormProps {
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (evt: React.FormEvent) => Promise<void>;
    mode: AuthFormOptions.Register | AuthFormOptions.Login;
    isLoading?: boolean;
}

export interface AuthFormViewProps extends AuthFormProps {
    fName: string;
    lName: string;
    email: string;
    password: string;
}

export interface LayoutProps {
    children: ReactNode;
}

export interface AuthState {
    isLoggedIn: boolean;
    token: string;
    isLoading: boolean;
    error: string | null;
    message?: string;
    user?: UserState;
}

export interface UserState {
    fName: string;
    lName: string;
    email: string;
}

type UserResponse = {
    id: number;
    fName: string;
    lName: string;
    email: string;
};

export type RegisterResponseType = {
    message: string;
    user: UserResponse;
};

export type LoginResponseType = {
    token: string;
    user: UserResponse;
};

export type AuthResponseType = RegisterResponseType | LoginResponseType;

export interface FormFields {
    fName: string;
    lName: string;
    email: string;
    password: string;
}

export interface ValidationErrors {
    fName?: string[];
    lName?: string[];
    email?: string[];
    password?: string[];
}