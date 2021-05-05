import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
  		<div className="login-form">
			<h1>Register Form</h1>
			<form action="http://localhost:4000/register" method="POST">
				<input type="text" name="username" placeholder="Username" required />
				<input type="password" name="password" placeholder="Password" required />
				<input type="submit" />
			</form>
		</div>
    </div>
  );
}

export default App;
