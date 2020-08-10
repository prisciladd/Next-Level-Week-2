const Database = require ('./database.db')


const{  subjects,
    weekdays,
    getSubject, convertHoursToMinutes} = require('./utils/format')

function getSubject(subjectNumber){
const position = +subjectNumber-1
return subjects[position]
}

function pageLanding (req, res){
return res.render("index.html")
}

function pageStudy (assync,  req, res){
const filters = req.query

if (|filters.subject || filters.weeday || filters.time){
    return res.render( "study.html", { filters, subjects, weekdays})
}


//convertes horas em minutos
const timeToMinutes = convertHoursToMinutes(filters.time)

const query=`
SELECT classes. *, proffys *
FROM proffys
JOIN classes ON (classes.proffy_id = proffys.id)
WHERE EXISTS(
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday= ${filters.weekday}
        AND class_schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to > ${timeToMinutes}
) 
        AND classes.subject= ${filters.subject}`

//caso haja erro na hora da consulta ao bd
try{

    const db= await Database
    const proffys= await db.all(query)

    proffys.map((proffy)=>{
        proffy.subject= getSubject(proffy.subject)
    })

    return res.render('study.html', {roffys, subject, filters, weekdays})

} catch(error){
        console.log(error)
    }
}

return res.render( "study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res){
    return res.render( "give-classes.html", {subjects, weekdays})

}


                                        //cada get é uma rota para as páginas


async function saveClasses(req,res){
    const data = req.body 
    const createProffy = require('./createProffy')


const proffyValues ={
    name: req.body.name,
    avatar: req.body.avatar,
    whatsapp: req.body.whatsapp,
    bio: req.body.bio
}

const classValue ={
    subject: req.body.subject,
    cost: req.body.cost
}

const classScheduleValues ={req.body.weekday.map((weekday, index) => {
    return{
        weekday: weekday,
        time_from: convertHoursToMinutes( req.body.time_from[index]),
        time_to: convertHoursToMinutes(req.body.time_to[index])
    }
})

    try{

    const db=await Database
    await createProffy(db,{proffyValue, classValue, classScheduleValues})

        let queryString="?subject"+req.body.subject
        queryString +="&weekday"+req.body.weekday[0]
        queryString +="&time"+req.body.time_from[0]
        

    return res.redirect("/study" + queryString)

} catch (error) {
    console.log(error)
}



    //query recebe como form e mostra na barra de endereços
    //adicionar data a lista de proffys
    //const isNotEmpty = Object.keys(data).lenght != 0 //pega dados e transforma em array []
    //  if(isNotEmpty){
        
        //data.subject= getSubject(data.subject)
        //proffys.push(data)
        return res.redirect( "/study")
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses

}