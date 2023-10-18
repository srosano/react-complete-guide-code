import React, {useState, useEffect, useContext}from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import { auth, signInAnonymously, onValue, ref ,database } from "./firebase";

import Auth from "./components/Auth";

import { AuthContext } from './context/auth-context';

const App = props => {
  const [signedIn, setSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const authContext = useContext(AuthContext);

   useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        console.log("User signed in anonymously");
        setSignedIn(true);
        // setUserId(auth.currentUser.uid);
      })
      .catch((error) => {
        // console.log("Enable anonymous in your firebase console");
        // console.log("Error: ", error);
        setSignedIn(false);
      });
  }, []);

  let content = <Auth />;
  if(authContext.isAuth){
    content=<Ingredients />
  }

  return content;

};

export default App;
