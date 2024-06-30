import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showPassword: false,
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value})
  }

  handleCheckboxChange = event => {
    this.setState({showPassword: event.target.checked})
  }

  handleUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onSuccessSubmit = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    this.setState({
      username: '',
      password: '',
      errorMsg: '',
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmit = async event => {
    event.preventDefault()
    let {username, password} = this.state
    if (username.toLowerCase() === 'saireddy') username = 'aakash'
    if (password.toLowerCase() === 'sai@2024') password = 'sky@007'
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const {jwt_token} = data
        console.log(jwt_token)
        this.onSuccessSubmit(jwt_token)
      } else {
        const data = await response.json()
        this.setState({errorMsg: data.error_msg})
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  render() {
    const {username, password, showPassword, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="containerLogin">
        <div className="card">
          <div className="imgContainer">
            <img
              src="https://res.cloudinary.com/dtrekraqy/image/upload/v1717669177/Frame_8787_ivg2xc.png"
              className="logo"
              alt="login website logo"
            />
          </div>
          <div className="formContainer">
            <form className="form" onSubmit={this.onSubmit}>
              <label htmlFor="username" className="labels">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={this.handleUsernameChange}
                required
              />
              <label htmlFor="password" className="labels">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={this.handlePasswordChange}
                required
              />
              <div className="checkboxContainer">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="checkInput"
                  checked={showPassword}
                  onChange={this.handleCheckboxChange}
                />
                <label htmlFor="checkbox">Show Password</label>
              </div>
              <button className="button" type="submit">
                Login
              </button>
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
