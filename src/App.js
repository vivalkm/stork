import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import Toast from "./components/Toast";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Listing from "./pages/Listing";

function App() {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
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
