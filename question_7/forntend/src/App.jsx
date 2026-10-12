import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


// Admin pages
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryManagement from "./pages/CategoryManagement";
import ProductManagement from "./pages/ProductManagement";


// User pages
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import UserHome from "./pages/UserHome";
import UserProducts from "./pages/UserProducts";
import Cart from "./pages/Cart";


function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* ===================== */}
                {/* ADMIN ROUTES */}
                {/* ===================== */}

                <Route
                    path="/"
                    element={<Home />}
                />


                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />


                <Route
                    path="/admin/categories"
                    element={<CategoryManagement />}
                />


                <Route
                    path="/admin/products"
                    element={<ProductManagement />}
                />


                {/* ===================== */}
                {/* USER ROUTES */}
                {/* ===================== */}

                <Route
                    path="/user/register"
                    element={<UserRegister />}
                />


                <Route
                    path="/user/login"
                    element={<UserLogin />}
                />


                <Route
                    path="/user/home"
                    element={<UserHome />}
                />


                <Route
                    path="/user/products"
                    element={<UserProducts />}
                />
<Route
    path="/user/cart"
    element={<Cart />}
/>

            </Routes>

        </BrowserRouter>

    );

}


export default App;