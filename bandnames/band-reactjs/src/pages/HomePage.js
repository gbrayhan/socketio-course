import React, {useContext} from "react";
import {Message} from "rsuite";
import styles from "../App.module.css";
import {SocketContext} from "../context/SocketContext";
import BandList from "../components/BandList";
import BandAdd from "../components/BandAdd";

function HomePage() {
    const {online} = useContext(SocketContext);


    return (<div className={styles.main}>
        <div>
            <Message showIcon type={online ? "success" : "error"}>
                Server Status: {online ? "Online" : "Offline"}
            </Message>
        </div>
        <div>
            <h1>Band Names</h1>
            <div>
                <BandList/>
                <BandAdd/>
            </div>
        </div>
    </div>);
}

export default HomePage;
