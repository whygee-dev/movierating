import React, { useState } from "react";

export type Genre = {
  id: number;
  name: string;
};

export const MovieContext = React.createContext({ genres: undefined, setGenres: (g: Genre[]) => {} } as {
  genres?: Genre[];
  setGenres: (g: Genre[]) => any;
});

const MovieContextProvider = ({ children }: { children: any }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const _setGenres = (g: Genre[]) => {
    setGenres(g);
  };

  return <MovieContext.Provider value={{ genres, setGenres: _setGenres }}>{children}</MovieContext.Provider>;
};

export default MovieContextProvider;
