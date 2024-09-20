import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import {paths} from "./utils/helper.js";
import Signup from "./pages/SignUp.jsx";
import ProtectionRoute from "./pages/layouts/ProtectRoute.jsx";
import AppLayout from "./pages/layouts/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TripById from "./pages/TripById.jsx";
import CommunityPlans from "./components/CommunityPlans.jsx";
import CommunityTripById from "./pages/CommunityTripById.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";





function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectionRoute/>}>
                    <Route element={<AppLayout/>}>
                        <Route path={paths.dashboard} element={<Dashboard/>}/>
                        <Route path={'/community'} element={<CommunityPlans/>}/>
                        <Route path={'/community/trips/:tripId'} element={<CommunityTripById/>}/>
                        <Route path={`${paths.dashboard}${paths.trip}/:tripId`} element={<TripById/>}/>
                        <Route path={`${paths.dashboard}${paths.trip}/:tripId/expense-tracker`} element={<TripById/>}/>
                        <Route path={`${paths.dashboard}${paths.trip}/:tripId/collaborate`} element={<TripById/>}/>
                        <Route path={`${paths.dashboard}${paths.trip}/:tripId/settings`} element={<TripById/>}/>
                    </Route>
                    <Route path={'*'} element={<Navigate to={paths.login}/>}/>
                </Route>
                <Route path={paths.login} element={<Login/>} />
                <Route path={paths.signup} element={<Signup/>}/>
                <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;