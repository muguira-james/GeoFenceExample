
if (process.argv.length <= 2) {
  console.log('usage: node readline fileName')
  return
}

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(process.argv[2])
});

lineReader.on('line', function (line) {

  // console.log(line)
  if (line != '') {
    ar = line.split(' ')
    var id = ar[1].split('=')
    var fname = ar[2].split('=')
    var lname = ar[3].split('=')
    console.log(id[1], fname[1], lname)
  }

});
