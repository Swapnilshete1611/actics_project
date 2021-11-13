import React from "react";
import loginImg from "../../login.svg";
import usersData from "../../Static/users/signin.json";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regUsername: '', regPassword: '',regEmail:''
    };
  };

  handleOnRegUsernameChange = (e) => {
    this.setState({ regUsername: e.target.value });
  }

  handleOnRegEmailChange = (e) => {
    this.setState({ regEmail: e.target.value });
  };

  handleOnRegPasswordChange = (e) => {
    this.setState({ regPassword: e.target.value });
  };

  createNewUser(inputUsername, inputEmail, inputPassword) {
    var today = new Date();
    var date = today.getFullYear()+(today.getMonth()+1)+today.getDate();
    // push into that usersData
    var newUser = {
      "username": inputUsername,
      "password": inputPassword,
      "email": inputEmail,
      "token": inputUsername +'~'+ inputEmail,
      "name": inputUsername,
      "salary": 5001,
      "id":date,
    }
    var data = usersData['usersData'];
    data.push(newUser);
    usersData['usersData']=data;
    localStorage.setItem('JSONData',JSON.stringify(data));
  };

  handleRegister = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.regUsername !== '' && this.state.regEmail !== '' && this.state.regPassword !== '') {
      const result = usersData['usersData'].find(({ username }) => username === this.state.regUsername);
      if(result){
        alert('UserName already Present please choose new another username'); 
      } else {     
        this.createNewUser(this.state.regUsername, this.state.regEmail,this.state.regPassword);
        alert('New user created succefully and redirect into Login Page please login');   
        window.location.href = "/";
      }   
    }
    if (this.state.regUsername === '' || this.state.regUsername === null) {
      alert('Please enter username');
    }
    if (this.state.regEmail === '' || this.state.regEmail === null) {
      alert('Please enter email');
    }
    if (this.state.regPassword === '' || this.state.regPassword === null) {
      alert('Please enter password');
    }
  };

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="ggg"/>
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={this.handleOnRegUsernameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="email" onChange={this.handleOnRegEmailChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={this.handleOnRegPasswordChange} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.handleRegister} >
            Register
          </button>
        </div>
      </div>
    );
  }
}
