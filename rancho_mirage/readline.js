
if (process.argv.length <= 2) {
  console.log('usage: node readline fileName')
  return
}

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(process.argv[2])
});

lineReader.on('line', function (line) {
  if (line != '') {
    ar = line.split(',')
    console.log('{ coordinate: { latitude: '+ ar[0] + ', longitude: ' + ar[1] + '}, \n\tvisible: false, disResult: null, color: null },');
  }

});
