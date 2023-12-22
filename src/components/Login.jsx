import React, {useState} from "react";
import UserProfile from "./UserInfoWrapper";
import {
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
function Login({justifyActive}) {
  const [formValue, setFormValue] = useState({email: "", password: ""});
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log(formValue);
    await login(formValue);
  };
  const onChange = (e) => {
    setFormValue({...formValue, [e.target.name]: e.target.value});
  };

  async function login(data) {
    var response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var responseData = await response.json();
    console.log(responseData);
    if (responseData.success === false) {
      alert("User not found, please register");
    } else {
      alert("Welcome Back " + responseData.name);
      UserProfile.setName(responseData.name);
      UserProfile.setUsertype(responseData.userType);
      UserProfile.setAccountId(responseData.accountId);
      UserProfile.setEmail(responseData.email);
      console.log(responseData.password);
      UserProfile.setPassword(responseData.password);
      window.history.pushState(null, null, window.location.href + "dashboard");
      window.location.reload();
    }
  }

  return (
    <MDBTabsPane open={justifyActive === "tab1"}>
      <div className="text-center mb-3">
        <p>Sign in with:</p>

        <div
          className="d-flex justify-content-between mx-auto"
          style={{width: "40%"}}
        >
          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{color: "#1266f1"}}
          >
            <MDBIcon fab icon="facebook-f" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{color: "#1266f1"}}
          >
            <MDBIcon fab icon="twitter" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{color: "#1266f1"}}
          >
            <MDBIcon fab icon="google" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{color: "#1266f1"}}
          >
            <MDBIcon fab icon="github" size="sm" />
          </MDBBtn>
        </div>

        <p className="text-center mt-3">or:</p>
      </div>
      <form onSubmit={handleLoginSubmit} id="loginForm">
        <MDBInput
          value={formValue.email}
          onChange={onChange}
          name="email"
          wrapperClass="mb-4"
          label="Email address"
          id="email"
          type="email"
          required
        />
        <MDBInput
          value={formValue.password}
          onChange={onChange}
          name="password"
          wrapperClass="mb-4"
          label="Password"
          id="password"
          type="password"
          className="input"
          required
        />

        <div className="d-flex justify-content-between mx-4 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="Remember me"
          />
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn className="mb-4 w-100" type="submit">
          Sign in
        </MDBBtn>
      </form>

      <p className="text-center">
        Not a member? <a href="#!">Register</a>
      </p>
    </MDBTabsPane>
  );
}

export default Login;
