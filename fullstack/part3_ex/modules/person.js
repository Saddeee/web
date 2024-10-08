const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery",false)

mongoose.connect(url).then(result=>{
    console.log("Connected successfully to db")
}).catch(error=>{
    console.log("Failed",error.message)
})


const personSchema = new mongoose.Schema({
    name: {
      type:String,
      minLength:3
    },
    number:String
})


personSchema.set("toJSON",{
    transform:(document, returnedObject)=>{
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model("Person",personSchema)