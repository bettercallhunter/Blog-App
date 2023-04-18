// import React from "react";
// import '../App.css'
// export default function RegisterPage() {
//     const [username, setUsername] = React.useState("");
//     const [password, setPassword] = React.useState("");
//     async function register(ev) {
//         ev.preventDefault();
//         const response = await fetch('http://localhost:4000/register', {
//             method: 'POST',
//             body: JSON.stringify({ username, password }),
//             headers: { 'Content-Type': 'application/json' },
//         });
//         const msg = await response.json();
//         if (response.status !== 200) {
//             alert(msg.message)
//         } else {
//             alert(msg.message)

//         }
//     }
//     return (
//         <React.Fragment>
//             <form className="register" onSubmit={register}>
//                 <h1>Register</h1>
//                 <input type="text"
//                     placeholder="username"
//                     value={username}
//                     onChange={ev => setUsername(ev.target.value)} />
//                 <input type="password"
//                     placeholder="password"
//                     value={password}
//                     onChange={ev => setPassword(ev.target.value)} />
//                 <button>Register</button>
//             </form>
//         </React.Fragment>
//     )
// }
import React from 'react';
import Header from "../Header";
import { useState } from "react";
import { Redirect } from 'react-router-dom';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const msg = await response.json();
        if (response.status === 200) {
            alert('registration successful');
            setRedirect(true);
        } else {
            alert(msg.message);
        }
    }
    if (redirect) {
        return <Redirect to='/' />
    }
    return (
        <React.Fragment>
            <Header />

            <form className="register" onSubmit={register}>
                <h1>Register</h1>
                <input type="text"
                    placeholder="username"
                    value={username}
                    onChange={ev => setUsername(ev.target.value)} />
                <input type="password"
                    placeholder="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button>Register</button>
            </form>
        </React.Fragment>
    );
}