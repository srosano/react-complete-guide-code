import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart-actions";
import { auth, signInAnonymously } from "./firebase";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const [signedIn, setSignedIn] = useState(false);
  const [dbTable, setDbTable] = useState(null);
  const [userId, setUserId] = useState(null);

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

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

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  // useEffect(() => {
  //   // If its the first render do nothing
  //   if(isInitial){
  //     isInitial = false;
  //     return;
  //   }

  //   console.log("working and cart data", cart);

  //   const cartDatabase = ref(database, "cart");
  //   console.log("cartDatabase", cartDatabase);

  //   set(cartDatabase, {
  //     //values to set
  //     ...cart,
  //   })
  //     .then(() => {
  //       dispatch(
  //         uiActions.showNotification({
  //           status: "success",
  //           title: "Success!",
  //           message: "Sending cart data successfully!",
  //         })
  //       );
  //     })
  //     .catch((error) => {
  //       dispatch(
  //         uiActions.showNotification({
  //           status: "error",
  //           title: "Error!",
  //           message: "Sending cart data failed!" + error,
  //         })
  //       );
  //     });
  // }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
