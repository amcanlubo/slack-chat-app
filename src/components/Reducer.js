const Reducer = (state,action) => {
    switch(action.type){
        
        case 'UPDATE_CHANNELID':
            return{
                ...state,
                ChannelID: action.payload
            };
            default: return state;
    };
};

export default Reducer
