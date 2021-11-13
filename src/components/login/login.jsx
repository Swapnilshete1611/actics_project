import React from "react";
import loginImg from "../../login.svg";
import usersData from "../../Static/users/signin.json";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', password: '',
    };
  };

  handleOnUsernameChange = (e) => {
    this.setState({username:e.target.value});
  }

  handleOnPasswordChange = (e) => {
    this.setState({password:e.target.value});
  };

  isValidUser(inUsername, inPassword) {
    var data = JSON.parse(localStorage.getItem('JSONData'));
    if(data){
      data = JSON.parse(localStorage.getItem('JSONData'));
    } else {
      data = usersData['usersData'];
    }
    const result = data.find(({ username }) => username === inUsername);
    // usersData['usersData'].map((data, index) => (
    //   alert(data.username)
    // ));

    if (result && result.password === inPassword) {
      return true;
    }
    return false;
  }

  // handle button click of login form
  handleLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.username !== '' && this.state.password !== '') {
      var isLogin = this.isValidUser(this.state.username, this.state.password);
      if (isLogin) {
        var data = JSON.parse(localStorage.getItem('JSONData'));
        if(data){
          data = JSON.parse(localStorage.getItem('JSONData'));
        } else {
          data = usersData['usersData'];
        }
        const result = data.find(({ username }) => username === this.state.username );
        localStorage.clear();
        localStorage.setItem('token', result.token);
        localStorage.setItem('JSONData',JSON.stringify(data));
        var today = new Date();
        var date = today.getFullYear()+' '+(today.getMonth()+1)+' '+today.getDate();
        var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        console.log(date + ' '+ time);
        localStorage.setItem('tokenTime', date + ' '+ time);
        window.location.href = "/";
      } else {
        alert('Please check username and password');
      }
    }
    if (this.state.username === '' || this.state.username === null) {
      alert('Please enter username');
    }
    if (this.state.password === '' || this.state.password === null) {
      alert('Please enter password');
    }
  };

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="Imaggge" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={this.handleOnUsernameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={this.handleOnPasswordChange} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.handleLogin} >
            Login
          </button>
        </div>
      </div>
    );
  }
}
