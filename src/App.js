import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Listing from "./pages/Listing";
import Toast from "./components/Toast";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouteLoggedIn from "./components/PrivateRouteLoggedIn";
import Sell from "./pages/Sell";
import EditListing from "./pages/EditListing";
import AllItemByCategory from "./pages/AllItemByCategory";
import Landing from "./pages/Landing";

function App() {
    return (
        <div>
            <Router>
                
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
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
                    <Route
                        path="/sell"
                        element={
                            <PrivateRouteLoggedIn needLoggedIn={true} pathIfFalse={"/signin"} />
                        }
                    >
                        <Route path="/sell" element={<Sell />} />
                    </Route>
                    <Route path="/listings/:category/:listingId" element={<Listing />} />
                    <Route path="/edit-listing/:listingId" element={<EditListing />} />
                    <Route path="/listings/:category" element={<AllItemByCategory />} />
                    <Route path="/search/:item" element={<AllItemByCategory search/>} />
                </Routes>
            </Router>
            <Toast />
        </div>
    );
}

export default App;
