import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

function UserContexProvider({ children }) {
    const [user, setUser] = useState('');
    const [ready, Setready] = useState(false);
    const contextValue = { user, setUser, ready, Setready };

    useEffect(() => {
        if (!user) {
            axios.get('/user/profile').then(({ data }) => {
                setUser(data);
                Setready(true);
            }).catch(err => {
                console.log(err);
            })
        }
    }, []);


    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContexProvider