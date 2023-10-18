import React, { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { auth, signInAnonymously, database, onValue, ref } from "./firebase";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [dbTable, setDbTable] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        console.log("User signed in anonymously");
        setSignedIn(true);
        // if you wanted to get the user id here you could use this:
        // However I have commented it out because we are using anonymous sign ins
        // We probably wouldn't want to store this in state as the user could access it
        // this was here for my developer experimentation
        // setUserId(auth.currentUser.uid);
      })
      .catch((error) => {
        // console.log("Enable anonymous in your firebase console");
        // console.log("Error: ", error);
        setSignedIn(false);
      });
  }, []);

  useEffect(() => {
    console.log("working");

    //const db = getDatabase();

    const mealsDatabase = ref(database, 'meals');
    console.log("mealsDatabase", mealsDatabase);

    onValue(mealsDatabase, (snapshot) => {
      const data = snapshot.val();
      console.log("DATA 1", data);

      // data retrived could be saved to state, might not be a good idea
      // given how big the payload is etc
      setDbTable(data);
      //console.log("DATA 2", JSON.stringify(data));
    });

  }, [signedIn === true]);

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    // console.log("hideCartHandler");
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
