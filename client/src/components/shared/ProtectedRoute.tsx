import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);

    return isAuthenticated 
        ? <Outlet />
        : <Navigate to="/login" />;
};

export default ProtectedRoute;