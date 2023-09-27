import React from "react";
import Navbar from "./Navbar/Navbar";
import { LayoutProps } from "../features/auth/authTypes";

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <div>
        <Navbar />

        <main>
            {children}
        </main>
    </div>;
};

export default Layout;