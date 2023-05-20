import React, {useEffect} from "react";
import {Message} from "rsuite";
import BandAdd from "./components/BandAdd";
import styles from "./App.module.css";
import BandList from "./components/BandList";
import {io} from "socket.io-client";


const connectSocketServer = () => {
    const socket = io.connect("http://localhost:3000", {
        transports: ["websocket"],
    });
    return socket;
}

function App() {
    const [socket] = React.useState(connectSocketServer());
    const [online, setOnline] = React.useState(false);
    const [bands, setBands] = React.useState([]);

    useEffect(() => {
        if (socket) {
            setOnline(socket.connected);
        }

    }, [socket]);

    useEffect(() => {
        socket.on("connect", () => {
            setOnline(true);
        });

        socket.on("disconnect", () => {
            setOnline(false);
        }, [socket]);

    }, [socket]);


    useEffect(() => {
        socket.on("current-bands", (bands) => {
            setBands(bands);
            console.log(bands);
        });
    }, [socket]);


    const vote = (id) => {
        socket.emit("vote-band", id);
    }

    const deleteBand = (id) => {
        socket.emit("delete-band", id);
    }
    const changeName = (id, newName) => {
        console.log("Prev step to emit event from react component", id, newName)
        socket.emit("change-band-name", {id, name: newName});
    }

    const addBand = (name) => {
        socket.emit("add-band", name);
    }


    const actionsBand = {
        vote,
        deleteBand,
        changeName,
    }

    return (<div className={styles.main}>
        <div>
            <Message showIcon type={online ? "success" : "error"}>
                Server Status: {online ? "Online" : "Offline"}
            </Message>
        </div>
        <div>
            <h1>Band Names</h1>
            <div>
                <BandList dataBands={bands} actions={actionsBand}/>
                <BandAdd addBand={addBand}/>
            </div>
        </div>
    </div>);
}

export default App;
