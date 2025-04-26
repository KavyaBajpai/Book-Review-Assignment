import { createContext, useState, useEffect } from "react";

export const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    // Load user data from localStorage on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedUserId = localStorage.getItem('userId');
        const storedToken = localStorage.getItem('token'); // optional: to persist token

        if (storedUser && storedUserId) {
            setUser(storedUser);
            setUserId(storedUserId);
        }

        // Optional: You can also check if the token is available and consider it in your authentication flow
        if (storedToken) {
            // Add logic to check token validity here if necessary
        }
    }, []);

    // Persist user data in localStorage when it changes
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
