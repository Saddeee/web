const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const name = process.argv[3];

const number = process.argv[4];

const url = `mongodb+srv://saddzyy:${password}@cluster0.mmpsump.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: number,
});

if(name && number){
    person.save().then((person) => {
        console.log("added " + person.name + " number "+ person.number+ " to phonebook")
        mongoose.connection.close();
    });
}else{
    Person.find({}).then(result=>{
        console.log("phonebook: ")
        result.forEach(person=>{
            console.log(person.name + " "+ person.number)
        })
        mongoose.connection.close()
    })
}