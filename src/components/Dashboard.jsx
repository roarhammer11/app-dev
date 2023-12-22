import GoogleMaps from "./Map";
import Dropdown from "react-bootstrap/Dropdown";
import UserProfile from "./UserInfoWrapper";
import Home from "./Home";
import SellerMenu from "./SellerMenu";
import Suggestions from "./Suggestions";
import '../App.css';
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
        sellerMenu.hidden = true;
        suggestions.hidden = true;
      } else if (menuToBeActivated.id === "map") {
        map.hidden = false;
        home.hidden = true;
        sellerMenu.hidden = true;
        suggestions.hidden = true;
      } else if (menuToBeActivated.id === "sellerMenu") {
        sellerMenu.hidden = false;
        map.hidden = true;
        home.hidden = true;
        suggestions.hidden = true;
      } else if (menuToBeActivated.id === "suggestionsMenu") {
        suggestions.hidden = false;
        map.hidden = true;
        sellerMenu.hidden = true;
        home.hidden = true;
      }
    }
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
              <button
                className="list-group-item list-group-item-action py-2 ripple"
                onClick={menuController}
                id="sellerMenu"
              >
                <i className="fas fa-shop fa-fw me-3"></i>
                <span>Seller Menu</span>
              </button>
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
                  <div className="text-center">
                    Hello {UserProfile.getName()}
                  </div>
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
      
      <main style={{ marginTop: '55px' }}>
            <div style={{ paddingLeft: '10vh' }} id="dashboardContent">
              <div className="d-flex justify-content-between align-items-center" style={{ padding: '15px' }}>
                <h1 style={{marginInlineStart: 100, padding: 15}}>Hello, [User Name]</h1>
                <form className="input-group w-auto my-auto" style={{ display: 'flex', flexShrink: 0, minWidth: '300px' }}>
                  <input
                    autoComplete="off"
                    type="search"
                    className="form-control rounded"
                    placeholder='What do you feel like eating today?'
                    style={{minWidth: 300 + "px"}}
                  />
                  <span className="input-group-text border-0">
                    <i className="fas fa-search"></i>
                  </span>
                </form>
              </div>

              <div>
                <h3>Get Discount Voucher Up To 20% Off!</h3>
              </div>

              <div className="d-flex flex-column bd-highlight mb-3">
                <div>
                  <h3>Category</h3>
                </div>

                <div>
                  <h3>Recent orders</h3>
                </div>

            <div id="googleMap" hidden>
              <GoogleMaps />
            </div>

            <div
              id="sellerContent"
              style={{height: 100 + "%", width: 100 + "%"}}
              hidden
            >
              <SellerMenu accountId={UserProfile.getAccountId()} />
            </div>

                <div id="suggestionsContent" hidden>
                  <Suggestions />
                </div>

              </div>
            </div>
          </main>
        </div>
  ) : (
    <div>You do not have access to this page.</div>
  );
}

export default Dashboard;
