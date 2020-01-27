import React, { useState } from "react";
import { post } from "axios";

const initialUser = {
    file: null,
    userName: "",
    birthday: "",
    gender: "",
    job: "",
    fileName: ""
}

export default function CustomerAdd(props) {
    const [user, setUser] = useState(initialUser);

    const addCustomer = () => {
        const url="/api/customers";
        const formData = new FormData();
        formData.append('image', user.file);
        formData.append('name', user.userName);
        formData.append('birthday', user.birthday);
        formData.append('gender', user.gender);
        formData.append('job', user.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    const handleFormSubmit = (e) => {   
        e.preventDefault();
        addCustomer()
            .then((response) => {
                console.log(response.data);
                props.stateRefresh();
            })
            .catch(e => console.log(`❌  handleFormsubmit ::`, e))
        setUser(initialUser);
    }

    const handleFileChange = (e) => {
        setUser({
            ...user, 
            file: e.target.files[0], 
            fileName: e.target.value
        })
    }

    const handleValueChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    return(
        <form onSubmit={handleFormSubmit}>
            <h1>Added New Customer</h1>
            Profile image: <input type="file" name="file" file={user.file} value={user.fileName} onChange={handleFileChange}/><br/>
            Name: <input type="text" name="userName" value={user.userName} onChange={handleValueChange} /><br/>
            Birth: <input type="text" name="birthday" value={user.birthday} onChange={handleValueChange} /><br/>
            Gender: <input type="text" name="gender" value={user.gender} onChange={handleValueChange} /><br/>
            Job: <input type="text" name="job" value={user.job} onChange={handleValueChange} /><br/>
            <button type="submit">submit</button>
        </form>
    )    
}