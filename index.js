var express = require('express');
var sql = require("mssql");
var app = express();
var bodyParser = require("body-parser");  
var conn = require("./connect")();
var faker = require('faker');

    // var str ="";
    // for (var i=0;i<100;i++) {
    //     str += faker.name.firstName() + 
    //     '\t' + faker.name.lastName() + '\t' + faker.internet.email() + '\t'
    //     + faker.name.jobTitle() + '\t' + faker.random.locale() +"\r\n";
    // }

app.use(function (req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');  
    next();  
    });  

// config for your database
var config = {
    user: 'dbUser',
    password: 'dbPass',
    server: 'dbServer',
    database: 'Db name',
    "options": {
        "encrypt": true,
        "enableArithAbort": true
        },
   
};

// app.get('/getAllTask/:id', function (req, res) {
   
//     // connect to your database
//     sql.connect(config, function (err) {
    
//         if (err) console.log(err);
//         // create Request object
//         var request = new sql.Request();
//            //console.log(req.params.id);
//         // query to the database and get the records
//         request.query('select * from TBL_TASK where userid= '+req.params.id, function (err, recordset) {
            
//             if (err) console.log(err)

//             // send records as a response
//             res.send(recordset);
            
//         });
//     });
// });

//Using faker.js post data on Task Table
app.post("/insertTask", function (req, res) {console.log('kkkkkkkkkkk')

	                 //var randomName = faker.name.findName(); // Rowan Nikolaus
                     //  var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
                     //   var randomCard = faker.helpers.createCard();

                 for( var i=0;i<5;i++){
                   // var randomJobTitle =  faker.name.jobTitle();
                   // console.log(randomJobTitle);
                   // var randomjobArea =  faker.name.jobArea();
                   // console.log(randomjobArea);

                    //console.log(i)

                    conn.connect().then(function () {
                    var transaction = new sql.Transaction(conn);
                    transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
              
                    request.input("TaskName", sql.VarChar(50), faker.name.jobTitle())
                    request.input("TaskDescription", sql.VarChar(400), faker.lorem.sentence())
                    // request.input("email", sql.VarChar(20), randomEmail)
                    // request.input("jobTitle", sql.VarChar(50), randomJobTitle)
                  
                      
                        request.execute("spInsertNewTask").then(function () {
                            transaction.commit().then(function (recordSet) {
                                conn.close();
                                res.status(200).send(req.body);
                            }).catch(function (err) {
                                conn.close();
                                res.status(400).send("Error while inserting data");
                                console.log(err);
                            });
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while inserting data");
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while inserting data");
                    });
                }).catch(function (err) {
                    conn.close();
                   res.status(400).send("Error while inserting data");
                });
          }
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});