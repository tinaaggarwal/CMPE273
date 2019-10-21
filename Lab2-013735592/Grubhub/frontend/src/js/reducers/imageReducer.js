import actionTypes from '../constants/index';

const initialState = {
    imageUrl: ''
};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.UPLOAD_IMAGE:
            console.log(action.payload.imageUrl)
            return Object.assign({}, state, {
                imageUrl: action.payload.imageUrl
            });

        default:
            break;
    }
    return state;
};

export default imageReducer;