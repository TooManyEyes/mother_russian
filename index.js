const express = require('express')
const todoRoutes = require('./routes/todos')
const PORT = process.env.PORT || 3001
const app = express()
const path = require('path')



app.set('views', 'views')

app.use(todoRoutes)
console.log(__dirname)
app.use(express.static(path.join(__dirname,'main_page/css')))
app.use(express.static(path.join(__dirname,'main_page/img')))
app.use(express.static(path.join(__dirname,'main_page/js')))
app.use(express.static(path.join(__dirname, 'game_map')))


app.listen(PORT, ()=>{
    console.log('Server has been started')
})
