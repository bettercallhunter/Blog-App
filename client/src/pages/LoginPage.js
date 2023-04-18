import Header from "../Header";
import React from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css'
import { UserContext } from '../UserContext';

export default function LoginPage() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [redirect, setRedirect] = React.useState(false);
    const { setUserInfo } = React.useContext(UserContext);
    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const msg = await response.json();
        if (response.ok) {
            // response.json().then(userInfo => {
            // alert(msg.message);
            // setUserInfo(userInfo)
            setRedirect(true);
            // })
        } else {
            alert(msg.message);
        }
    }

    const handleUsernameChange = (ev) => {
        setUsername(ev.target.value);
    }

    const handlePasswordChange = (ev) => {
        setPassword(ev.target.value);
    }

    if (redirect) {
        return <Redirect to='/' />
    }

    return (
        <React.Fragment>
            <Header />
            <form className="login" onSubmit={login}>
                <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <button type="submit" > Login </button>
            </form>
        </React.Fragment>
    )
}
