import React from 'react';
import './App.css';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
  {
    'id': 1,
    'image': 'http://www.gorillawebmarketing.co.uk/wp-content/uploads/2014/02/a03-10-gorilla-computer-laptop-1-300x226.jpg',
    'name' : 'gorilla-kim',
    'birthday': '960322',
    'gender': 'Man',
    'job': 'Student'
  },
  {
    'id': 2,
    'image': 'http://www.gorillawebmarketing.co.uk/wp-content/uploads/2014/02/a03-10-gorilla-computer-laptop-1-300x226.jpg',
    'name' : 'gorilla-kim',
    'birthday': '960322',
    'gender': 'Man',
    'job': 'Student'
  },
  {
    'id': 3,
    'image': 'http://www.gorillawebmarketing.co.uk/wp-content/uploads/2014/02/a03-10-gorilla-computer-laptop-1-300x226.jpg',
    'name' : 'gorilla-kim',
    'birthday': '960322',
    'gender': 'Man',
    'job': 'Student'
  }   
];

function App(props) {

  const { classes } = props;
  console.log(classes);
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
