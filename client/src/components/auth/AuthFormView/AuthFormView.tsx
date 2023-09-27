import React from "react";
import { AuthFormOptions, AuthFormViewProps } from "../../../features/auth/authTypes";

const AuthFormView: React.FC<AuthFormViewProps> = ({ 
    fName, lName, email, password, handleChange, onSubmit, mode, isLoading,
}) => <div className="container">
    <div className="row justify-content-center mt-5">
        <div className="col-md-6">
            <h1 className="text-light text-center"> {mode === AuthFormOptions.Register ? "Register" : "Login"}</h1>
            
            <form className="bg-dark p-4" onSubmit={onSubmit}>
                {mode === AuthFormOptions.Register && <div className="form-group mb-4">
                    <label htmlFor="firstNameTextField" className="form-label text-light">First Name</label>
                    <input 
                        type="text" 
                        className="form-control bg-dark text-light border border-secondary" 
                        id="firstNameTextField" 
                        value={fName}
                        onChange={handleChange}
                        name="fName"
                        required
                        minLength={3}
                    />
                </div>}

                {mode === AuthFormOptions.Register && <div className="form-group mb-4">
                    <label htmlFor="lastNameTextField" className="form-label text-light">Last Name</label>
                    <input 
                        type="text" 
                        className="form-control bg-dark text-light border border-secondary" 
                        id="lastNameTextField" 
                        value={lName}
                        onChange={handleChange}
                        name="lName"
                        required
                        minLength={3}
                    />
                </div>}
                
                <div className="form-group mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label text-light">Email address</label>
                    <input 
                        type="email" 
                        className="form-control bg-dark text-light border border-secondary" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        value={email}
                        onChange={handleChange}
                        name="email"
                        required
                    />
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="exampleInputPassword1" className="form-label text-light">Password</label>
                    <input 
                        type="password" 
                        className="form-control bg-dark text-light border border-secondary" 
                        id="exampleInputPassword1" 
                        value={password}
                        onChange={handleChange}
                        name="password"
                        required
                        minLength={6}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    {isLoading ? "Loading..." : (mode === AuthFormOptions.Register ? "Register" : "Login")}
                </button>
            </form>
        </div>
    </div>
</div>;

export default AuthFormView;