import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import Footer from "./components/Footer";
import Chat from "./pages/Chat";
import { Lore } from "./pages/Lore";
import { LoreBlog } from "./pages/LoreBlog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/lore" element={<Lore />} />
        <Route path="/loreblog" element={<LoreBlog />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/chat" element={<Chat />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
      <FooterWrapper />
    </BrowserRouter>
  );
}
function FooterWrapper() {
  const location = useLocation();
  // Define paths where the footer should not be displayed
  const noFooterPaths = [
    "/search",
    "/listing/:listingId",
    "/create-listing",
    "/dashboard",
    "/chat",
    "/profile",
  ];

  // Check if the current path is in the list of paths without a footer
  const showFooter = !noFooterPaths.some(
    (path) =>
      path === location.pathname ||
      new RegExp("^" + path.replace(/:\w+/g, "\\w+") + "$").test(
        location.pathname
      )
  );

  return showFooter ? <Footer /> : null;
}
