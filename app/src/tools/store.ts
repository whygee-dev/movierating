import * as SecureStore from "expo-secure-store";

export async function save(key: string, value: string) {
  let saved = false;

  do {
    saved = await saveAttempt(key, value);
  } while (!saved);
}

export async function saveAttempt(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
    return true;
  } catch {
    return false;
  }
}

export async function get(key: string) {
  return await SecureStore.getItemAsync(key);
}

export async function deleteKey(key: string) {
  return await SecureStore.deleteItemAsync(key);
}
