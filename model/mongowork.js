const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb://localhost/test").then()
const alunoSchema = mongoose.Schema({
    name: String,
    age: Number,
    addr: String
});
const Aluno = mongoose.model("Aluno", alunoSchema);


async function save(){
    await connection;

    let a = new Aluno({
        name: 'Danger',
        age:14,
        addr: 'TTT'
    });
    a.save();
}

save();

