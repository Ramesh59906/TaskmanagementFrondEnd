import React, { useState } from 'react'

const From = () => {
  const [input, setinput] = useState({
    username: "",
    age: ""
  });

  const handlechenge = (e) => {
    const {name, value} = e.target;
    setinput((prevInput) => ({ ...prevInput, [name]: value }))
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", input);  // Log form data to console
    alert(`Successfully submitted: Username: ${input.username}, Age: ${input.age}`);
  }
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <h1>login</h1>
        <label>username</label><br />
        <input type="text" onChange={handlechenge} value={input.username} name='username' /><br />
        <label>age</label><br />
        <input type="number" onChange={handlechenge} value={input.age} name='age' /><br />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default From;
