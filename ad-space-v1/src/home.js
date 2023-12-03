import {useEffect, React, useState} from "react"
import { useNavigate, Link } from "react-router-dom";
import {webApp, youtube, baseParams, googleAuth} from './api/axiosConfig';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

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
        }
    }

    return <div className = "homeParent">
    <div className="sideBarContainer">
            <Sidebar>
            <Menu
                menuItemStyles={{
                    button: {
                        
                    },
                }}
            >     
                <div>TITLE</div>
                {(loggedIn ?
                <div>
                    <MenuItem component={<Link to="/" onClick= {onLoginButtonClick}/>}>Log out</MenuItem>
                </div>:
                <div>
                    <MenuItem component={<Link to="/login" onClick= {onLoginButtonClick}/>}>Log in</MenuItem>
                    <MenuItem component={<Link to="/signup" />}>Sign Up</MenuItem>
                </div>
                )}
            </Menu>
            </Sidebar>
        </div>
        <div className="mainContainer">
        {(loggedIn ? 
        <div> 
            <div className={"buttonContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onYoutubeButtonClick}
                value= "Add Youtube" />
            </div>
            username: {username}
        </div>
        : <div></div>)};
        </div>
    </div>
}

export default Home