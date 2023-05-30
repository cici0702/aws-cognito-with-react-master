import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useState } from 'react';
import UserPool from '../UserPool';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [OTP, setOTP] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    );
    UserPool.signUp(username, password, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't sign up");
      } else {
        console.log(data);
        setVerifyProcess(true);
        alert('User Added Successfully');
      }
    });
  };

  const verifyAccount = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });
    console.log(user);
    user.confirmRegistration(OTP, true, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't verify account");
      } else {
        console.log(data);
        alert('Account verified successfully');
        window.location.href = '/login';
      }
    });
  };

  return (
    <div className="container">
      {verifyProcess === false ? (
        <form className="form-signup mt-5" onSubmit={onSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input
            type="text"
            id="inputUsername"
            className="form-control mb-3"
            placeholder="Username"
            required
            value={username.toLowerCase().trim()}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            className="form-control mb-3"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control mb-3"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      ) : (
        <form className="form-signin mt-5" onSubmit={verifyAccount}>
          <h1 className="h3 mb-3 font-weight-normal">Verify your account</h1>
          <label htmlFor="inputOTP" className="sr-only">Enter the OTP</label>
          <input
            type="text"
            id="inputOTP"
            className="form-control mb-3"
            placeholder="OTP"
            required
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Verify</button>
        </form>
      )}
    </div>
  );
}

export default Register;
