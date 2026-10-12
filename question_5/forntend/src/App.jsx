import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/profile";
import LeaveApplication from "./components/LeaveApplication";
import LeaveList from "./components/LeaveList";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/leave"
          element={<LeaveApplication />}
        />

        <Route
          path="/leaves"
          element={<LeaveList />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;