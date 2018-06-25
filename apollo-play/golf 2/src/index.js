const { GraphQLServer } = require('graphql-yoga')
/*
 {
    id: 1,
    name: "jim",
    hole: 1,
    holeLocation: "TEE"
  },
  {
    id: 2,
    name: "paul",
    hole: 2,
    holeLocation: "FWY"
  },*/

var playerData = [
  {
    "HoleLocation":"TEE",
    "Status":"InProgress",
    "Hole":10,
    "StartTee":10,
    "FirstName":"Carlota",
    "StartTime":"09:16",
    "Country":"USA",
    "ID":93254,
    "LastName":"Ciganda",
    "Course":"Ki",
    "Rank": "57",
    "CumulativeToPar": "12",
    "RoundToPar": "8"
  },
  {"HoleLocation":"TEE","Status":"InProgress","Hole":10,"StartTee":17,"FirstName":"Marina","StartTime":"13:27","Country":"USA","ID":98011,"LastName":"Alex","Course":"Ki", "Rank": "57","CumulativeToPar": "12","RoundToPar": "8"},
  {"HoleLocation":"GRN","Status":"InProgress","Hole":9,"StartTee":17,"FirstName":"Rebecca","StartTime":"13:38","Country":"AUS","ID":98276,"LastName":"Artis","Course":"Ki", "Rank": "57","CumulativeToPar": "12","RoundToPar": "8"},
  {"HoleLocation":"GRN","Status":"InProgress","Hole":9,"StartTee":16,"FirstName":"Lizette","StartTime":"13:27","Country":"USA","ID":88510,"LastName":"Salas","Course":"Ki", "Rank": "57","CumulativeToPar": "12","RoundToPar": "8"},
  {"HoleLocation":"GRN","Status":"InProgress","Hole":9,"StartTee":16,"FirstName":"Jennifer","StartTime":"13:38","Country":"AUS","ID":88275,"LastName":"Song","Course":"Ki", "Rank": "57","CumulativeToPar": "12","RoundToPar": "8"}
]

const resolvers = {
  Query: {
    players: () => playerData,
    player: (parent, args) => {
      return playerData.filter(z => {return z.id == args.id})[0]
    },
    hole: (parent, args) => {
      return playerData.filter(p => {
        return p.hole == args.hole
      })[0]
    },
  }

}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`The server is running on http://localhost:4000`))