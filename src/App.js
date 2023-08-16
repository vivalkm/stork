import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import Listing from "./pages/Listing";
import Toast from "./components/Toast";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouteProfile from "./components/PrivateRouteProfile";
import PrivateRouteSignUp from "./components/PrivateRouteSignUp";
import PrivateRouteSignIn from "./components/PrivateRouteSignIn";

function App() {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<PrivateRouteProfile />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/signup" element={<PrivateRouteSignUp />}>
                        <Route path="/signup" element={<SignUp />} />
                    </Route>
                    <Route path="/signin" element={<PrivateRouteSignIn />}>
                        <Route path="/signin" element={<SignIn />} />
                    </Route>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/category/:categoryName/:listingId" element={<Listing />} />
                </Routes>
            </Router>
            <Toast />
        </div>
    );
}

export default App;
