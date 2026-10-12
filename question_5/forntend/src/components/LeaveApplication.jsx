import { useState } from "react";
import axios from "axios";

function LeaveApplication() {

  const [leaveDate, setLeaveDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const submitLeave = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/leave/add",
        {
          leaveDate,
          reason
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(
        "Leave application submitted successfully"
      );

      setLeaveDate("");
      setReason("");

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Unable to submit leave"
      );
    }
  };

  return (
    <div className="container">

      <h1>Leave Application</h1>

      {message && (
        <p>{message}</p>
      )}

      <form onSubmit={submitLeave}>

        <label>Leave Date</label>

        <input
          type="date"
          value={leaveDate}
          onChange={(e) =>
            setLeaveDate(e.target.value)
          }
        />

        <br /><br />

        <label>Reason</label>

        <textarea
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
          placeholder="Enter reason"
        />

        <br /><br />

        <button type="submit">
          Apply Leave
        </button>

      </form>

    </div>
  );
}

export default LeaveApplication;