import React, { useState, useReducer, useEffect, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import {
  database,
  onValue,
  ref,
  set,
  push,
  query,
  orderByChild,
  equalTo,
  child,
  get,
  remove
} from "../../firebase";

const ingredientReducer = (currentIngredient, action) => {
  switch (action.type){
    case 'SET':
        return action.ingredient
    case 'ADD':
      return [...currentIngredient, action.ingredient];
    case 'DELETE':
      return currentIngredient.filter(ingredient => ingredient.id !== action.id);
    default:
      throw new Error("Should not get here!")
  }
};

const errorLoadingReducer = (curHttpState, action) =>{
    switch (action.type){
    case 'SEND':
        return { loading: true, error: null };
    case 'RESPONSE':
      return { ...curHttpState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
      case 'CLEAR':
      return { loading: false, error: null };
    default:
      throw new Error("Should not get here!")
  }
};

const Ingredients = () => {
  const [userIngredient, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(errorLoadingReducer, {loading: false, error: null})
  // const [userIngredient, setUserIngredient] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const addIngredientHandler = useCallback((ingredient) => {
    // setIsLoading(true);
    dispatchHttp({type:'SEND'});
    // firebase database connection establishing
    const ingredientsDatabase = ref(database, "ingredients");
    console.log("ingredients", ingredientsDatabase);

    console.log("ingredient", ingredient);

    // once ingredient payload comes through send it to firebase
    push(ingredientsDatabase, {
      ...ingredient,
    }).then((response) => {
      // setIsLoading(false);
      dispatchHttp({type:'RESPONSE'});
      // console.log("response", response);
      // setUserIngredient((prevState) => [
      //   ...prevState,
      //   {
      //     // Need to encode ID with the response Id
      //     id: response.key,
      //     ...ingredient,
      //   },
      // ]);
      dispatch({type:'ADD', ingredient: { id: response.key, ...ingredient }})

    });
  }, []);

  // useEffect(()=>{
  //   console.log("SET userIngredient", userIngredient);
  // },[userIngredient]);

  useEffect(() => {
    // retrive the data from the server to check if there's data on the server
    // to prefill the Ingredient
    const ingredientsDatabase = ref(database, "ingredients");

    onValue(
      ingredientsDatabase,
      (snapshot) => {
        const data = snapshot.val();
        console.log("DATA 1", data);

        const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
          });
        }
        console.log("loadedIngredients", loadedIngredients);
        // setUserIngredient(loadedIngredients);
        dispatch({type: 'SET', ingredient: loadedIngredients})
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    const ingredientsDatabase = ref(database, "ingredients");

    if (filteredIngredients.length !== 0) {
      console.log("filteredIngredientsHandler ::", filteredIngredients);

      const ingredientsDatabaseQuery = ref(database, "ingredients");
      // console.log("ingredientsDatabaseQuery", ingredientsDatabaseQuery.val());
      // console.log("ingredientsDatabaseQuery", JSON.stringify(ingredientsDatabaseQuery.val()));

      const filteredDatabase = query(
        ingredientsDatabaseQuery,
        orderByChild("title"),
        equalTo(filteredIngredients)
      );

      // console.log("filteredDatabase", filteredDatabase.val);
      // console.log("filteredDatabase", JSON.stringify(filteredDatabase));

      onValue(filteredDatabase, (snapshot) => {
        const data = snapshot.val();
        console.log("ingredientsDatabaseQuery", data);

        const filteredLoadedIngredients = [];
        for (const key in data) {
          filteredLoadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
          });
        }
        console.log("filteredLoadedIngredients", filteredLoadedIngredients);

        // Needs a callback here
        // setUserIngredient(filteredLoadedIngredients);
        dispatch({type: 'SET', ingredient: filteredLoadedIngredients});
      });
    } else {
      onValue(
        ingredientsDatabase,
        (snapshot) => {
          const data = snapshot.val();
          console.log("DATA 1", data);

          const loadedIngredients = [];
          for (const key in data) {
            loadedIngredients.push({
              id: key,
              title: data[key].title,
              amount: data[key].amount,
            });
          }
          console.log("loadedIngredients", loadedIngredients);
          // setUserIngredient(loadedIngredients);
          dispatch({type: 'SET', ingredient: loadedIngredients});
        },
        {
          onlyOnce: true,
        }
      );
    }
  }, []);

  const removeIngredientHandler = useCallback(ingredientId => {
    // setIsLoading(true);
    dispatchHttp({type:'SEND'});
    const ingredientsRemoveDatabase = ref(database, `ingredients/${ingredientId}`);
    remove(ingredientsRemoveDatabase).then((response)=>{
      // update UI
      // setUserIngredient(prevState=>{
      //   // console.log("prevState", prevState);
      //   const test = prevState.filter(ingredient => ingredient.id !== ingredientId);
      //   return test
      // })
      dispatch({type:'DELETE', id: ingredientId })
      // console.log("userIngredient :: ", userIngredient);
      // setIsLoading(false);
      dispatchHttp({type:'RESPONSE'});
    }).catch((error)=>{
      // setError(error.message);
      dispatchHttp({type:'ERROR', errorMessage: error.message});
      // console.log("Some Error Occurred", errorMessage: error.message);
    });
  }, []);

  const handleErrorClose = useCallback(() => {
    dispatchHttp({type:'CLEAR'});
    // setError(null);
    // setIsLoading(false);
  }, []);

   const ingredientList = useMemo(()=>{
    return <IngredientList ingredients={userIngredient} onRemoveItem={removeIngredientHandler} />;
   },[userIngredient, removeIngredientHandler])

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={handleErrorClose}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
