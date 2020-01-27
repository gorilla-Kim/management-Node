import React from 'react';
import axios from 'axios';

export default function CustomerDelete(props) {

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
        <button onClick={(e) => deleteCustomer(props.id)}>Delete</button>
    );
}