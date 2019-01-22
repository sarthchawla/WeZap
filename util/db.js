var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://room111:helloworld1@ds159624.mlab.com:59624/vezap";
var dbo;
var connect = function () {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, d) {
        if (err) throw err;
        dbo = d.db('vezap');//check its working
        console.log('connected to db');
    });
}
//getting data from signup form
var signup = (data) => {
    console.log(data);
    if (data.name.length > 0 && data.email.length > 0 && data.pass.length > 0) {
        dbo.collection("users").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });
    }
    else {
        throw new error("Please fill all the fields");
    }
}
//getting data from create post form
// var create_post=(data)=>{
//     console.log(data);
//     if(data.)
// }
//login form
var login = (data) => {
    console.log(data);
    if (data.email.length > 0 && data.pass.length > 0) {
        dbo.collection("users").findOne({ email: data.email }, function (err, result) {
            if (err) throw err;
            if (result.email.length < 1) {
                throw new error("Email does not exists");

            }
            if (result.pass !== data.pass) {
                throw new error("Wrong password");
            }
        });
    }
    else {
        throw new error("Please fill all the fields");
    }
}
//palace all in dba as dba is exported----------------------------------
var dba =
{
    connect: connect,
    signup: signup,

};
module.exports = dba;