import { useEffect, useState } from "react";
import axios from "axios";

function LeaveList() {

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    axios
      .get(
        "http://localhost:5000/api/leave/list",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        setLeaves(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div className="container">

      <h1>Leave Applications</h1>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Date</th>
            <th>Reason</th>
            <th>Granted</th>
          </tr>

        </thead>

        <tbody>

          {leaves.map((leave) => (

            <tr key={leave._id}>

              <td>
                {new Date(
                  leave.leaveDate
                ).toLocaleDateString()}
              </td>

              <td>
                {leave.reason}
              </td>

              <td>
                {leave.granted}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default LeaveList;