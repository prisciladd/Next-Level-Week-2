
    
const server= express()
const express=require('express')()              //express é função é igual function esta retornando objeto

const{
    
        pageLanding,
        pageStudy,
        pageGiveClasses,
        saveClasses
    
}= require("./pages")

//configurar nunjucks
const nunjucks=require("nunjucks")
const { query } = require('express')
nunjucks.configure('src/views',{
    express: server,
    noCache: true,                              //nocache para não pegar página do cache e sim a mmais recente
})
//receber os dados do req body
server.
use(express.urlencoded({extended:true})

use(express.static("public"))            //arquivos estaticos html,css

//configurar arquivos estáticos
.get("/", pageLanding)                          //  => { //arrow function () => {} função sem nome, 
.get("/study",pageStudy )                                                //colocou rota da /
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)                                                //req = requisição res = resposta 
.listen(5500)                                   //return res.sendFile(__dirname + "/views/index.html") //retornar arquivo html
                                                //retornar resposta
                                                //req res é padrão

                                                //req res é padrão

                                                // criou servidor 127.0.0.1 (ip único igual para todas máquinas locais) ou localhost é máquina local :5500 porta padr~~ao é 80
