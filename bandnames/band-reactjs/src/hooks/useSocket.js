import {useEffect, useState} from "react";
import {io} from "socket.io-client";


export const useSocket = (socketServerUrl) => {
    const [socket, setSocket] = useState(null)
    // online state
    const [online, setOnline] = useState(false)

    useEffect(() => {
        const socket = io(socketServerUrl, {
            transports: ['websocket']
        })

        setSocket(socket)

        return () => {
            socket.disconnect()
        }
    }, [socketServerUrl])

    useEffect(() => {
        socket?.on('connect', () => {
            setOnline(true)
        })
        socket?.on('disconnect', () => {
            setOnline(false)
        })
    }, [socket])

    return {socket, online}
}