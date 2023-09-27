import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { logout } from "../../features/auth/slices/authSlice";
import NavbarView from "./NavbarView";
import { useAppDispatch } from "../../shared/hooks/appDispatch";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const user = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return <NavbarView
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
    />;
};

export default Navbar;