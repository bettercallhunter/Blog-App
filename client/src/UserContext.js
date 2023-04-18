import React from 'react';
export const UserContext = React.createContext({});
export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = React.useState({});
    return (<UserContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
    </UserContext.Provider >

    )
}