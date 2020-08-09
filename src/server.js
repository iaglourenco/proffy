
const express =require('express') //express responsavel por rodar o server
const {saveClasses,pageGiveClasses,pageLanding,pageStudy} = require('./pages')


const server = express() //instancia do servidor

const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
    express:server,
    noCache:false
})

server
.use(express.urlencoded({extended:true}))
.use(express.static("public")) //defino pasta de imagens e styles, arquivos estaticos e rotas
.get("/", pageLanding)
.get("/study",pageStudy)
.get("/give-classes",pageGiveClasses)
.post("/save-classes",saveClasses)
.listen(5500)




