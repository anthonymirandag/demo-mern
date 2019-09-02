const Foros = require('../models/foro')
const getMaxNumber = async (type)=>{
    let regex = new RegExp("^"+type,'i')
    console.log(regex)
    try{
        let foros = await Foros.find({ title: regex}).select('title').lean()
        if(!foros.length){
            return 0
        }
        const numbers = []
        for( value in foros ){
            let title = foros[value].title
            let numStr = title.replace(type + " #","")
            numbers.push (Number(numStr))  
        }
        let maxNumber = Math.max(...numbers)
        return maxNumber
    }catch(err){
        console.log(err)
    }
}
const getTitleForo = async (type)=>{
    let number = await getMaxNumber(type)
    let title = type + " #" + (++number)
    console.log(title)
    return title
}

module.exports = {
    getMaxNumber,
    getTitleForo
}

