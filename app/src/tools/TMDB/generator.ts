import { TMDB_BASE, TMDB_KEY, TMDB_KEY_APPEND } from "../../tools/constants";

export const genUrl = (path: string, page = 1, filters: number[] = []) => {
  if (!TMDB_KEY) {
    console.error("NO TMDB API KEY PROVIDED");
  }

  const genres = filters.length > 0 ? filters.reduce((acc, f) => f + "," + acc, "").slice(0, -1) : "";

  return `${TMDB_BASE}${path}${TMDB_KEY_APPEND}&page=${page}&with_genres=${genres}`;
};

export const genSearchUrl = (path: string, search: string) => {
  if (!TMDB_KEY) {
    console.error("NO TMDB API KEY PROVIDED");
  }

  return `${TMDB_BASE}${path}${TMDB_KEY_APPEND}&query=${search}`;
};
