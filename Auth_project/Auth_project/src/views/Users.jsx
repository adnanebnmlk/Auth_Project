import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosClient from "../AxiosClient";

function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    AxiosClient.delete(`/users/${user.id}`)
      .then(() => {
        getUsers()
      })
  }
  const getUsers = () => {
    setLoading(true)
    AxiosClient.get("/users")
      .then(({ data }) => {
        console.log("API Response:", data);
        setLoading(false)
        if (Array.isArray(data.data)) {
          setUsers(data.data); // Expecting an array under `data`
        } else {
          console.error("API did not return an array of users:", data);
          setUsers([]); // Set to empty array if response is incorrect
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Users</h1>
        <Link className="btn-add" to="/users/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
export default Users;