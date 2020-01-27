import React, { useState } from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    hidden: {
        display: "none"
    }
});

const initialUser = {
    file: null,
    userName: "",
    birthday: "",
    gender: "",
    job: "",
    fileName: "",
    open: false
}

function CustomerAdd(props) {
    const [user, setUser] = useState(initialUser);
    const { classes } = props;

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

    const handleClickOpen = () => {
        setUser({...user, open: !user.open});
    } 

    return(
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                New Customer
            </Button>
            <Dialog open={user.open} onClose={handleClickOpen}>
                <DialogTitle>Add new Customer</DialogTitle>
                <DialogContent>
                    <input className={classes.hidden} accept="image/*" type="file" id="raised-button-file" file={user.file} value={user.fileName} onChange={handleFileChange}/><br/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {user.fileName === "" ? "Choose Profile image" : user.fileName}
                        </Button>
                    </label>
                    <br/>
                    <TextField label="NAME" type="text" name="userName" value={user.userName} onChange={handleValueChange} /><br/>
                    <TextField label="BIRTH" type="text" name="birthday" value={user.birthday} onChange={handleValueChange} /><br/>
                    <TextField label="GENDER" type="text" name="gender" value={user.gender} onChange={handleValueChange} /><br/>
                    <TextField label="JOB" type="text" name="job" value={user.job} onChange={handleValueChange} /><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleFormSubmit} >
                        Create!
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleClickOpen} >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )    
}

export default  withStyles(styles)(CustomerAdd);