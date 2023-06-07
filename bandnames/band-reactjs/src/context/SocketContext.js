import React, {createContext} from "react";
import {useSocket} from "../hooks/useSocket";


export const SocketContext = createContext();


export const SocketProvider = ({children}) => {
    const {socket, online} = useSocket("http://localhost:5001");

    const contextValue = {
        socket,
        online
    };

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};
