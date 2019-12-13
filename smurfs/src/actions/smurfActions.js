//API calls, dispatching and API requests.
import axios from "axios";

//exporting ALLTHETHINGSOMGLOL
export const REQUEST_SMURFS = "REQUEST_SMURFS";
export const SMURFS_RECEIVED = "SMURFS_RECEIVED";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const POST_SMURF = "POST_SMURF";
export const SMURF_POSTED = "SMURF_POSTED";
export const POST_FAILED = "POST_FAILED";


export const requestSmurfs = () => ((dispatch) => {
    dispatch({ type: REQUEST_SMURFS });
    console.log("SMURFS HAVE BEEN REQUESTED. INBOUND.");
    axios
        .get("http://localhost:3333/smurfs")
        .then((response) => {
            //response.data in this case should be an array of our smurf objects. Also, if you don't host this on port 3333 and your request fails, it's not my fault >:(
            console.log("GET RESPONSE: ", response);
            dispatch({ type: SMURFS_RECEIVED, payload: response.data })
        })
        .catch((error) => {
            console.log("GET ERROR: ", error);
            dispatch({ type: REQUEST_FAILED, payload: error.response });
        });
});

export const postSmurf = (smurf) => ((dispatch) => {
    dispatch({ type: POST_SMURF });
    axios
        .post("http://localhost:3333/smurfs", smurf)
        .then((response) => {
            dispatch({ type: SMURF_POSTED, payload: smurf });
            console.log("POST RESPONSE: ", response);
        })
        .catch((error) => {
            dispatch({ type: POST_FAILED, payload: error.response });
            console.log("POST ERROR: ", error);
        });
});