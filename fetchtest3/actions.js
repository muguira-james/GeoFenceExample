// action types
export const ADD_PLAYER = 'ADD_PLAYER';


// action creators
export const addPlayer = player => ({
    type: ADD_PLAYER,
    player
});

// action types
export const UPDATE_PLAYER = 'UPDATE_PLAYER';


// action creators
export const updatePlayer= player => ({
    type: UPDATE_PLAYER,
    player
});
