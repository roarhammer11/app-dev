var UserProfile = (function () {
  const setName = (name) => {
    sessionStorage.setItem("name", name);
  };

  const setUsertype = (userType) => {
    sessionStorage.setItem("userType", userType);
  };

  const setAccountId = (accountId) => {
    sessionStorage.setItem("accountId", accountId);
  };

  const setEmail = (email) => {
    sessionStorage.setItem("email", email);
  };

  const setPassword = (password) => {
    sessionStorage.setItem("password", password);
  };

  const getName = () => {
    return sessionStorage.getItem("name");
  };

  const getUserType = () => {
    return sessionStorage.getItem("userType");
  };

  const getAccountId = () => {
    return sessionStorage.getItem("accountId");
  };

  const getEmail = () => {
    return sessionStorage.getItem("email");
  };

  const getPassword = () => {
    return sessionStorage.getItem("password");
  };

  const clearSession = function () {
    sessionStorage.clear();
  };

  return {
    setName: setName,
    setUsertype: setUsertype,
    setAccountId: setAccountId,
    setEmail: setEmail,
    setPassword: setPassword,
    getName: getName,
    getUserType: getUserType,
    getAccountId: getAccountId,
    getEmail: getEmail,
    getPassword: getPassword,
    clearSession: clearSession,
  };
})();

export default UserProfile;
