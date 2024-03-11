import express from 'express'
import config from '../config'

const app=express()

config(app)

app.listen(5050,()=>{console.log("server is running on port 5050")})

export default app