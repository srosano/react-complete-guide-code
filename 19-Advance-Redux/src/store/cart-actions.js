import { uiActions } from "./ui-slice";
import { useEffect, useState } from "react";
import { database, onValue, ref, set } from "./firebase";

export const fetchCartData = () => {
  const [dbTable, setDbTable] = useState(null);

  return (dispatch) => {
    const fetchData = () => {
      console.log("working");

      //const db = getDatabase();

      const mealsDatabase = ref(database, "meals");
      console.log("mealsDatabase", mealsDatabase);

      onValue(mealsDatabase, (snapshot) => {
        const data = snapshot.val();
        console.log("DATA 1", data);

        setDbTable(data);
        //console.log("DATA 2", JSON.stringify(data));
      });
    };
  };
};

// thunk function action creator
// can call code before reaching our reducer
// any side-effects etc
export const sendCartData = (cart) => {
  return (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending..",
        message: "Sending cart data!",
      })
    );

    useEffect(() => {
      console.log("working and cart data", cart);

      const cartDatabase = ref(database, "cart");
      console.log("cartDatabase", cartDatabase);

      set(cartDatabase, {
        //values to set
        ...cart,
      })
        .then(() => {
          dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: "Sending cart data successfully!",
            })
          );
        })
        .catch((error) => {
          dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error!",
              message: "Sending cart data failed!" + error,
            })
          );
        });
    }, [dispatch]);
  };
};
