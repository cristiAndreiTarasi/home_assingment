import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import AuthForm from "./components/auth/AuthForm/AuthForm";
import Home from "./components/Home/Home";
import Layout from "./components/Layout";
import { AuthFormOptions } from "./features/auth/authTypes";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { RootState } from "./app/store";
import InitialEmptyPage from "./components/InitialPage/InitialEmtyPage";
import WeatherPage from "./components/Weather/WeatherPage";

const App = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, []);
    
    return <div className="container-fluid bg-dark vh-100" style={{ overflowY: "auto" }}>
        <Layout>
            <Routes>
                <Route path="/" element={<InitialEmptyPage />} />
                <Route path="/register" element={<AuthForm mode={AuthFormOptions.Register} />} />
                <Route path="/login" element={<AuthForm mode={AuthFormOptions.Login} />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/weather" element={<WeatherPage />} />
                </Route>
            </Routes>
        </Layout>
    </div>; 
};

export default App;