const USER_DATA_KEY = 'userData';

export const getUserData = () => JSON.parse(localStorage.getItem(USER_DATA_KEY));

export const getUserDetails = () => {
  const userData = getUserData()
  return userData && userData.user ? userData.user : {};
}

export const storeUserData = userData =>
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

export const deleteUserData = () => localStorage.removeItem(USER_DATA_KEY);
