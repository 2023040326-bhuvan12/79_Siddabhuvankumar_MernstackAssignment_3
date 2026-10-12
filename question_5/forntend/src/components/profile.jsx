import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

  const [employee, setEmployee] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    axios
      .get(
        "http://localhost:5000/api/employee/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  if (!employee) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">

      <h1>Employee Profile</h1>

      <p>
        <b>Employee ID:</b>{" "}
        {employee.empId}
      </p>

      <p>
        <b>Name:</b>{" "}
        {employee.name}
      </p>

      <p>
        <b>Email:</b>{" "}
        {employee.email}
      </p>

      <p>
        <b>Phone:</b>{" "}
        {employee.phone}
      </p>

      <p>
        <b>Department:</b>{" "}
        {employee.department}
      </p>

      <p>
        <b>Designation:</b>{" "}
        {employee.designation}
      </p>

      <p>
        <b>Basic Salary:</b>{" "}
        ₹{employee.basicSalary}
      </p>

    </div>
  );
}

export default Profile;