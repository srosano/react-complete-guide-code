import React, {useEffect} from 'react';

import './IngredientList.css';

const IngredientList = props => {
  console.log("RENDERING IngredientList");
  useEffect(()=>{
    console.log("props.ingredients", props.ingredients);
  }, [props.ingredients])

  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
