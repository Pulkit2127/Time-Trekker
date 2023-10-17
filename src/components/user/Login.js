import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login=()=> {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const Navigate=useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = formData;
    const user=JSON.parse(localStorage.getItem(username));
    if(user==null){
        alert("username is invalid or it does not exits");
    }
    else {
        if(user.password!=password){
            alert("password is not correct");
        }
        else{
           alert ("login successful");
           localStorage.setItem("current_user",username);
           localStorage.getItem("loggedIn",true);
           Navigate('/list');
        }
    }
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={HandleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
