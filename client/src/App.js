import React, { useState, useEffect } from 'react';
import './App.css';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  }
});

const initialState = {
  customers: []
}

function App(props) {
  const [states, setStates] = useState(initialState);
  const { classes } = props;
  const { customers } = states;

  const callApi = async () => {
    try {
      const response = await axios.get('/api/customers');
      setStates({customers: response.data})
    } catch (error) {
      console.log(`❌  callApi error :: ${error}`, error);
    }
  };

  useEffect(() => {
    console.log("⚡  DidMounted!");
    callApi();
  }, []);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map(customer => {
            return (
              <Customer 
                key={customer.id}
                id={customer.id}
                image={customer.image}
                name={customer.name}
                birthday={customer.birthday}
                gender={customer.gender}
                job={customer.job}
              />
            )  
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
