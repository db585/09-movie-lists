import React, { Component } from 'react'
import '../css/style.css'
import { Redirect, Link } from 'react-router-dom'
// import "../css/LoginSignup.css";
import { connect } from 'react-redux'
import axios from 'axios'
import App from '../App.js'
import Modal from 'react-modal'

Modal.setAppElement(App)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '50000000000',
    webkitBoxShadow: '0px 1px 4px 1px rgba(201, 201, 201, 0.27)',
    mozBoxShadow: '0px 1px 4px 1px rgba(201, 201, 201, 0.27)',
    boxShadow: '0px 1px 4px 1px rgba(201, 201, 201, 0.27)',
    backgroundColor: '#F7F7F7'
  }
}

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputEmail: '',
      inputPassword: '',
      modalIsOpen: true,
      modalMessage: ''
    }
    this.handleInputPassword = this.handleInputPassword.bind(this)
    this.handleInputEmail = this.handleInputEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  handleInputEmail(evt) {
    this.setState({ inputEmail: evt.currentTarget.value })
  }
  handleInputPassword(evt) {
    this.setState({ inputPassword: evt.currentTarget.value })
  }

  handleSubmit(e) {
    let that = this
    e.preventDefault()
    //make fetch request here and dispatch action if it returns positive
    //Recommend that backend also expects a password and user
    let reqBody = {
      email: this.state.inputEmail,
      password: this.state.inputPassword
    }
    console.log('reqBody', reqBody)
    axios({
      method: 'post',
      data: reqBody,
      url: 'http://localhost:5050/users/Signup',
      withCredentials: true
    })
      .then(response => {
        console.log('post signup was successful')
        console.log('response', response)
        this.props.dispatch({ type: 'login', payload: this.state.inputEmail })
      })
      .catch(e => {
        console.log('error', e)
        this.setState({
          modalMessage: 'Username taken.'
        })
      })
    //
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal() {
    // this.subtitle.style.color="#f00"
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    if (!this.props.loggedIn && this.state.modalIsOpen) {
      return (
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <h3 className="header-login-signup mb-3 ml-1">Sign up </h3>
            <form onSubmit={this.handleSubmit}>
              <div className=" ml-2">
                <input
                  type="text"
                  onChange={this.handleInputEmail}
                  value={this.state.inputEmail}
                  className="input-login-signup"
                />
                <div className="mb-1">Email</div>
              </div>
              <div>
                <input
                  type="text"
                  onChange={this.handleInputPassword}
                  value={this.state.inputPassword}
                  className=" ml-2 input-login-signup"
                />
                <div className=" ml-2 mb-2">Password</div>
              </div>
              <div className="modal-message">{this.state.modalMessage}</div>
              <input className="btn button-login-signup" type="submit" />
            </form>
          </Modal>
        </div>
      )
    } else {
      return <Redirect to="/" />
    }
  }
}

let mapStateToProps = function(state) {
  return { loggedIn: state.state.loggedIn }
}

let Signup = connect(mapStateToProps)(UnconnectedSignup)

export default Signup

//add as list item in navbar
{
  /* <li className="nav-item nav-link">
                <LoginSignup/>
                </li> */
}
