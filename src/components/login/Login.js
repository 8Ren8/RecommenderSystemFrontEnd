import React, { useState } from 'react'
import { useLocalState } from '../../util/LocalStorage'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {

    const url = 'http://localhost:8083/api/v1/auth/login';

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [lsUsername, setLsUsername] = useLocalState("", "username");
    const [userID, setUserID] = useLocalState("", "userID");
    const [userRole, setUserRole] = useLocalState("", "userRole");

    function sendLoginRequest() {
        const reqBody = {
            username: username,
            password: password
        };

        fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(reqBody)
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                return Promise.reject("Invalid Credentials.");
            }
        })
        .then((data) => {
            setJwt(data.token);
            setLsUsername(data.user.username);
            setUserID(data.user.userId);
            setUserRole(data.user.role);
            window.location.href = "/api/v1/movies";
        }).catch ((message) => {
            alert(message);
        })
    }

  return (
    <div>
        <Form className="container d-flex flex-column align-items-center justify-content-center mt-4" style={{width: "50%"}}>
            <h2>Log In</h2>
            <Form.Group className="mb-3" controlId="formBasicUsername"> 
                <Form.Label>
                    Username
                </Form.Label>
                <Form.Control style = {{width: "20rem"}} type='text' value = {username} onChange = {(event) => setUsername(event.target.value)} placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword"> 
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control style = {{width: "20rem"}} type="password" value = {password} onChange = {(event) => setPassword(event.target.value)} placeholder="Password" required/>
            </Form.Group>
            <Button variant = "info" onClick={() => sendLoginRequest()}>Login</Button>
        </Form>
    </div>
  )
}

export default Login