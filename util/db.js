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
var signup = (data, res) => {
    console.log(data);
    if (data.name.length > 0 && data.email.length > 0 && data.pass.length > 0) {
        dbo.collection("users").insertOne(data, function (err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            res.redirect('/');
        });
    }
    else {
        res.render("sign_up", { msg: "Please fill all the fields" });
    }
}
//
var check = (data, res) => {
    dbo.collection('users').findOne({ email: data.email }, (err, result) => {
        console.log(result);
        if (err) throw err;
        else if (result.email) {
            console.log('go back');
            res.render('sign_up', { msg: "email already exists" });
        }
        else {
            signup(data, res);
        }

    })
}
//getting data from create post form
// var create_post=(data)=>{
//     console.log(data);
//     if(data.)
// }
//login form
var login = (data, res) => {
    console.log(data);
    if (data.email.length > 0 && data.pass.length > 0) {
        dbo.collection("users").findOne({ email: data.email }, function (err, result) {
            if (err) throw err;
            if (result) {
                if (result.pass !== data.pass) {
                    res.render("index", { msg: "Wrong password" });
                }
                else {
                    res.redirect('/users/home');
                }
            }
            else {
                res.render("index", { msg: "Email does not exists" });
            }
        });
    }
    else {
        res.render("index", { msg: "Please fill all the fields" });
    }
}
var put_post = (data, res) => {
    dbo.collection("posts").insertOne(data, (err, result) => {
        if (err) throw err;
    })
}
//place all in dba as dba is exported----------------------------------
var db =
{
    connect: connect,
    signup: signup,
    login: login,
    check: check,
    put_post: put_post,
};
module.exports = db;