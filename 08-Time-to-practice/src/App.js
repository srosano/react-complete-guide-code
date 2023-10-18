import React, {useState, Fragment} from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (uName, uAge, uId) => {

    setUsersList((prevUserList)=>{
      return [...prevUserList, {name: uName, age: uAge, uId: Math.random().toString()}];
    });
  }
  return (
    <React.Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList}/>
    </React.Fragment>
  );
}

export default App;
