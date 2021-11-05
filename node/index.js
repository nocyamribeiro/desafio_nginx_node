const express = require('express')
const unique = require('unique-names-generator');
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql');

createNewPeople()


app.get('/', (req,res) => {
    listPeople(res)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

function createNewPeople() {
    const configStarWars = {
        dictionaries: [unique.starWars]
    }
    const characterName = unique.uniqueNamesGenerator(configStarWars);
    const connection = createConnection();
    connection.query(`INSERT INTO people(name) values('${characterName}')`);
    connection.end();
}

function listPeople(res) {
    const connection = createConnection();
    let pageContent = '<h1>Full Cycle Rocks!</h1>'
    connection.query("SELECT * FROM people", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        pageContent += '<ul>'
        result.forEach(element => {
            pageContent += `<li>${element.name}</li>`
        });
        pageContent += '</ul>'
        res.send(pageContent)
    });
    connection.end();
    
}

function createConnection() {
    return mysql.createConnection(config);
}

