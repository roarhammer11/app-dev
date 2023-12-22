import GoogleMaps from "./Map";
import Dropdown from "react-bootstrap/Dropdown";
import UserProfile from "./UserInfoWrapper";
import SellerMenu from "./SellerMenu";
import Suggestions from "./Suggestions";
import Settings from "./Settings";
import Carousel from "react-bootstrap/Carousel";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

import chicken from '../assets/chicken.png'
import wingers from '../assets/wingers.png'
import topokkiman from '../assets/topokkiman.png'
import low from '../assets/low.png'
import med from '../assets/med.png'
import high from '../assets/high.png'

import "../App.css";
function Dashboard() {
  const clearSession = () => {
    UserProfile.clearSession();
  };

  const menuController = (e) => {
    const activeMenu = document.getElementsByClassName("active")[0];
    const menuToBeActivated = e.currentTarget;
    const home = document.getElementById("home");

    const map = document.getElementById("googleMap");
    const sellerMenu = document.getElementById("sellerContent");
    const suggestions = document.getElementById("suggestionsContent");
    if (activeMenu !== menuToBeActivated) {
      activeMenu.classList.remove("active");
      menuToBeActivated.classList.add("active");
      console.log(menuToBeActivated.id);
      if (menuToBeActivated.id === "mainDashboard") {
        home.hidden = false;
        map.hidden = true;
        if (sellerMenu) {
          sellerMenu.hidden = true;
        }
        suggestions.hidden = true;
      } else if (menuToBeActivated.id === "map") {
        map.hidden = false;
        home.hidden = true;
        if (sellerMenu) {
          sellerMenu.hidden = true;
        }
        suggestions.hidden = true;
      } else if (menuToBeActivated.id === "sellerMenu") {
        sellerMenu.hidden = false;
        map.hidden = true;
        suggestions.hidden = true;
        home.hidden = true;
      } else if (menuToBeActivated.id === "suggestionsMenu") {
        suggestions.hidden = false;
        map.hidden = true;
        if (sellerMenu) {
          sellerMenu.hidden = true;
        }
        home.hidden = true;
      }
    }
  };

  const openSettingsModal = () => {
    document.getElementById("settingsModalButton").click();
  };

  const DisplaySellerMenu = () => {
    return UserProfile.getUserType() === "Seller" ? (
      <button
        className="list-group-item list-group-item-action py-2 ripple"
        onClick={menuController}
        id="sellerMenu"
      >
        <i className="fas fa-shop fa-fw me-3"></i>
        <span>Seller Menu</span>
      </button>
    ) : (
      <div></div>
    );
  };
  const DisplaySellerContent = () => {
    return UserProfile.getUserType() === "Seller" ? (
      <div
        id="sellerContent"
        style={{height: 100 + "%", width: 100 + "%"}}
        hidden
      >
        <SellerMenu accountId={UserProfile.getAccountId()} />
      </div>
    ) : (
      <div></div>
    );
  };
  return sessionStorage.length > 0 ? (
    <div>
      <header>
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar collapse bg-white"
        >
          <div className="position-sticky">
            <div
              className="list-group list-group-flush mx-3 mt-4"
              id="sidebarLinks"
            >
              <button
                className="list-group-item list-group-item-action py-2 ripple active"
                // aria-current="true"
                onClick={menuController}
                id="mainDashboard"
              >
                <i className="fas fa-tachometer-alt fa-fw me-3"></i>
                <span>Main dashboard</span>
              </button>
              <button
                className="list-group-item list-group-item-action py-2 ripple"
                onClick={menuController}
                id="map"
              >
                <i className="fas fa-chart-area fa-fw me-3"></i>
                <span>Map</span>
              </button>
              <DisplaySellerMenu />
              <button
                className="list-group-item list-group-item-action py-2 ripple"
                onClick={menuController}
                id="suggestionsMenu"
              >
                <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                <span>Suggestions</span>
              </button>
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
                  <span className=" translate-middle badge rounded-pill bg-danger">
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
                  <div className="text-center">
                    Hello {UserProfile.getName()}
                  </div>
                  <Dropdown.Item href="/dashboard/#">My profile</Dropdown.Item>
                  <Dropdown.Item onClick={openSettingsModal}>
                    Settings
                  </Dropdown.Item>
                  <Settings />
                  <Dropdown.Item href="/" onClick={clearSession}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </header>

      <main style={{marginTop: "55px"}}>
        <div style={{paddingLeft: "10vh"}} id="dashboardContent">
          <div id="home">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{padding: "15px"}}
            >
              <h1 style={{marginInlineStart: 100, padding: 15}}>
                Hello, {UserProfile.getName()}
              </h1>
              <form
                className="input-group w-auto my-auto"
                style={{display: "flex", flexShrink: 0, minWidth: "300px"}}
              >
                <input
                  autoComplete="off"
                  type="search"
                  className="form-control rounded"
                  placeholder="What do you feel like eating today?"
                  style={{minWidth: 300 + "px"}}
                />
                <span className="input-group-text border-0">
                  <i className="fas fa-search"></i>
                </span>
              </form>
            </div>

            <div>
              <h3>Take a look around USC-TC!</h3>
              <p>
                Learn about the go to grubs near the University of San Carlos
                Talamban Campus. Take a look at our website!
              </p>

              <Carousel>
                <Carousel.Item>
                  <img className="img-fluid" src={chicken} alt="24 Chicken" style={{maxHeight: '500px'}}/>
                  <Carousel.Caption>
                    <h4>24 Chicken</h4>
                    <p>Taste the best Korean Fried Chicken near Campus!</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                   <img className="img-fluid" src={wingers} alt="Wingers" style={{maxHeight: '500px'}}/>
                   <Carousel.Caption>
                    <h3>Wingers Unlimited</h3>
                    <p>Have a little budget? You may want to try Unli Wings!</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="img-fluid" src={topokkiman} alt="Topokkiman" style={{maxHeight: '500px'}}/>
                    <Carousel.Caption>
                    <h3>Topokkiman</h3>
                    <p>Looking for that korean goodness? Check out Topokkiman near Rosedale!</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>

            </div>

            <div>
              <div id="foodCategory" style={{flexDirection: "column", alignContent: "start",marginInlineStart: 100, padding: 50}}>
                <h3 style={{display: "flex"}}>Category</h3>
                <CardGroup>
                  <Card style={{margin: 15}}>
                    <img src={low} alt="Low Price" />
                    <Card.Body>
                      <Card.Title>$</Card.Title>
                      <Card.Text>
                        Strict budget? View your options here.
                      </Card.Text>
                    </Card.Body>
                    <Button variant="outline-primary" size="sm">Go</Button>
                  </Card>
                  <Card style={{margin: 15}}>
                  <img src={med} alt="Medium Price" />
                    <Card.Body>
                      <Card.Title>$$</Card.Title>
                      <Card.Text>
                        Keeping it safe? View your options here.
                      </Card.Text>
                    </Card.Body>
                    <Button variant="outline-primary" size="sm">Go</Button>
                  </Card>
                  <Card style={{margin: 15}}>
                  <img src={high} alt="High Price" />
                    <Card.Body>
                      <Card.Title>$$$</Card.Title>
                      <Card.Text>
                        Want to splurge? View your options here.
                      </Card.Text>
                    </Card.Body>
                    <Button variant="outline-primary" size="sm">Go</Button>
                  </Card>
                </CardGroup>
              </div>

              <div id="recentOrders" style={{display: "flex", marginInlineStart: 100, padding: 30}}>
                <h3>Recent orders</h3>
              </div>
            </div>
            
          </div>
          <div style={{textAlign: "left", marginInlineStart: 100, padding: 15}}>
            <div id="googleMap" hidden>
              <GoogleMaps />
            </div>
            <DisplaySellerContent />
            <div id="suggestionsContent" hidden>
              <Suggestions />
            </div>
          </div>
        </div>
      </main>

      <div id="map" hidden>
        <GoogleMaps />
      </div>

      <div id="sellerContent" hidden>
        <SellerMenu />
      </div>
    </div>
  ) : (
    <div>You do not have access to this page.</div>
  );
}

export default Dashboard;
