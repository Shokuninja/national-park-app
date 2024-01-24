import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import * as yup from 'yup' 

function Home({user, handleLogin, isLoggedin}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [signupUsername, setSignupUsername] = useState("")
  const [signupPassword, setsignupPassword] = useState("")
  const [isReturningUser, setIsReturningUser] = useState(true)

  const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const signupSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    signupUsername: yup.string().required('Username is required'),
    signupPassword: yup.string().required('Password is required'),
  });


  function handleSubmit(e) {
    e.preventDefault()
    handleLogin({username, password})
    setUsername("")
    setPassword("")
  }

  function handleReturningUser(e) {
    e.preventDefault()
    setIsReturningUser(!isReturningUser)
  }

  function handleSignUp(e) {
    e.preventDefault()
    const newUser = {
      'first_name': firstName,
      'last_name': lastName,
      'username' : signupUsername,
      'password' : signupPassword
    }
    fetch('http://localhost:5555/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json()) 
      .then(setIsReturningUser(!isReturningUser))
      .then(
        setFirstName(""),
        setLastName(""),
        setSignupUsername(""),
        setsignupPassword("")
      )
      .catch((error) => {
        console.error('Error submitting logging in:', error);
      });
  }

  return (
    user ?  (
      <div>
        <h1>Welcome to Park Lens!</h1>
      </div>)
      :
      isReturningUser ?  (
    <div>
      <h1>Welcome to Park Lens!</h1>
      <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  className="input-field"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value) }
                />
                <input
                  type="text"
                  placeholder="password"
                  className="input-field"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="action-button">Login</button>
                <button onClick={handleReturningUser} className="action-button">Create account</button>
      </form>
    </div>) :
    <div>
      <h1>Welcome to Park Lens!</h1>
      <form onSubmit={handleSignUp}>
      <input
        type="text"
        placeholder="First Name"
        className="input-field"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="input-field"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        className="input-field"
        name="username"
        value={signupUsername}
        onChange={(e) => setSignupUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input-field"
        name="password"
        value={signupPassword}
        onChange={(e) => setsignupPassword(e.target.value)}
      />
      </form>
      <button onClick={handleSignUp} type="submit" className="action-button">Signup</button>
      <button onClick={handleReturningUser} className="action-button">Signin</button>
    </div> 
  )
}

export default Home