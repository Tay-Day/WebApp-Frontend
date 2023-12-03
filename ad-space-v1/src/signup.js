import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {webApp, youtube, googleAuth} from './api/axiosConfig';

const SignUp = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [emailError, setEmailError] = useState("")
    
    const navigate = useNavigate();
        
    const onButtonClick = () => {
        // Set initial error values to empty
        setUsernameError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === username) {
            setUsernameError("Please enter your username")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7 && password.length < 124) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        getUser();
    }
    const getUser = async () => {
        try {
            const userData = {
                "email": email,
                "username": username,
                "password": password
            }; 
            const response = await webApp.post("/api/auth/signup", userData);
            if (response.status == 200) {
                props.setLoggedIn(true)
                props.setUsername(username)
                navigate("/");
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <div className={"mainContainer"}>
        <div className = {"loginContainer"}>
        <div className={"titleContainer"}>
            <div>Sign Up</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="email"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={username}
                placeholder="username"
                onChange={ev => setUsername(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{usernameError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="password"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Sign Up"} />
        </div>
        </div>
    </div>
}

export default SignUp