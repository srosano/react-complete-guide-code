import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchMoviesHandler = useCallback( async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Anyone can read, but writing to the firebase is currently protected for security purposes
      // modify firebase rules to enable read/write as required
      const response = await fetch("https://react-http-9793d-default-rtdb.firebaseio.com/movies.json");
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

      setMovies(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
      setIsLoading(false);
  }, []);

 useEffect(()=>{
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie){
    // Anyone can read, but writing to the firebase is currently protected for security purposes
    // modify firebase rules to enable read/write as required
    const reponse = await fetch("https://react-http-9793d-default-rtdb.firebaseio.com/movies.json", {
      method: "POST",
      body: JSON.stringify(movie),
      headers:{
        "Content-Type": "application/json"
      }
    });
    const data = await reponse.json();
    console.log(data);
  }

  let content = <p>Found no mvoies.</p>;

  if(isLoading){
    content = <p>Loading...</p>;
  }

  if(error){
    content = <p>{error}</p>;
  }

  if(movies.length > 0){
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
