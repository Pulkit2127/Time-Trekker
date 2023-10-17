import React, { useState } from 'react';

const Register=()=> {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, password, confirmPassword } = formData;
    if(username==''||password==''|| confirmPassword==''){
      alert("please fill all the fields");
      return ;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      let user=JSON.parse(localStorage.getItem(formData.username));
      if(user!=null){
        alert("user already exists");
      }
      else {
      console.log('Registration successful');
      localStorage.setItem(formData.username,JSON.stringify(formData));
      localStorage.setItem(formData.username+"?list",JSON.stringify([]));
      localStorage.setItem(formData.username+"?comList",JSON.stringify([]));
      }
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
      });
      setErrorMessage('');
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
