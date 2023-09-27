import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../app/store";

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

const Home: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    
    return <div className="container-fluid bg-dark" style={jumboStyle}>
        <div className="text-center" style={textStyle}>
            {`Hello ${user.fName} ${user.lName}`} 
        </div>
    </div>
};

export default Home;