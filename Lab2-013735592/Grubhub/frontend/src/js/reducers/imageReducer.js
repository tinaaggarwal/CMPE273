import actionTypes from '../constants/index';

const initialState = {
    imageUrl: ''
};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.UPLOAD_IMAGE:
            console.log(action.payload.data.image)
            return Object.assign({}, state, {
                imageUrl: action.payload.data.image
            });

        default:
            break;
    }
    return state;
};

export default imageReducer;