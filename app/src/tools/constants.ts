import Constants from "expo-constants";

const { manifest } = Constants;
export const API_URI = Constants?.manifest?.extra?.api || `http://${manifest?.debuggerHost?.split(":").shift()}:3000`;
export const POSTER_BASE = "https://image.tmdb.org/t/p/original";
export const TMDB_KEY = process.env.TMDB_KEY;
export const TMDB_KEY_APPEND = "?api_key=" + TMDB_KEY;
export const TMDB_BASE = "https://api.themoviedb.org/3/";
