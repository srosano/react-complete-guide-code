import React, { Fragment } from "react";
import mealsImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeal</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div>
        <img className={classes['main-image']} src={mealsImage} alt="food on table" />
      </div>
    </Fragment>
  );
};

export default Header;
