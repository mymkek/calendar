const express = require("express");
const fs = require("fs");

const app = express();
const port = 4000;
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

const filePath = "users.json";


app.get('/contacts', function(req, res){
    res.send('Contacts page')
})

app.get("/error", function (request, response){

    response.status(404).send("NotFound");
})

app.get("/user", function (request, response){

    response.send({name:"Tom", age: 22});
})

app.get("/api/users", function(req, res){
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    res.send(users);
})

app.get("/api/users/:id", function(req, res){
    const id = parseInt(req.params.id);
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);

    let user = users.find(user => user.id === id);

    if(user) {
        res.send(user)
    } else {
        res.status(404).send()
    }
})

app.post("/api/users", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    let user = {name: userName, age: userAge};

    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);

    // находим максимальный id
    const id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    user.id = id+1;
    // добавляем пользователя в массив
    users.push(user);
    data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("users.json", data);
    res.send(user);
})

app.delete("/api/users/:id", jsonParser, function (req, res) {
    const id = parseInt(req.params.id);
    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);

    users = users.filter(u => u.id !== id);
    data = JSON.stringify(users);

    fs.writeFileSync('users.json', data);
    res.send({ id });
});


app.put("/api/users/:id", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);

    const userId = req.params.id;
    const userName = req.body.name;
    const userAge = req.body.age;

    let data = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(data);
    let user;
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(user){
        user.age = userAge;
        user.name = userName;
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

app.listen(port);

module.exports.app = app;