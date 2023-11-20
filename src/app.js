const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const viewsPath = path.join(__dirname,'../templates/views')
const partialPaths = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)
app.use(express.static(path.join(__dirname,'..','public')))

app.get('',(req,res)=>{
    res.render('index',{title:"Weather forecast",name:'Gergo Dobi'})
})

app.get('/about',(req,res) => {
    res.render('about',{title:"About The Application",name:'Gergo Dobi'})
})

app.get('/help',(req,res) => {
    res.render('help',{msg:"Help page",name:'Gergo Dobi'})
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({error:"No address is provided"})
        return
    }
    geocode.geocode(req.query.address, (error,{latitude,longitude,place_name,state,country}={})=>{
        if(error){
            res.send(error)
            return
        }
        forecast.forecast(latitude,longitude,(error,{feelslike,temperature,description,icon,windspeed,precip}={})=>{
            if(error){
                res.send(error)
                return
            }
            res.send({latitude,longitude,place_name,state,country,feelslike,temperature,description,icon,windspeed,precip})
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({error:"you must provide a search term"})
        return
    }
    res.send({products:[]})
})

app.get('/help/*',(req,res) => {
    res.render('article-not-found',{msg:"404 error Article not found",name:'Gergo'})
})

app.get('*',(req,res)=>{
    res.render('404-page',{msg:'404 Error Page',name:'Gergo Dobi'})
})

app.listen(3000,()=>{
})
