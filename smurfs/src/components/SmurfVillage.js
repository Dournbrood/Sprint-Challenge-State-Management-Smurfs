import React, { useState } from "react";

import { connect } from "react-redux";

import { requestSmurfs, postSmurf } from "../actions";

//Core component, absolutely crucial to the app, unusable otherwise.
//THE ONE, THE ONLY
//LOADER!
import Loader from "react-loader-spinner";

//real component hours
const SmurfVillage = props => {

    const [newSmurf, setNewSmurf] = useState({ name: '', age: '', height: '' })

    //request handler
    const handleRequest = (event) => {
        event.preventDefault();
        props.requestSmurfs();
    }

    //change handler
    const handleChanges = (event) => {
        console.log("FORM FIELD EVENT IS ", event);
        setNewSmurf({
            ...newSmurf,
            [event.target.name]: event.target.value
        });
    };

    //onSubmit handler
    const submitSmurfForm = (event) => {
        event.preventDefault();
        if (newSmurf.name && newSmurf.age && newSmurf.height) {
            props.postSmurf(newSmurf);
            setNewSmurf({ name: '', age: '', height: '' });
        };
    };

    //rrrrrenderrrrrr
    return (
        <div>
            {/* Show this if app is busy. */}
            {props.busy && (
                <Loader type="Puff" color="#2ED73A" height={200} width={200} />
            )}
            {/* Show this if no smurfs and app is not busy */}
            {!props.smurfs && !props.busy && (
                <h2>Sure is lonely around here... Click the button to get a smurf!</h2>
            )}
            {/* Show this if we have smurfs and app is not busy. */}
            {props.smurfs && !props.busy && (
                <div>
                    <h2>Looking to create a new smurf? Use this!</h2>
                    <form onSubmit={submitSmurfForm}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={newSmurf.name}
                            onChange={handleChanges}
                            placeholder="Smurf's Name"
                        />
                        <label htmlFor="age">Age</label>
                        <input
                            id="age"
                            type="text"
                            name="age"
                            value={newSmurf.age}
                            onChange={handleChanges}
                            placeholder="Smurf's Age"
                        />
                        <label htmlFor="height">Height</label>
                        <input
                            id="height"
                            type="text"
                            name="height"
                            value={newSmurf.height}
                            onChange={handleChanges}
                            placeholder="Smurf's Height"
                        />
                        <button type="submit">Add Smurf!</button>
                    </form>

                    <h1>Your Village:</h1>
                    <ul>
                        {props.smurfs.map((smurf) => {
                            return (<li key={smurf.id}>{smurf.name} is a {smurf.age}-year-old Smurf standing at {smurf.height}.</li>);
                        })}
                    </ul>
                </div>
            )}
            {/* Button goes here. */}
            <button onClick={handleRequest}>Request Smurfs!</button>

        </div>
    );
};

//mapStateToProps definition. 
const mapStateToProps = state => {
    return ({
        smurfs: state.smurfs,
        busy: state.busy,
        error: state.error,
    });
};

//And finally, exporting our connector.
export default connect(
    mapStateToProps,
    { requestSmurfs, postSmurf }
)(SmurfVillage);