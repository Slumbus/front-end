import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (e) {
    console.error('Failed to save the user token', e);
  }
};

export const getUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (e) {
    console.error('Failed to get the user token', e);
    return null;
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (e) {
    console.error('Failed to remove the user token', e);
  }
};
