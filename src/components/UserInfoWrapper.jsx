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

  const getName = () => {
    return sessionStorage.getItem("name");
  };

  const getUserType = () => {
    return sessionStorage.getItem("userType");
  };

  const getAccountId = () => {
    return sessionStorage.getItem("accountId");
  };

  const clearSession = function () {
    sessionStorage.clear();
  };

  return {
    setName: setName,
    setUsertype: setUsertype,
    setAccountId: setAccountId,
    getName: getName,
    getUserType: getUserType,
    getAccountId: getAccountId,
    clearSession: clearSession,
  };
})();

export default UserProfile;
