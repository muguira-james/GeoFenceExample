
var url = "http://localhost:8080/api/locatorboards/groups";

fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    console.log(data.results)

  })
  .catch(function(error) {
    console.log("Error:-->", error)
  })
