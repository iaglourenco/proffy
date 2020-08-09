
const subjects=[
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

function getSubject(subjectNumber){
    const position = +subjectNumber-1
    return subjects[position]
}

function getWeekday(weekdayNumber){
    const position = +weekdayNumber-1
    return weekdays[weekdayNumber]
}

function time2min(time){
    const [hour,min] = time.split(":")
    return Number( (hour*60)) + Number(min)  
}

module.exports ={
    subjects,
    weekdays,
    getSubject,
    getWeekday,
    time2min
}