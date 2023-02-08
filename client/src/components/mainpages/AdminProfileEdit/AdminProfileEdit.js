
import axios from 'axios';
import React, { useState } from 'react';


const AdminProfileEdit = (props) => {
const [state, setState] = useState({
name: props.admin.name,
email: props.admin.email
});

const handleChange = (event) => {
setState({ ...state, [event.target.name]: event.target.value });
};

const handleSubmit = (event) => {
event.preventDefault();
axios
.put(`/admin/adminEditProfile/${props.admin._id}`, state)
.then((response) => {
props.updateAdmin(response.data);
props.history.push('/adminProfile');
})
.catch((error) => {
console.error(error);
});
};

return (
<form onSubmit={handleSubmit}>
<div>
<label htmlFor="name">Name:</label>
<input
       type="text"
       id="name"
       name="name"
       value={state.name}
       onChange={handleChange}
     />
</div>
<div>
<label htmlFor="email">Email:</label>
<input
       type="email"
       id="email"
       name="email"
       value={state.email}
       onChange={handleChange}
     />
</div>
<button type="submit">Update Profile</button>
</form>
);
};



export default AdminProfileEdit
