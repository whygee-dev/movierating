import Constants from "expo-constants";

const { manifest } = Constants;
export const API_URI = Constants?.manifest?.extra?.api || `http://${manifest?.debuggerHost?.split(":").shift()}:3000`;
