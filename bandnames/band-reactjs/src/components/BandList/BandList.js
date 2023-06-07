import React, {useContext, useEffect, useState} from "react";
import TrashIcon from '@rsuite/icons/Trash';
import {Button, IconButton, Input, Table} from "rsuite";
import {SocketContext} from "../../context/SocketContext";


const EditableCell = ({rowData, dataKey, onChange, ...props}) => {
    const editing = rowData.status === 'EDIT';
    return (
        <Table.Cell {...props} className={editing ? 'table-content-editing' : ''}>
            {editing ? (
                <Input
                    size="xs"
                    value={rowData[dataKey]}
                    onChange={(value, event) => {
                        onChange && onChange(rowData.id, dataKey, value, event);
                    }}
                />
            ) : (
                <span className="table-content-edit-span">{rowData[dataKey]}</span>
            )}
        </Table.Cell>
    );
};

const ActionCell = ({rowData, dataKey, onClick, ...props}) => {
    return (
        <Table.Cell {...props} style={{padding: '6px'}}>
            <Button
                appearance="link"
                onClick={() => {
                    onClick(rowData.id);
                }}
            >
                {rowData.status === 'EDIT' ? 'Save' : 'Edit'}
            </Button>
        </Table.Cell>
    );
};

const BandList = () => {
    // use context
    const {socket} = useContext(SocketContext);

    const [data, setData] = useState([]);
    const [timerId, setTimerId] = useState();


    useEffect(() => {
        socket?.on('current-bands', (dataBand) => {
            debugger
            setData(dataBand)
        });

        return () => socket?.off('current-bands');
    }, [socket]);


    useEffect(() => {
        return () => {
            clearTimeout(timerId); // Clean up on component unmount
        };
    }, [timerId]);

    const socketChangeName = (id, name) => {
        socket?.emit('change-band-name', {id, name});
    };

    const socketVote = (id) => {
        debugger
        socket?.emit('vote-band', {id});
    };

    const socketDeleteBand = (id) => {
        socket?.emit('delete-band', {id});
    };

    const handleChange = (id, key, value) => {
        clearTimeout(timerId);
        const nextData = Object.assign([], data);
        nextData.find(item => item.id === id)[key] = value;
        setTimerId(setTimeout(() => {
            setData(nextData);
        }, 1000));
    };


    const handleEditState = id => {
        const nextData = Object.assign([], data);
        const activeItem = nextData.find(item => item.id === id);
        activeItem.status = activeItem.status ? null : 'EDIT';
        setData(nextData);

        if (activeItem.status === null) {
            console.log("event triggered from react component", activeItem.name)
            socketChangeName(activeItem.id, activeItem.name);
        }
    };

    return (
        <div>
            <Table data={data} id="band-table" height={420} width={600}>
                <Table.Column width={200}>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <EditableCell dataKey="name" onChange={handleChange}/>
                </Table.Column>
                <Table.Column width={70}>
                    <Table.HeaderCell>Votes</Table.HeaderCell>
                    <Table.Cell dataKey="votes"/>
                </Table.Column>
                <Table.Column width={70}>
                    <Table.HeaderCell>Vote</Table.HeaderCell>
                    <Table.Cell>
                        {(rowData) => {
                            return (
                                <button className="btn btn-primary" onClick={() => {
                                    socketVote(rowData.id)
                                }}>+</button>
                            )
                        }}
                    </Table.Cell>
                </Table.Column>
                <Table.Column width={70}>
                    <Table.HeaderCell>delete</Table.HeaderCell>
                    <Table.Cell>
                        {(rowData) => {
                            return (
                                <IconButton size={"xs"} icon={<TrashIcon/>} onClick={() => {
                                    socketDeleteBand(rowData.id)
                                }}/>
                            )
                        }}
                    </Table.Cell>
                </Table.Column>
                <Table.Column flexGrow={1}>
                    <Table.HeaderCell>...</Table.HeaderCell>
                    <ActionCell dataKey="id" onClick={handleEditState}/>
                </Table.Column>

            </Table>
        </div>
    );

}


export default BandList;