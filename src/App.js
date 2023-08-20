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
import PrivateRouteLoggedIn from "./components/PrivateRouteLoggedIn";
import Sell from "./pages/Sell";

function App() {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRouteLoggedIn needLoggedIn={true} pathIfFalse={"/signin"} />
                        }
                    >
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route
                        path="/signup"
                        element={
                            <PrivateRouteLoggedIn needLoggedIn={false} pathIfFalse={"/profile"} />
                        }
                    >
                        <Route path="/signup" element={<SignUp />} />
                    </Route>
                    <Route
                        path="/signin"
                        element={
                            <PrivateRouteLoggedIn needLoggedIn={false} pathIfFalse={"/profile"} />
                        }
                    >
                        <Route path="/signin" element={<SignIn />} />
                    </Route>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route
                        path="/sell"
                        element={
                            <PrivateRouteLoggedIn needLoggedIn={true} pathIfFalse={"/signin"} />
                        }
                    >
                        <Route path="/sell" element={<Sell />} />
                    </Route>
                    <Route path="/listings/:categoryName/:listingId" element={<Listing />} />
                </Routes>
            </Router>
            <Toast />
        </div>
    );
}

export default App;
