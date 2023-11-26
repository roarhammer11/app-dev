import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function ChildModal(props) {
  const [open, setOpen] = React.useState();
  const [alert, setAlert] = React.useState(false);
  var responseData = props.data;
  React.useEffect(() => {
    var x;
    if (responseData.success) {
      // alertField.innerHTML = "Welcome back " + responseData.name;
      x = "Welcome back " + responseData.name;
      window.history.pushState(null, null, window.location.href);

      window.onpopstate = function (event) {
        if (window.location.href === "http://localhost:3000/") {
          window.history.go(1);
        }
      };
    } else {
      x = responseData.message;
    }
    setAlert(x);
  }, [responseData]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    if (responseData.success) {
      if (responseData.userType === "admin") {
        handleRoutes("adminNavbar");
        handleSessions();
      } else if (responseData.userType === "faculty") {
        handleRoutes("facultyNavbar");
        handleSessions();
      } else {
        handleRoutes("studentNavbar");
        handleSessions();
      }
    }
    setAlert(" ");
  };

  function handleRoutes(userNavbar) {
    document.getElementById(userNavbar).hidden = false;
    document.getElementById(userNavbar + "Home").click();
  }

  function handleSessions() {
    sessionStorage.setItem("userType", responseData.userType);
    sessionStorage.setItem("name", responseData.name);
    sessionStorage.setItem("role", responseData.role);
    sessionStorage.setItem("accountId", responseData.accountId);
  }

  return (
    <React.Fragment>
      <div className="loginButton">
        <button type="submit">Login</button>
        <button onClick={handleOpen} id="proxyButton" hidden></button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="alert"
      >
        <Box sx={{...style, width: 200}}>
          <h5 id="alert"> {alert}</h5>
          <div className="actions">
            <button onClick={handleClose}>OK</button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
function Login() {
  const [responseData, setResponseData] = React.useState(false);
  const handleLoginSubmit = (event) => {
    event.preventDefault();

    var elements = document
      .getElementById("loginForm")
      .querySelectorAll("input");
    var obj = {};
    for (var i = 0; i < elements.length; i++) {
      var item = elements.item(i);
      obj[item.name] = item.value;
    }
    console.log(obj);
    login(obj);
  };

  async function login(data) {
    document.getElementById("proxyButton").click();
    var response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var responseData = await response.json();
    setResponseData(responseData);
    console.log(responseData);
  }
  retun (
    <div
      // style={{maxWidth: "25%", margin: "auto"}}
      // className=" d-flex justify-content-center align-items-center h-75"
      className="loginContainer"
    >
      <form onSubmit={handleLoginSubmit} id="loginForm" hidden>
        <h2 style={{textAlign: "center", marginBottom: "3rem"}}>Login</h2>
        <div>
          <label htmlFor="form2Example1">Email address</label>
          <input type="email" id="form2Example1" name="email" required />
        </div>
        <div>
          <label htmlFor="form2Example2">Password</label>
          <input type="password" id="form2Example2" name="password" required />
        </div>
        <div>
          <ChildModal data={responseData} />
        </div>
      </form>
    </div>
  );
}

export default Login;