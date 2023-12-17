var UserProfile = (function () {
  const setName = (name) => {
    sessionStorage.setItem("name", name);
  };

  const setUsertype = (userType) => {
    sessionStorage.setItem("userType", userType);
  };

  const getName = () => {
    return sessionStorage.getItem("name");
  };
  const getUserType = () => {
    return sessionStorage.getItem("userType");
  };
  const clearSession = function () {
    sessionStorage.clear();
  };

  return {
    setName: setName,
    setUsertype: setUsertype,
    getName: getName,
    getUserType: getUserType,
    clearSession: clearSession,
  };
})();

export default UserProfile;
