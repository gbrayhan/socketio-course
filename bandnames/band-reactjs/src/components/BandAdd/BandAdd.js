import React from "react";
import {Button, ButtonToolbar, Form} from "rsuite";


const BandAdd = ({addBand}) => {
    // state band name
    const [bandName, setBandName] = React.useState('');

    return (
        <div>
            <h3>Add a new band</h3>
            <Form>
                <Form.Group controlId="name">
                    <Form.ControlLabel>Name</Form.ControlLabel>
                    <Form.Control name="name" value={bandName} onChange={(value)=>{
                        setBandName(value);
                    }} />
                    <Form.HelpText>Name is Required</Form.HelpText>
                </Form.Group>

                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={()=>{
                            if(bandName !== ''){
                                addBand(bandName);
                                setBandName('');
                            }

                        }}>Submit</Button>
                        <Button appearance="default">Cancel</Button>
                    </ButtonToolbar>
                </Form.Group>

            </Form>
        </div>
    );
}

export default BandAdd;