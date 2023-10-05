import EncryptedStorage from 'react-native-encrypted-storage';

export async function saveEncryptedValue(key, value) {
  try {
    if (value == null) {
      await removeEncryptedValue(key);
      return { success: true };
    } else {
      const savedItem = await EncryptedStorage.setItem(key, value);
      return { success: true, savedItem };
    }
  } catch (e) {
    return { error: e };
  }
}

export async function getEncryptedValue(key) {
  try {
    const value = await EncryptedStorage.getItem(key);
    return value;
  } catch (e) {
    return false;
  }
}

export async function removeEncryptedValue(key) {
  try {
    await EncryptedStorage.removeItem(key);
    return { success: true };
  } catch (e) {
    return { error: e };
  }
}

export async function clearEncryptedItems() {
  try {
    await EncryptedStorage.clear();
    return { success: true };
  } catch (e) {}
}
