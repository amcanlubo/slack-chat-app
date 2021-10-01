const Reducer = (state,action) => {
    switch(action.type){
        
        case 'PASS_TO_CHATFORM':
            return{
                ...state,
                ChatInfo: action.payload
            };
            default: return state;
    };
};

export default Reducer
