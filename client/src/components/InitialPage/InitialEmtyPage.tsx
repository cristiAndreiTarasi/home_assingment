import React from "react";

const jumboStyle = {
    minHeight: '100vh',     
    display: 'flex',
    alignItems: 'center',    
    justifyContent: 'center'  
};

const textStyle = {
    fontSize: '2.5rem' ,
    color: "rgba(255, 255, 255, 0.5)"    
};

const InitialEmptyPage: React.FC = () => (
    <div className="container-fluid bg-dark" style={jumboStyle}>
        <div className="text-center" style={textStyle}>
            Sign up or log into your account.
        </div>
    </div>
);

export default InitialEmptyPage;