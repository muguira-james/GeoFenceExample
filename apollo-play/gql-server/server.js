var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
 
        playerOnHole(hole: Int!): Player
    }

    type Player {
        id: Int
        firstName: String
        lastName: String
        hole: Int
        holeLocation: String
    }
`);

var playerData = [
    {
        id: 1,
        firstName: "Paula",
        lastName: "Brown",
        hole: 1,
        holeLocation: "TEE"
    },
    {
        id: 2,
        firstName: "Sarah",
        LastName: "Ray",
        hole: 2,
        holeLocation: "GRN"
    }
]

var getPlayer = (args) => {
    
    return playerData.filter(p => { 
        return p.id == args.id})[0]
}

var getPlayerOnHole = (args) => {
    console.log("hole=, args")
    return playerData[0]
}
// Root resolver
var root = {
    message: () => 'Hello James!',
    foo: () => "foo!",
    zip: () => 42,
    player: getPlayerOnHole,
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));