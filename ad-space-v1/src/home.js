import {useEffect, React, useState} from "react"
import { useNavigate } from "react-router-dom";
import {webApp, youtube, baseParams, googleAuth} from './api/axiosConfig';

const Home = (props) => {
    const { loggedIn, username } = props
    const [youtubeData, setData] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
      }, [])
   
    
    const onYoutubeButtonClick = () => {
        /* global google */
        const client = google.accounts.oauth2.initTokenClient({
            client_id: '725701818243-m045uvoblf1ffq05biikalc5dva3kqih.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/youtube.readonly',
            callback: handleCallbackResponse
        });
        client.requestAccessToken();
    }
    async function handleCallbackResponse(tokenResponse) {
        try {
            console.log(tokenResponse);
            if (tokenResponse && tokenResponse.access_token) {
                if (google.accounts.oauth2.hasGrantedAnyScope(tokenResponse,
                    "https://www.googleapis.com/auth/youtube.readonly")) {
                    const config = {
                        headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                    };
                    await youtube.get("/channels", config).then((res) => {
                        console.log(res.data.items);
                        setData(res.data.items);
                    });
                }
            }
            
        } catch (error) {
            console.log(error);
        } 
    }
    const onLoginButtonClick = () => {
        if (loggedIn) {
            props.setLoggedIn(false);
            navigate("/");
        } else {
            navigate("/login")
        }
    }

    const onSignUpButtonClick = () => {
        navigate("/signup")
    }

    return <div className="mainContainer">
        
        <div className={"titleContainer"}>
            <div>TITLE</div>
        </div>
        <div className={"buttonContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onLoginButtonClick}
                value={loggedIn ? "Log out" : "Log in"} />
            {(loggedIn ? <div> 
                <div className={"buttonContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onYoutubeButtonClick}
                    value= "Add Youtube" />
                </div>
                username: {username}
            </div> : 
            <div className={"buttonContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onSignUpButtonClick}
                    value= "Sign Up" />
            </div>)}
        </div>


    </div>
}

export default Home