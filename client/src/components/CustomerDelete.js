import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

const initialState = {
    open: false
}

export default function CustomerDelete(props) {
    const [state, setstate] = useState(initialState);

    const handleClickOpen = () => {
        setstate({...state, open: !state.open});
    } 

    const deleteCustomer = (id) => {
        const url = `/api/customers/${id}`;
        axios.delete(url)
            .then(res => {
                console.log(`⚡ this is the customer delelte result :: `, res.data);
                props.stateRefresh();
            }).catch(
                e => console.log(`❌  customer delete error :: `, e)
            )
    }

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>Delete</Button>
            <Dialog open={state.open} onClose={handleClickOpen}>
                <DialogTitle>
                    Warnning to Delete!!
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        The selected customer information is deleted.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e) => deleteCustomer(props.id)}>Delete</Button>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}