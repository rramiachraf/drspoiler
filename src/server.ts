import spdy from 'spdy'
import fs from 'fs'
import app from './app'
import { port } from './config'

// const options = {
//   key: fs.readFileSync('localhost-privkey.pem'),
//   cert: fs.readFileSync('localhost-cert.pem')
// }

// HTTP2
// spdy.createServer(options, app).listen(port, () => {
//   console.log(`Running or port ${port}`)
// })

// HTTP1
app.listen(port,() =>{
  console.log(`Running or port ${port}`)
})
