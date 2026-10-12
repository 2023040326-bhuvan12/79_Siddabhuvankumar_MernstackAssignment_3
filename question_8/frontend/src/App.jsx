import { useEffect, useState } from "react";
import axios from "axios";

function App() {

    const [students, setStudents] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [age, setAge] = useState("");

    const [editId, setEditId] = useState(null);


    // GET STUDENTS
    const getStudents = async () => {

        const response = await axios.get(
            "http://localhost:5000/api/students"
        );

        setStudents(response.data);

    };


    useEffect(() => {

        getStudents();

    }, []);


    // ADD / UPDATE
    const saveStudent = async (e) => {

        e.preventDefault();

        const student = {
            name,
            email,
            course,
            age
        };


        if (editId) {

            await axios.put(
                `http://localhost:5000/api/students/${editId}`,
                student
            );

        } else {

            await axios.post(
                "http://localhost:5000/api/students",
                student
            );

        }


        setName("");
        setEmail("");
        setCourse("");
        setAge("");
        setEditId(null);

        getStudents();

    };


    // EDIT
    const editStudent = (student) => {

        setEditId(student._id);

        setName(student.name);
        setEmail(student.email);
        setCourse(student.course);
        setAge(student.age);

    };


    // DELETE
    const deleteStudent = async (id) => {

        await axios.delete(
            `http://localhost:5000/api/students/${id}`
        );

        getStudents();

    };


    return (

        <div>

            <h1>Student Management System</h1>


            <form onSubmit={saveStudent}>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <br /><br />


                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br /><br />


                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e) =>
                        setCourse(e.target.value)
                    }
                />

                <br /><br />


                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) =>
                        setAge(e.target.value)
                    }
                />

                <br /><br />


                <button type="submit">

                    {editId
                        ? "Update Student"
                        : "Add Student"}

                </button>

            </form>


            <hr />


            <h2>Student List</h2>


            <table border="1">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Age</th>
                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {students.map((student) => (

                        <tr key={student._id}>

                            <td>
                                {student.name}
                            </td>

                            <td>
                                {student.email}
                            </td>

                            <td>
                                {student.course}
                            </td>

                            <td>
                                {student.age}
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        editStudent(student)
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    onClick={() =>
                                        deleteStudent(student._id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default App;