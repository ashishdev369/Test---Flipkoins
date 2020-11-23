import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        name: '',
        age: '',
        email: '',
        address: ''
    });
    const users = useSelector(state => state.users);
    var selectedUser = null;
    const [submitted, setSubmitted] = useState(false);
    const [updated, setUpdated] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const registered = useSelector(state => state.registration.registered);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    function handleGetUser(id) {
        dispatch(userActions.getUser(id));
        users.items.map((user, index) =>{
            if(user.id == id){
                setUser({
                    id: user.id,
                    name: user.name,
                    age: user.age,
                    email: user.email,
                    address: user.address
                })
                setUpdated(true);
                setSubmitted(false);
            }
        })
        
        
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (updated) {
            setUpdated(false)
            if (user.name && user.age && user.address && user.email) {
                dispatch(userActions.update(user));
                dispatch(userActions.getAll())
            }
        } else {
            setSubmitted(true);
            if (user.name && user.age && user.address && user.email) {
                dispatch(userActions.register(user));
                dispatch(userActions.getAll())
                if(registered){
                    setUser({
                        name: '',
                        age: '',
                        email: '',
                        address: ''
                    })
                }
            }
        }

    }

    function handleCancel() {
        setUser({
            name: '',
            age: '',
            email: '',
            address: ''
        })
        setUpdated(false);
    }

    return (
        <div className="col-lg-12 row">
            <div className="col-lg-6" style={{ border: "1px solid black" }}>
                <h2>Register</h2>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={user.name} onChange={handleChange} className={'form-control' + (submitted && !user.name ? ' is-invalid' : '')} />
                        {submitted && !user.name &&
                            <div className="invalid-feedback">Name is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input type="text" name="age" value={user.age} onChange={handleChange} className={'form-control' + (submitted && !user.age ? ' is-invalid' : '')} />
                        {submitted && !user.age &&
                            <div className="invalid-feedback">Age is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                        {submitted && !user.email &&
                            <div className="invalid-feedback">Email is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" name="address" value={user.address} onChange={handleChange} className={'form-control' + (submitted && !user.address ? ' is-invalid' : '')} />
                        {submitted && !user.address &&
                            <div className="invalid-feedback">Address is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            {updated ? "Update" : "Register"}
                        </button>
                        <button className="btn btn-danger" onClick={() => handleCancel()}>
                            Cancel
                       </button>
                    </div>
                </form>
            </div>
            <div className="col-lg-6" style={{ border: "1px solid black" }}>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <table id="users">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.items.map((user, index) =>
                                <tr key={user.id}>
                                    <td>{user.name.length > 12 ? user.name.substring(0, 12) + '...' : user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.email.length > 12 ? user.email.substring(0, 12) + '...' : user.email}</td>
                                    <td>{user.address.length > 12 ? user.address.substring(0, 12) + '...' : user.address}</td>
                                    <td>
                                        {
                                            user.deleting ? <em> - Deleting...</em>
                                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                    : <span><span style={{ marginRight: "10px" }}> <i className="fa fa-trash" aria-hidden="true" style={{ color: "red", cursor: "pointer" }} onClick={() => handleDeleteUser(user.id)}></i></span><span> <i className="fa fa-pencil" aria-hidden="true" style={{ color: "blue", cursor: "pointer" }} onClick={() => handleGetUser(user.id)}></i></span></span>
                                        }</td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export { RegisterPage };