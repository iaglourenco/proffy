const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db)=>{
    
    proffyValue = {
        name: "Iago",
        avatar:"https://avatars0.githubusercontent.com/u/24625361?s=460&u=5cc0305d48e59b3ec2e7a7ccd3431acfa456a330&v=4",
        whatsapp:'11996894293',
        bio:'Estudante de Engenharia de Computação'
    }

    classValue ={
        subject:4,
        cost:'40'
        //id do proffy
    }

    classScheduleValue =[
        //id da classy
        {
            weekday: 1,
            time_from: 240,
            time_to: 1222
        },
        {
            weekday: 0,
            time_from: 740,
            time_to: 1222
        }
    ]


    //Cadastro de dados
    await createProffy(db,{proffyValue,classValue,classScheduleValue})




    //Selecao de dados

    //Professores
    const selectedProffys = await db.all("SELECT * FROM proffys")
    
    //Juncao de professores com classes
    const selectedClassesAndProffys = await db.all(`

        SELECT classes.*, proffys.* 
        FROM proffys 
        JOIN classes ON (classes.proffy_id = proffys.id)
        where classes.proffy_id = 1;
    `)

    //Horarios de professores
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1 
        AND class_schedule.weekday = "0" 
        AND class_schedule.time_from <= "820" 
        AND class_schedule.time_to > "900"; 
    `)

    

    
})
