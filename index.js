const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port =3000;

app.use(bodyParser.urlencoded({extended: true}));

function diary(id, title, isActive){
    this.id = id;
    this.title = title;
    this.isActive = isActive;
};

var myDiary = [];

app.get('/', (req, res) => {
    res.status(200).send('Welcome to my diary!');
});

app.get('/diaries', (req, res) => {
    if(!myDiary[0]){
        res.send('No diary written!');
    }
    else{
        res.send(myDiary.map(k => `#${k.id}: ${k.title} (${k.isActive})`).join('\n'));
    } 
});
app.get('/diary/:id', (req, res) => {
    if(myDiary[req.params.id] == null){
        res.status(404).send(`Diary #${req.params.id} does not exist!`);
    }
    else{
        if(myDiary[req.params.id].isActive === true){
            res.send(`#${req.params.id}: ${myDiary[req.params.id].title} (${myDiary[req.params.id].isActive})`);
        }
        else{
            res.send(`Diary #${req.params.id} has already been deleted (isActibe == false)`);
        }
    }
});
app.get('/diary', (req, res) => {
    res.redirect(`/diary/${Object.values(req.query.id)}`);
});
app.post('/diary', (req, res)=> {
    var index = myDiary.length;
    myDiary.push(new diary(index, req.body.title, true));
    res.send(`Added Diary #${index}: ${myDiary[index].title} (${myDiary[index].isActive})`);
});
app.put('/diary', (req, res) => {
    var index = req.body.id;
    if(!myDiary[index]){
        res.status(404).send('Diary does not exist!');
    }
    else if(myDiary[index].isActive  === false){
        res.send(`Diary #${index} has already been deleted`);
    }
    else{
        myDiary[index].title =  Object.values(req.body)[1];
        res.send(`Changed Diary #${index}: ${myDiary[index].title} (${myDiary[index].isActive})`);
    }
});
app.delete('/diary', (req, res) => {
    var index = req.body.id;
    if(!myDiary[index]){
        res.status(404).send('Diary does not exist!');
    }
    else if(myDiary[index].isActive === false){
        res.send(`Diary #${index} has already been deleted`);
    }
    else{
        myDiary[index].title = null;
        myDiary[index].isActive = false;
        res.send(`Deleted diary #${index}: ${myDiary[index].title} (${myDiary[index].isActive})`);
    }
});
app.listen(port, () => console.log(`Server listening on port ${port}!`));
