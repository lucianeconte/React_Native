import AsyncStorage from '@react-native-community/async-storage';

const Session = {
  set: async (key, value) => {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (error) {
      return error;
    }
  },
  get: async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      return error;
    }
  },
  remove: async key => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (error) {
      return error;
    }
  },
};

export default Session;
