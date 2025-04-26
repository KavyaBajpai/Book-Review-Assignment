import { createContext, useState, useEffect } from "react";

export const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedUserId = localStorage.getItem('userId');
        //const storedToken = localStorage.getItem('token'); // optional: to persist token

        if (storedUser && storedUserId) {
            setUser(storedUser);
            setUserId(storedUserId);
        }

        
        
    }, []);

    
    useEffect(() => {
        if (user && userId) {
            localStorage.setItem('user', user);
            localStorage.setItem('userId', userId);
        }
    }, [user, userId]);

    return (
        <MainContext.Provider value={{ isOpen, setIsOpen, user, setUser, userId, setUserId }}>
            {children}
        </MainContext.Provider>
    );
};

export default MainContextProvider;
