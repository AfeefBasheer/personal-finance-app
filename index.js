import express from 'express'
import http from 'http'

const app = express()
app.get('/health',(req,res)=>{
    res.send('The server is healthy and running')
})
const server = http.createServer(app)
app.listen(3000,()=>{
    console.log('server running on port 3000')
})