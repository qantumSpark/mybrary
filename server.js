if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require("express")
const app = express()
const expressLayout = require("express-ejs-layouts")


const indexRouter = require('./routes/index')


app.set('view engine', 'ejs')

app.set('views', __dirname+"/views")
app.set('layout', 'layouts/layout')

app.use(expressLayout)
app.use(express.static('public'))



const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', ()=> console.log('Connected to the dtb'))



app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)