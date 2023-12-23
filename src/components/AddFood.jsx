import React, {useState} from "react";
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";
import UserProfile from "./UserInfoWrapper";

function AddFood(props) {
  const [formValue, setFormValue] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    accountId: UserProfile.getAccountId(),
  });
  const handleFoodSubmit = async (event) => {
    event.preventDefault();
    addFoodToServer(formValue);
    setFormValue({
      name: "",
      price: "",
      description: "",
      image: "",
      accountId: UserProfile.getAccountId(),
    });
    document.getElementById("outputContainer").hidden = true;
    props.func("submission");
  };

  const onChange = (e) => {
    setFormValue({...formValue, [e.target.name]: e.target.value});
  };

  const loadImageFile = async (e) => {
    var image = document.getElementById("output");
    const imageFile = e.target.files[0];
    image.src = URL.createObjectURL(imageFile);
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = function (e) {
      var rawLog = reader.result;
      console.log(rawLog);
      setFormValue({...formValue, image: rawLog});
    };
    document.getElementById("outputContainer").hidden = false;
  };

  async function addFoodToServer(data) {
    console.log(data);
    var response = await fetch("/api/addFood", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var responseData = await response.json();
    console.log(responseData);
    if (responseData.success === false) {
      alert("Unexpected error in adding food.");
    } else {
      alert(responseData.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleFoodSubmit} id="foodForm">
        <MDBInput
          value={formValue.name}
          onChange={onChange}
          name="name"
          wrapperClass="mb-4"
          label="Name of the Dish"
          id="name"
          type="text"
          required
        />

        <MDBInput
          value={formValue.price}
          onChange={onChange}
          name="price"
          wrapperClass="mb-4"
          label="Price (in ₱)"
          id="price"
          type="number"
          required
        />
        <MDBInput
          value={formValue.description}
          onChange={onChange}
          name="description"
          wrapperClass="mb-4"
          label="Description"
          id="description"
          type="text"
          required
        />
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
          <div hidden id="outputContainer">
            <img
              className="m-auto"
              id="output"
              alt=" "
              width={200}
              height={200}
            />
          </div>
        </div>

        <MDBBtn className="mb-4 w-100 mt-3" type="submit">
          Submit
        </MDBBtn>
      </form>
    </div>
  );
}

export default AddFood;
