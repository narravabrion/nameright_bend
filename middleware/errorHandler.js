const {logEvents} = require('./logger')

const errorHandler = (err,req,res,next)=>{
    logEvents(`${err.name}\t${err.message}`, 'reqLog.txt');
    console.log(err.stack)
    res.status(500).json({'err':err.message})
}

module.exports= errorHandler