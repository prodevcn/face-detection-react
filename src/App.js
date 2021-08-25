import React, { Suspense, Component } from "react";
import "./App.css";
import Particles from "react-particles-js";

const Navigation = React.lazy(() =>
    import("./components/Navigation/Navigation")
  ),
  Logo = React.lazy(() => import("./components/Logo/Logo")),
  ImageLinkForm = React.lazy(() =>
    import("./components/ImageLinkForm/ImageLinkForm")
  ),
  Rank = React.lazy(() => import("./components/Rank/Rank")),
  FaceDetect = React.lazy(() => import("./components/FaceDetect/FaceDetect")),
  SignIn = React.lazy(() => import("./components/SignIn/SignIn")),
  Register = React.lazy(() => import("./components/Register/Register")),
  Modal = React.lazy(() => import("./components/Modal/Modal")),
  Profile = React.lazy(() => import("./components/Profile/Profile"));

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isProfileOpen: false,
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    age: 0,
    pet: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("https://face-recognition-app-backend.herokuapp.com/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.id) {
            fetch(
              `https://face-recognition-app-backend.herokuapp.com/profile/${data.id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
              }
            )
              .then((response) => response.json())
              .then((user) => {
                if (user && user.email) {
                  this.loadUser(user);
                  this.onRouteChange("home");
                }
              });
          }
        })
        .catch(console.log);
    }
  }
  calculateFaceLocations = (data) => {
    if (data) {
      const image = document.getElementById("inputimage"),
        width = Number(image.width),
        height = Number(image.height);
      return data.outputs[0].data.regions.map((face) => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
        };
      });
    }
    return;
  };
  displayFaceBoxes = (e) => {
    e && this.setState({ boxes: e });
  };
  loadUser = (e) => {
    this.setState({
      user: {
        id: e.id,
        name: e.name,
        email: e.email,
        entries: e.entries,
        joined: e.joined,
      },
    });
  };
  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    const t = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ input: this.state.input }),
    };
    fetch("https://face-recognition-app-backend.herokuapp.com/imageurl", t)
      .then((t) => t.json())
      .then((t) => {
        if (t) {
          const t = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: window.sessionStorage.getItem("token"),
            },
            body: JSON.stringify({ id: this.state.user.id }),
          };
          fetch("https://face-recognition-app-backend.herokuapp.com/image", t)
            .then((t) => t.json())
            .then((t) => {
              t &&
                this.setState(Object.assign(this.state.user, { entries: t }));
            })
            .catch(console.log);
        }
        this.displayFaceBoxes(this.calculateFaceLocations(t));
      })
      .catch((t) => console.log(t));
  };
  onInputChange = (event) => this.setState({ input: event.target.value });
  onRouteChange = (route) => {
    if (route === "signout") {
      return this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  toggleModal = () => {
    this.setState((e) => ({ ...e, isProfileOpen: !e.isProfileOpen }));
  };

  render() {
    const { isSignedIn, route, boxes, imageUrl, isProfileOpen, user } =
      this.state;
    return (
      <div className="App">
        {" "}
        <Particles
          className="particles"
          params={{
            particles: { number: { value: 150 }, size: { value: 3 } },
            interactivity: {
              events: { onhover: { enable: true, mode: "repulse" } },
            },
          }}
        />{" "}
        <Suspense fallback={<div>Chargement...</div>}>
          {" "}
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
            toggleModal={this.toggleModal}
          />{" "}
          {isProfileOpen && (
            <Modal>
              <Profile
                isProfileOpen={isProfileOpen}
                toggleModal={this.toggleModal}
                loadUser={this.loadUser}
                user={user}
              />
            </Modal>
          )}
          {route === "home" ? (
            <div>
              {" "}
              <Logo />{" "}
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />{" "}
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />{" "}
              <FaceDetect boxes={boxes} imageUrl={imageUrl} />{" "}
            </div>
          ) : route === "signin" ? (
            <SignIn
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )}
        </Suspense>
      </div>
    );
  }
}

export default App;
