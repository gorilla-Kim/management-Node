import React from 'react';
import './App.css';
import Customer from './components/Customer';

const customer = {
  'id': 1,
  'image': 'http://www.gorillawebmarketing.co.uk/wp-content/uploads/2014/02/a03-10-gorilla-computer-laptop-1-300x226.jpg',
  'name' : 'gorilla-kim',
  'birthday': '960322',
  'gender': 'Man',
  'job': 'Student'
} 

function App() {
  return (
    <Customer 
      id={customer.id}
      image={customer.image}
      name={customer.name}
      birthday={customer.birthday}
      gender={customer.gender}
      job={customer.job}
    />
  );
}

export default App;
