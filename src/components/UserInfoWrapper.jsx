var UserProfile = (function () {
  var getName = function () {
    return sessionStorage.getItem("name");
  };

  var setName = function (name) {
    sessionStorage.setItem("name", name);
  };

  var clearSession = function () {
    sessionStorage.clear();
  };

  return {
    getName: getName,
    setName: setName,
    clearSession: clearSession,
  };
})();

export default UserProfile;
