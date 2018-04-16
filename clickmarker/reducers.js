import { ADD_PLAYER, UPDATE_PLAYER } from "./actions";

export default positions;

/*
 * latlngs is an array of objects.
 */
// let playerPosition = {
//   properties: null,
//   id: null,
// }

export const initialState = {
    positions: {}
};

function positions(state = initialState, action = {}) {
    // console.log("reduc", action, action.player)
    switch (action.type) {
        case UPDATE_PLAYER:
            return updatePlayer(state, action.player);

            case ADD_PLAYER:
                return addPlayer(state, action.player);
        default:
            return state;
    }
}

function addPlayer(state, pt) {
    // console.log("addPlayer--->", pt.id, state)
    // let o = Object.create({})
    // o[pt.id] = pt.properties
    // console.log("addPlayer-->", o, Object.keys(o))
    // return {
        // ...state,
        // positions: [...state.positions, o],
        // balance: state.balance + expense.amount
    // }
    state.positions[pt.id] = pt.properties
    // console.log("addPlayer-->", state)

    return state
    // return state.positions[pt.id] = pt.properties
}

function updatePlayer(state, pt) {
    // console.log("updatePlayer--->",  pt.properties.id, state.positions, state.positions)

    // console.log("update-->", (pt.properties.id.toString() in Object.keys(state.positions)))
    if (pt.properties.id in state.positions) {
        // console.log("reduce: update", pt.properties, state.positions)
        state.positions[pt.properties.id].locationOnHole = pt.properties.playerPosition.relPos
    }

    return state;
}
