import React, {useState} from "react";
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";
import UserProfile from "./UserInfoWrapper";
import {Buffer} from "buffer";
function AddFood() {
  const [formValue, setFormValue] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    accountId: UserProfile.getAccountId(),
  });
  const handleFoodSubmit = async (event) => {
    event.preventDefault();

    // console.log(formValue);
    addFoodToServer(formValue);

    setFormValue({
      name: "",
      price: "",
      description: "",
      image: "",
      accountId: UserProfile.getAccountId(),
    });
    // var image = document.getElementById("output");
    // image.removeAttribute("src");
    document.getElementById("outputContainer").hidden = true;
  };

  const onChange = (e) => {
    setFormValue({...formValue, [e.target.name]: e.target.value});
  };

  const loadImageFile = async (e) => {
    var image = document.getElementById("output");
    const imageFile = e.target.files[0];
    image.src = URL.createObjectURL(imageFile);

    // const imageFiledata = await fileToBlob(imageFile);
    // console.log(imageFile);
    // console.log(imageFiledata);
    // formValue.image = imageFiledata;
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = function (e) {
      var rawLog = reader.result;
      console.log(rawLog);
      setFormValue({...formValue, image: rawLog});
    };
    document.getElementById("outputContainer").hidden = false;
  };

  const fileToBlob = async (file) =>
    new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type});

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
  // const handleTestSubmit = (event) => {
  //   event.preventDefault();
  //   test();
  // };
  // async function test() {
  //   var response = await fetch("/api/image", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   var responseData = await response.json();
  //   console.log(responseData);
  //   if (responseData.success === false) {
  //     alert("Unexpected error in adding food.");
  //   } else {
  //     // var imageData = new Blob([responseData.data[0].image], {type: "image/*"});
  //     // imageData.type = "image/*";
  //     // console.log(imageData);
  //     var imageData = responseData.data[0].image;
  //     var image = Buffer.from(imageData).toString();
  //     console.log(image);
  //     // var image = new Blob([imageData.data], {
  //     //   type: imageData.type,
  //     // });
  //     // console.log(image);
  //     document.getElementById("test").src = image;
  //   }
  // }
  return (
    <div>
      <form onSubmit={handleFoodSubmit} id="foodForm">
        <MDBInput
          value={formValue.name}
          onChange={onChange}
          name="name"
          wrapperClass="mb-4"
          label="Name"
          id="name"
          type="text"
          required
        />

        <MDBInput
          value={formValue.price}
          onChange={onChange}
          name="price"
          wrapperClass="mb-4"
          label="Price"
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

          {/* <div hidden>
            <MDBInput
              value={formValue.image}
              onChange={onChange}
              name="image"
              wrapperClass="mb-4"
              id="image"
              type="file"
              accept="image/*"
            />
          </div> */}

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

        {/* <div className="d-flex">
          <label class="form-label" for="customFile">
            Image
          </label>
          <input
            type="file"
            class="form-control"
            id="image"
            value={formValue.image}
            onChange={onChange}
          />
        </div> */}

        <MDBBtn className="mb-4 w-100 mt-3" type="submit">
          Submit
        </MDBBtn>
      </form>
      {/* <form onSubmit={handleTestSubmit} id="testForm">
        <MDBBtn className="mb-4 w-100 mt-3" type="submit">
          Submit
        </MDBBtn>
      </form>
      <img id="test" alt="" width={200} height={200}></img> */}
    </div>
  );
}

export default AddFood;
