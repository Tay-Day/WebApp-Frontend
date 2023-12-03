import axios from 'axios';

const webApp = axios.create({
    baseURL: 'https://2986-2601-644-400-940-6835-da63-4d97-dc93.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
});
const KEY = "AIzaSyBncD-I8pBdNzKXY2-SvuZFTKN1Pe_9ZzU";

//THIS DIDN'T WORK BECAUSE CORS
const googleAuth = axios.create({
  baseURL: "https://accounts.google.com/o/oauth2/v2/auth",
  params: {
    client_id: "725701818243-m045uvoblf1ffq05biikalc5dva3kqih.apps.googleusercontent.com",
    redirect_uri: "http://localhost:3000",
    response_type: "token",
    scope: "https://www.googleapis.com/auth/youtube.readonly",
    key: KEY
  }
})

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet, statistics",
    maxResults: 5,
    key: KEY,
    mine: true
  }
});

export {
    webApp,
    youtube,
    googleAuth
};