var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(express.static(__dirname +'/app' )); 
app.use(bodyParser.json());

var port = 4000;

var items =[
    {   
        id:1,
        name:"Glass",
        color:"green",
        price:5,
    },
    {   
        id:2,
        name:"Crystal",
        color:"yellow",
        price:30,
    },
    {   
        id:3,
        name:"Sofa",
        color:"black",
        price:100,
    }
];

var newId = 3;

app.get('/items', function(req, res){
    res.send({items: items});
})

app.post('/items', function(req,res){
   
    items.push({
        id: ++newId,
        name: req.body.name,
        color: req.body.color,
        price: req.body.price,
    })
    res.send("added");
})

app.put('/items/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    var index = items.findIndex((item) => item.id == parseInt(id));
   
    var editedItem = {
        id: id,
        name:  req.body.name,
        color: req.body.color,
        price:  req.body.price,
    }
    items[index]=editedItem;
    res.send("updated");
})    

app.delete('/items/:id',function (req,res) {
    var id = req.params.id;
    console.log(id);
   var removedItem = items.findIndex(item => item.id == parseInt(id)) ;
   items.splice(removedItem, 1)

    res.send("deleted")
  
})
 
app.listen(port, () => {
    console.log('Listening on ' + port);
});