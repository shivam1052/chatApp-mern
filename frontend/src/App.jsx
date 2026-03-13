import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { authStore } from "./store/authStore.js";

function App() {
  const { loggedUser } = authStore();
  return (
    <div className="min-h-screen bg-[#37353E] text-white">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={loggedUser ? <Homepage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!loggedUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!loggedUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={loggedUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
