import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminDashboard() {

    return (

        <div>

            <Navbar />

            <div style={{ padding: "40px" }}>

                <h1>Admin Dashboard</h1>

                <h2>Admin Panel</h2>

                <ul>

                    <li>
                        <Link to="/admin/categories">
                            Category Management
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/products">
                            Product Management
                        </Link>
                    </li>

                </ul>

            </div>

        </div>
    );
}

export default AdminDashboard;