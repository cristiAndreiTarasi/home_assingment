import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarViewProps {
    isLoggedIn: boolean;
    user: { fName: string, lName: string };
    onLogout: () => void;
}

const NavbarView: React.FC<NavbarViewProps> = ({ isLoggedIn, user, onLogout, }) => {
    const navigate = useNavigate();
    
    return <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
            { isLoggedIn 
                ? <ul className="d-flex">
                    <li>
                        <Link 
                            className="navbar-brand text-warning"
                            to={"/home"}
                            style={{ cursor: "pointer" }}
                        >{`${user.fName} ${user.lName}`}
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className="navbar-brand"
                            to={"/weather"}
                            style={{ cursor: "pointer" }}
                        >Weather
                        </Link>
                    </li>
                </ul> 
                : <Link className="navbar-brand" to={"/"}>Home Assignment</Link> }

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                {isLoggedIn
                    ? <button 
                        className="btn btn-danger" 
                        type="button"
                        onClick={onLogout}
                    >Sign Out</button>
                    : <>
                        <button 
                            className="btn btn-success me-md-2" 
                            type="button"
                            onClick={() => navigate("/register")}
                        >Sign Up</button>

                        <button 
                            className="btn btn-success" 
                            type="button"
                            onClick={() => navigate("/login")}
                        >Sign In</button>
                    </>
                }
            </div>
        </div>
    </nav>;
};

export default NavbarView;
