// src/routes/ProtectionRoute.jsx
import React from 'react';
import { useAppContext } from "../../context-api/AppContext.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../../utils/helper.js";

function ProtectionRoute() {
    const { isAuth } = useAppContext();

    return (
        isAuth ? <Outlet /> : <Navigate to={paths.login} />
    );
}

export default ProtectionRoute;
