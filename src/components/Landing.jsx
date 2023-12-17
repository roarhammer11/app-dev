import React, { useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdbreact';

function Landing() {
  useEffect(() => {
    if (sessionStorage.length > 0) {
      sessionHandler();
    }
  }, []); // Add an empty dependency array to prevent running on every render

  const sessionHandler = () => {
    document.getElementById("userName").innerHTML = UserProfile.getName();
  };

  const clearSession = () => {
    UserProfile.clearSession();
  };

  return sessionStorage.length > 0 ? (
    <div>
      <header>
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar collapse bg-white"
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <a
                href="/dashboard"
                className="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <i className="fas fa-tachometer-alt fa-fw me-3"></i>
                <span>Main dashboard</span>
              </a>
              <a
                href="/dashboard"
                className="list-group-item list-group-item-action py-2 ripple active"
              >
                <i className="fas fa-chart-area fa-fw me-3"></i>
                <span>Webiste traffic</span>
              </a>
            </div>
          </div>
        </nav>

        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>

            <a className="navbar-brand" href="/dashboard">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="25"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>

            <form className="d-none d-md-flex input-group w-auto my-auto">
              <input
                autoComplete="off"
                type="search"
                className="form-control rounded"
                placeholder='Search (ctrl + "/" to focus)'
                style={{minWidth: 225 + "px"}}
              />
              <span className="input-group-text border-0">
                <i className="fas fa-search"></i>
              </span>
            </form>

            <ul className="navbar-nav ms-auto d-flex flex-row">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="hidden-arrow"
                  style={{
                    backgroundColor: "white",
                    borderColor: "white",
                    boxShadow: "none",
                    marginTop: 0.6 + "rem",
                    padding: 0,
                  }}
                >
                  <i className="fas fa-bell" style={{color: "black"}} />
                  <span
                    className=" translate-middle badge rounded-pill bg-danger"
                    // style={{marginLeft: 10}}
                  >
                    1
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <li>
                    <a className="dropdown-item" href="/dashboard">
                      Some news
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/dashboard">
                      Another news
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/dashboard">
                      Something else here
                    </a>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="hidden-arrow"
                  style={{
                    backgroundColor: "white",
                    borderColor: "white",
                    boxShadow: "none",
                  }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                    className="rounded-circle"
                    height="22"
                    alt="Avatar"
                    loading="lazy"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/dashboard/#">My profile</Dropdown.Item>
                  <Dropdown.Item href="/dashboard/#">Settings</Dropdown.Item>
                  <Dropdown.Item href="/" onClick={clearSession}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </header>

      <main style={{ marginTop: '58px' }}>
        <MDBContainer className="mt-5">
          <MDBRow>
            <MDBCol md="12">
              <MDBCard>
                <MDBCardBody>
                  <form>
                    <p className="h5 text-center mb-4">What are your favorite cuisines?</p>
                    <MDBInput icon="search" hint="Search recipes here..." />
                    <MDBBtn color="primary" type="submit">
                      Personalize Your Experience
                    </MDBBtn>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow id="categories">
            {/* Repeat the following structure for each category */}
            <MDBCol md="3">
              <MDBCard>
                <MDBCardBody>
                  <img src="/path-to-beef.jpg" alt="Beef" className="img-fluid" />
                  <MDBBtn color="primary">Beef</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            {/* ... other categories ... */}
          </MDBRow>
        </MDBContainer>
      </main>
    </div>
  ) : (
    <div>You do not have access to this page.</div>
  );
}

export default Landing;