import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosClient from "../AxiosClient";

function UserForm() {

  const { id } = useParams()
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    id: null,
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  if (id) {
    useEffect(() => {
      setLoading(true)
      AxiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setUsers(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (users.id) {
      AxiosClient.put(`/users/${users.id}`, users)
        .then(() => {
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      AxiosClient.post('/users', users)
        .then(() => {
          navigate('/users')
        })
        .catch(err => {
          console.error(err); // Log the error to the console for debugging
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          } else {
            setErrors({ general: "An unexpected error occurred. Please try again." });
          }
        });
    }
  }

  return (
    <>
      {users.id && <h1>Update User: {users.name}</h1>}
      {!users.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={users.name} onChange={ev => setUsers({ ...users, name: ev.target.value })} placeholder="Name" />
            <input value={users.email} onChange={ev => setUsers({ ...users, email: ev.target.value })} placeholder="Email" />
            <input type="password" onChange={ev => setUsers({ ...users, password: ev.target.value })} placeholder="Password" />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )

}
export default UserForm;