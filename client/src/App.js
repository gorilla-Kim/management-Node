import React, { useState, useEffect } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  },
  progress: {
    margin: theme.spacing(2)
  }
});

function App(props) {
  const [customers, setCustomers] = useState(null);
  const [completed, setCompleted] = useState(0);
  const { classes } = props;

  const callApi = async () => {
    try {
      // setCustomers(null);
      const response = await axios.get('/api/customers');
      setCustomers(response.data)
    } catch (error) {
      console.log(`❌  callApi error :: ${error}`, error);
    }
  };

  const stateRefresh = () => {
    setCustomers(null);
    setCompleted(0);
    callApi();
  }

  const progress = () => {
    setCompleted(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
  }

  useEffect(() => {
    console.log("⚡  DidMounted!");
    const timer = setInterval(progress, 20);
    callApi();
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
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
            {customers ? customers.map(customer => {
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
            }) : 
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={completed}/>
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={stateRefresh} />
    </div>
  );
}

export default withStyles(styles)(App);
