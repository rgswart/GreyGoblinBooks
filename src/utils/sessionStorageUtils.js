//sessionStorageUtils.js

//Functions for export

//Function to load a state from sessionStorage or accept fallback state
export const loadFromSessionStorage = (key, fallback) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.error(`Error loading ${key} from sessionStorage:`, err);
    return fallback;
  }
};

//Functions to save a state to sessionStorage
export const saveToSessionStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to sessionStorage:`, err);
  }
};
