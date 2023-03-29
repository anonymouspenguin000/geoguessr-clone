const initialState = {
    acDEekrstu: sessionStorage.getItem('acDEekrstu') || ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "EN_ACDEEKRSTU":
            sessionStorage.setItem('acDEekrstu', 'acDEekrstu');
            return {...state, 'acDEekrstu': 'acDEekrstu'};
        default:
            return state;
    }
}
