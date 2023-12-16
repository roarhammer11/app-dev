import React, {useState} from "react";
import {
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
function Signup({justifyActive}) {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    userType: "User",
  });

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    console.log(formValue);
    signup(formValue);
  };
  const onChange = (e) => {
    setFormValue({...formValue, [e.target.name]: e.target.value});
  };

  async function signup(data) {
    if (data.password === data.repeatPassword) {
      var response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      var responseData = await response.json();
      console.log(responseData);
      if (responseData.error === true) {
        alert(responseData.message);
      } else {
        alert("" + responseData.message);
      }
    } else {
      alert("Password mismatch");
    }
  }
  return (
    <MDBTabsPane open={justifyActive === "tab2"}>
      <div className="text-center mb-3">
        <p>Sign up with:</p>

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
      <form onSubmit={handleSignupSubmit} id="signUpForm">
        <select
          name="userType"
          id="form1"
          value={formValue.userType}
          onChange={onChange}
          required
        >
          <option value="User">User</option>
          <option value="Seller">Seller</option>
        </select>
        <MDBInput
          value={formValue.name}
          onChange={onChange}
          name="name"
          wrapperClass="mb-4"
          label="Name"
          id="form1"
          type="text"
          required
        />
        <MDBInput
          value={formValue.email}
          onChange={onChange}
          name="email"
          wrapperClass="mb-4"
          label="Email"
          id="form1"
          type="email"
          required
        />
        <MDBInput
          value={formValue.password}
          onChange={onChange}
          name="password"
          wrapperClass="mb-4"
          label="Password"
          id="form1"
          type="password"
          required
        />
        <MDBInput
          value={formValue.repeatPassword}
          onChange={onChange}
          name="repeatPassword"
          wrapperClass="mb-4"
          label="Re-enter Password"
          id="form1"
          type="password"
          required
        />
        <div className="d-flex justify-content-center mb-4">
          <MDBCheckbox
            name="flexCheck"
            id="flexCheckDefault"
            label="I have read and agree to the terms"
          />
        </div>

        <MDBBtn className="mb-4 w-100" type="submit">
          Sign up
        </MDBBtn>
      </form>
    </MDBTabsPane>
  );
}

export default Signup;
