import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import Test from "./components/Test";
import axios from "axios";
// import thunk from 'redux-thunk'
// For future using
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MakeList from "./components/MakeList";
import Lists from "./components/Lists";
import List from "./components/List";
import searchListResults from "./components/SearchListResults"

import Search from './components/Search'
import Movie from './components/Movie'
import LoginAlert from './components/LoginAlert'
import Premium from './components/Premium'



import { BACKEND_DOMAIN } from "./Global";
import SearchListResults from "./components/SearchListResults";

//GLOBAL VARIABLES

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let that = this;
    console.log("fetching to endpoint /user/check");
    axios({
      method: "",
      url: "/user/check",
      withCredentials: true
    }).then(response => {
      console.log("response", response);
      let user = response.data.email;
      console.log("user", user);
      that.props.dispatch({ type: "Login", payload: user });
    });
  }

  renderHome() {
    console.log("Home page rendered");
    return <Home />;
  }

  renderSearch() {
    console.log("Search page rendered");
    return <Search />;
  }

  renderMovie() {
    console.log("Movie details page rendered");
    return <Movie />;
  }

  // Render Test comp for fetch data from mongo and understand that it works
  renderTest() {
    console.log("test page rendered");
    return (
      <div>
        <Signup />
      </div>
    );
  }
  renderSignup() {
    console.log("signup component rendered");
    return <Signup />;
  }
  renderLogin() {
    console.log("login component rendered");
    return <Login />;
  }
  renderLoginAlert() {
    console.log("login alert rendered");
    return <LoginAlert />;
  }
  renderMakeList() {
    console.log("makeList component rendered");
    return <MakeList />;
  }
  renderLists(routerData) {
    console.log("lists component rendered");
    return <Lists />;
  }
  renderList(routerData) {
    console.log("specific list component rendered");
    console.log("path of list", routerData.match.params.id);
    return <List listId={routerData.match.params.id} />;
  }
  renderSearchListResults(routerData){
    console.log("search list results route rendered")
    console.log("path of page",routerData.match.params.id)
    return <SearchListResults></SearchListResults>
  }

  renderPremium() {
    console.log('premium component rendered')
    return <Premium />
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/signup" render={this.renderSignup} />
          <Route exact path="/login" render={this.renderLogin} />
          <Route exact path="/" render={this.renderHome} />
          <Route exact path="/premium" render={this.renderPremium} />
          <Route exact path="/search" render={this.renderSearch} />
          <Route exact path="/movie" render={this.renderMovie} />
          <Route exact path="/test" render={this.renderTest} />
          <Route exact path="/lists/makeList" render={this.renderMakeList} />
          <Route exact path="/lists" render={this.renderLists} />
          <Route exact path={"/lists/:id"} render={this.renderList} />
          <Route exact path={"/searchlistresults/:id"} render={this.renderSearchListResults} />
          <Route exact path="/loginalert" render={this.renderLoginAlert} />
        </div>
      </BrowserRouter>
    );
  }
}
let mapStateToProps = function(state) {
  return { ...state };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
