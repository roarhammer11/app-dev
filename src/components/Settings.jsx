import React, {useState} from "react";
import UserProfile from "./UserInfoWrapper";
import {MDBInput, MDBBtn} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function Settings(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formValue, setFormValue] = useState({
    accountId: UserProfile.getAccountId(),
    nameSettings: UserProfile.getName(),
    emailSettings: UserProfile.getEmail(),
    oldEmail: UserProfile.getEmail(),
    passwordSettings: "",
    newPassword: "",
  });

  const handleSettingsSubmit = async (event) => {
    event.preventDefault();
    await updateAccount();
    setFormValue({
      accountId: UserProfile.getAccountId(),
      nameSettings: UserProfile.getName(),
      emailSettings: UserProfile.getEmail(),
      oldEmail: UserProfile.getEmail(),
      passwordSettings: "",
      newPassword: "",
    });
  };

  const updateAccount = async () => {
    console.log(formValue);
    console.log(UserProfile.getPassword());

    if (UserProfile.getPassword() === formValue.passwordSettings) {
      if (formValue.newPassword === "") {
        formValue.newPassword = UserProfile.getPassword();
      }
      var response = await fetch("/api/updateAccount", {
        method: "PATCH",
        body: JSON.stringify(formValue),
        headers: {
          "Content-Type": "application/json",
        },
      });
      var responseData = await response.json();
      console.log(responseData);
      if (responseData.success === false) {
        alert("Unexpected error in updating account.");
      } else {
        UserProfile.setName(formValue.nameSettings);
        UserProfile.setEmail(formValue.emailSettings);
        UserProfile.setPassword(formValue.newPassword);
        props.func();
        alert(responseData.message);
      }
    } else {
      alert("Incorrect Password");
    }
  };

  const onChange = (e) => {
    setFormValue({...formValue, [e.target.name]: e.target.value});
  };

  const loadImageFile = async (e) => {
    var image = document.getElementById("outputSettings");
    const imageFile = e.target.files[0];
    image.src = URL.createObjectURL(imageFile);
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = function (e) {
      var rawLog = reader.result;
      console.log(rawLog);
      setFormValue({...formValue, image: rawLog});
    };
    document.getElementById("outputSettingsContainer").hidden = false;
  };

  const DisplayDynamicImageSettings = () => {
    return UserProfile.getUserType() === "Seller" ? (
      <div>
        <div className="d-flex flex-column">
          <div className="m-auto btn btn-primary btn-rounded image-button mb-4">
            <label
              className="form-label text-white image-button"
              htmlFor="imageSettings"
            >
              Select image (Optional)
            </label>
          </div>

          <div hidden>
            <MDBInput
              onChange={loadImageFile}
              name="imageSettings"
              wrapperClass="mb-4"
              id="imageSettings"
              type="file"
              accept="image/*"
            />
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    );
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={handleShow}
        id="settingsModalButton"
        hidden
      >
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSettingsSubmit} id="settingForm">
            <MDBInput
              value={formValue.nameSettings}
              onChange={onChange}
              name="nameSettings"
              wrapperClass="mb-4"
              label="Name"
              id="nameSettings"
              type="text"
              required
            />
            <MDBInput
              value={formValue.emailSettings}
              onChange={onChange}
              name="emailSettings"
              wrapperClass="mb-4"
              label="Email address"
              id="emailSettings"
              type="email"
              required
            />
            <MDBInput
              value={formValue.passwordSettings}
              onChange={onChange}
              name="passwordSettings"
              wrapperClass="mb-4"
              label="Password"
              id="passwordSettings"
              type="password"
              className="input"
              required
            />
            <MDBInput
              value={formValue.newPassword}
              onChange={onChange}
              name="newPassword"
              wrapperClass="mb-4"
              label="New Password (Optional)"
              id="newPassword"
              type="password"
              className="input"
            />
            <DisplayDynamicImageSettings />
            <div className="d-flex justify-content-center">
              <div hidden id="outputSettingsContainer">
                <img
                  className="m-auto"
                  id="outputSettings"
                  alt=" "
                  width={150}
                  height={150}
                />
              </div>
            </div>
            <MDBBtn className="mb-4 w-100 mt-3" type="submit">
              Submit
            </MDBBtn>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Settings;
