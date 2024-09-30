import * as SecureStore from 'expo-secure-store'

export async function saveSecureString(key: string, value: string) {
  await SecureStore.setItemAsync(key, value)
}

export async function getSecureStringFor(key: string) {
  let result = await SecureStore.getItemAsync(key)
  return result
}

export async function deleteSecureString(key: string) {
  return await SecureStore.deleteItemAsync(key)
}

export const expoSecurePersistStorage = {
  getItem: (name: string) => SecureStore.getItem(name),
  setItem: (name: string, value: string) => SecureStore.setItem(name, value),
  removeItem: (name: string) => SecureStore.deleteItemAsync(name),
}
