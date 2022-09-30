const Jimp = require('jimp');
const express = require('express')
const router = express.Router()
const path = require('path')
const app = express()
const port = 443
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)

const width = 320
const height = 120

//white = 4294967295
//black = 255
// image.getPixelColor(x, y)

app.use(function(req, res, next) {
  res.setHeader('Content-Security-Policy', "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'; frame-src *");
  next();
});

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
})

app.use("/", router)

app.get('/home', (req, res) => {
  res.sendFile((path.join(__dirname+'/index.html')))
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

router.get('/generate',(request,response) => {
  parsePixel(request.query.image)
})

server.listen(port, () => {
  console.log(`Server listening on ${port}`)
})

function parsePixel(pathe){
  let pixels = []
  Jimp.read(pathe)
    .then(image => {
      if(image.bitmap.width!=width || image.bitmap.height!=height){
          throw {name : "SizeError", message : "Image is not 320x120"}
      }
      for (y=0; y < height; y++){
        if(y%2 == 0){
          for (x=0; x < width; x++){
            let pix = image.getPixelColor(x, y)
            if (pix!=255 && pix!=4294967295){
              throw {name : "ColorError", message : "Image is not pure black&white"}
            }else {
              if (pix==4294967295){
                val=0
                pixels.push(val)
              }else {
                val=1
                pixels.push(val)
              }
            }
          }
        }
        else {
          for (x=(width-1); x >= 0; x--){
            let pix = image.getPixelColor(x, y)
            if (pix!=255 && pix!=4294967295){
              throw {name : "ColorError", message : "Image is not pure black&white"}
            }else {
              if (pix==4294967295){
                val=0
                pixels.push(val)
              }else {
                val=1
                pixels.push(val)
              }
            }
          }
        }
      }
      generateMacro(pixels, pathe)
    })
    .catch(err => {
      console.log("ERROR: ")
      console.log(err)
      io.emit('error', JSON.stringify(err))
    });
}

function generateMacro(img, pathe){
  let direction = true
  let lines = []
  for(i=1; i<121; i++){
    lines.push((i*120)-1)
  }
  let macro = ""
  macro = macro+"3S"
  macro = macro+"\n"
  macro = macro+"A 0.5S"
  macro = macro+"\n"
  macro = macro+"2S"
  macro = macro+"\n"
  const size = img.length
  for (i=0; i<size; i++){
    if(lines.includes(i)){
      direction = !direction
    }
    if(img[i]==1){
      macro = macro+"A 0.2S"
      macro = macro+"\n"
    }
    macro = macro+"0.1S"
    macro = macro+"\n"
    if(direction){
      macro = macro+"DPAD_RIGHT 0.2S"
      macro = macro+"\n"
    } else {
      macro = macro+"DPAD_LEFT 0.2S"
      macro = macro+"\n"
    }
    macro = macro+"0.1S"
    macro = macro+"\n"
  }
  macro = macro+"1S"

  io.emit('success', {path: pathe, mac: macro})
}