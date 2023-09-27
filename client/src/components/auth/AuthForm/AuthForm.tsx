import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AuthFormProps, AuthFormOptions, AuthResponseType, FormFields } from "../../../features/auth/authTypes";
import AuthFormView from "../AuthFormView/AuthFormView";
import { authFailed, authSuccess, endAuth, startAuth } from "../../../features/auth/slices/authSlice";
import { setUser } from "../../../features/auth/slices/userSlice";
import { RootState } from "../../../app/store";
import { loginThunk, registerThunk } from "../../../features/auth/slices/authThunks";
import { useAppDispatch } from "../../../shared/hooks/appDispatch";

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const [formData, setFormData] = useState<FormFields>({ fName: "", lName: "", email: "", password: "" });
    
    useEffect(() => {
        setFormData({ fName: "", lName: "", email: "", password: "" });
    }, [mode]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        dispatch(startAuth());

        try {
            let action: any;
            
            if (mode === AuthFormOptions.Register) {
                action = dispatch(registerThunk({
                    fName: formData.fName,
                    lName: formData.lName,
                    email: formData.email,
                    password: formData.password
                })).then((action) => {
                    if (action.type.endsWith('fulfilled')) {
                        dispatch(endAuth());
                        navigate('/login');
                    }
                });
            } else if (mode === AuthFormOptions.Login) {
                action = dispatch(loginThunk({
                    email: formData.email,
                    password: formData.password
                })).then((action) => {
                    if (action.type.endsWith('fulfilled')) {
                        navigate('/home');
                    }
                });
            }

            if (action.payload && action.payload.user) {
                dispatch(setUser({ fName: action.payload.user.fName, lName: action.payload.user.lName, email: action.payload.user.email }));
            }
        } catch (error) {
            const errorMessage = mode === AuthFormOptions.Register ? "Registration failed" : "Login failed";
            dispatch(authFailed(errorMessage));
        }
        
    };

    return <AuthFormView 
        fName={formData.fName}
        lName={formData.lName}
        email={formData.email}
        password={formData.password}
        handleChange={handleInputChange}
        onSubmit={handleSubmit}
        mode={mode}
        isLoading={isLoading} 
    />
};

export default AuthForm;