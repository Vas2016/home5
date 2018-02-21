
import express from 'express'
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})
console.log(__dirname)
app.use('/public', express.static(__dirname + '/public'));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
