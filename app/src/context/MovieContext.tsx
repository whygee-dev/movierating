import React, { useState } from "react";

export type Genre = {
  id: number;
  name: string;
};

export const MovieContext = React.createContext({
  genres: undefined,
  setGenres: (g: Genre[]) => {},
  moviesList: [],
  setMoviesList: (l: number[]) => {},
} as {
  genres?: Genre[];
  setGenres: (g: Genre[]) => any;
  moviesList: number[];
  setMoviesList: (l: number[]) => any;
});

const MovieContextProvider = ({ children }: { children: any }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const _setGenres = (g: Genre[]) => {
    setGenres(g);
  };

  const [moviesList, setMovieList] = useState<number[]>([]);

  const _setMovieList = (l: number[]) => {
    setMovieList(l);
  };

  return (
    <MovieContext.Provider value={{ genres, setGenres: _setGenres, moviesList, setMoviesList: _setMovieList }}>{children}</MovieContext.Provider>
  );
};

export default MovieContextProvider;
