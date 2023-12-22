import React, {useState} from "react";
import UserProfile from "./UserInfoWrapper";
import {MDBInput} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function Settings() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formValue, setFormValue] = useState({
    email: UserProfile.getEmail(),
    password: "",
    newPassword: "",
  });
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log(formValue);
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
              htmlFor="image"
            >
              Select image (Optional)
            </label>
          </div>

          <div hidden>
            <MDBInput
              onChange={loadImageFile}
              name="image"
              wrapperClass="mb-4"
              id="image"
              type="file"
              accept="image/*"
            />
          </div>
          <div hidden id="outputSettingsContainer">
            <img
              className="m-auto"
              id="outputSettigns"
              alt=" "
              width={150}
              height={150}
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
          <form>
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
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default Settings;
