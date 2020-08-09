const { time2min,subjects,weekdays,getSubject,getWeekday } = require('./utils/format')
const Database = require('./database/db')


function pageLanding(req,res){
    return res.render("index.html")
}

async function pageStudy(req,res){
    const filters = req.query

    //Query padrao mostrando todos os proffys
    query = `
        SELECT classes.*,proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        `


    //Construcao da query com filtros ativos
    if(filters.subject || filters.time || filters.weekday){
        query = `SELECT classes.*, proffys.* 
        FROM proffys 
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            `
            if(filters.weekday){
                query += ` AND class_schedule.weekday = ${filters.weekday}`
            }
            if(filters.time){
                const minutes = time2min(filters.time)
                query+= ` AND class_schedule.time_from <= ${minutes} 
                AND class_schedule.time_to > ${minutes}`
            }
            if(filters.subject){
                query+=`) AND classes.subject = ${filters.subject};`
            }else{
                query +=`);`
            }
    }

    // console.log(query)
    
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy)=>{
            proffy.subject= getSubject(proffy.subject)
        })
        return res.render("study.html",{proffys,filters,weekdays,subjects })
        
    } catch (error) {
        console.log(error)
    }



}

function pageGiveClasses(req,res){
    
    
    return res.render("give-classes.html",{subjects,weekdays})
}

async function saveClasses(req,res){
    const createProffy =require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue ={
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValue = req.body.weekday.map((weekday,index) => {

        return{
            weekday,
            time_from: time2min(req.body.time_from[index]),
            time_to: time2min(req.body.time_to[index])
        }
        
    })

    try {
     
        const db = await Database
        await createProffy(db,{proffyValue,classValue,classScheduleValue})
        let queryString = "?subject="+req.body.subject
        queryString+="&weekday="+req.body.weekday[0]
        queryString+="&time="+req.body.time_from[0]

        console.log(queryString)
        return res.redirect("/study"+queryString)
    
    } catch (error) {
        console.log(error)        
    }
    
}


module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}