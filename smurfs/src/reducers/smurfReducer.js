import { REQUEST_SMURFS, SMURFS_RECEIVED, REQUEST_FAILED, POST_SMURF, SMURF_POSTED, POST_FAILED } from "../actions";

const initialState = {
    smurfs: null,
    busy: false,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_SMURFS:
        case POST_SMURF:
            return ({
                ...state,
                busy: true,
            })
        case SMURFS_RECEIVED:
            return ({
                ...state,
                smurfs: action.payload,
                busy: false,
                error: '',
            })
        case REQUEST_FAILED:
        case POST_FAILED:
            return ({
                ...state,
                busy: false,
                error: action.payload,
            })
        case SMURF_POSTED:
            return ({
                ...state,
                smurfs: [...state.smurfs, action.payload],
                busy: false,
                error: '',
            })

        default:
            return (state);
    }
}

export default reducer;