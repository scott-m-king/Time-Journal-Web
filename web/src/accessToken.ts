let accessToken = ""; // should use this with a global state management library

export const setAccessToken = (s: string) => {
  accessToken = s;
}

export const getAccessToken = () => {
  return accessToken;
}