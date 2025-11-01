// utils/usernameEncoding.js

// Simple Base64 encoding for username
export const encodeUsername = (username) => btoa(username);
export const decodeUsername = (encoded) => atob(encoded);
