
const { GraphQLServer } = require('graphql-yoga')

var fetch = require('node-fetch')
var parser = require('xml2json')

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

const baseURL = "http://ec2-52-90-72-175.compute-1.amazonaws.com:5000/active"
var lpgaURL = 'http://services.lpgascoring.com/ws/1.5/locatorboards/players?clientId=70874eab-b701-47bb-be91-a42b2cb70da6'

// const awsURL = 'http://ec2-54-173-167-35.compute-1.amazonaws.com:8080/LPGA-FanExperience/api/testdata'

const resolvers = {
  Query: {
    players: () => playerData,
    playersU: () => {
          return fetch(baseURL)
                  .then(res => res.json())
                  .then(res => {
                    return res.GolfDataFeed.Tournament.Locatorboard.Player
                  })
    },
    playersLPGA: () => {
      return fetch(lpgaURL)
      .then(res => res.text())
      .then(res =>  parser.toJson(res))
      .then(res => {
        return JSON.parse(res).GolfDataFeed.Tournament.Locatorboard.Player
      })
  
    },
    player: (parent, args) => {
      return playerData.filter(z => {return z.ID == args.ID})[0]
    },
    hole: (parent, args) => {
      return playerData.filter(p => {
        return p.Hole == args.Hole
      })[0]
    },
  }

}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`The server is running on http://localhost:4000`))