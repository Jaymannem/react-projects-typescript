import { EmployeeInfo, type Employee } from "./TableData";
import "./CrudTable.css";
import { useState, type ChangeEvent } from "react";

function CrudTable() {
  const [data, setData] = useState<Employee[]>(EmployeeInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [nextId, setNextId] = useState(data.length + 1);
  const [editId, setEditId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setAlert(false);
  };

  const handleAdd = () => {
    const { firstName, lastName, designation } = formData;

    if (!firstName.trim() || !lastName.trim() || !designation.trim()) {
      setAlert(true);
      return;
    }

    setIsLoading(true);

    if (editId !== null) {
      setData((prev) =>
        prev.map((emp) => (emp.id === editId ? { ...emp, ...formData } : emp))
      );
      setEditId(null);
      setIsLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        designation: "",
      });
    } else {
      const newEmployee: Employee = {
        id: nextId,
        firstName,
        lastName,
        designation,
      };
      setData([...data, newEmployee]);
      setNextId(nextId + 1);
      setFormData({ firstName: "", lastName: "", designation: "" });
      setAlert(false);
      setIsLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    const emp = data.find((e) => e.id === id);
    if (emp) {
      setFormData({
        firstName: emp.firstName,
        lastName: emp.lastName,
        designation: emp.designation,
      });
      setEditId(id);
    }
  };

  const handleDelete = (id: number) => {
    setData(data.filter((emp) => emp.id !== id));
  };

  return (
    <div className="crud-operations">
      <h1>Crud Operations</h1>
      <hr />
      {alert && (
        <div className="alert alert-danger" role="alert">
          Please fill the fields
        </div>
      )}
      <div className="form-container">
        <label>First Name:</label>
        <input
          placeholder="Enter First Name"
          value={formData.firstName}
          name="firstName"
          onChange={handleChange}
        />
        <label>First Name:</label>
        <input
          placeholder="Enter Last Name"
          value={formData.lastName}
          name="lastName"
          onChange={handleChange}
        />
        <label>Designation:</label>
        <input
          placeholder="Enter Designation"
          value={formData.designation}
          name="designation"
          onChange={handleChange}
        />
        &nbsp;&nbsp;
        <button
          className={editId ? "btn btn-success" : "btn btn-primary"}
          onClick={handleAdd}
        >
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </div>

      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp) => (
              <tr>
                <td>{emp.id}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.designation}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleEdit(emp.id)}
                  >
                    Edit
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CrudTable;
