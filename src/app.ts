import { User } from './type/User';
const joi = require('joi');
const express = require('express');
const app = express();
const mysql = require('mysql');


const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Muh*19932011',
  database : 'userTest',
  port: '3306'
});

db.connect((err) => {
  if(err){
      throw err;
  }
  console.log('MySql is Connected...!!!!');
});

app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/api/users', async (req, res) => {
  try {
    db.query('SELECT * FROM users', async (error, users, fields)=>{
      if (error) {
        throw error
      }
     await res.status(200).json(users);
    })
  } catch (e) {
    res.status(500).send(e.message);
  }
});


app.get('/api/user/:id', async (req, res) => {
  const id: number = req.params.id;
  try {
    db.query(`SELECT * FROM users WHERE iduser =${id}`, async (error, user, fields)=>{
      if (error) {
        throw error
      }
     await res.status(200).json(user);
    })
  } catch (e) {
    res.status(500).send(e.message);
  }
});
const  userSchema = joi.object(
  {
    nom: joi.string().min(3).max(30).required(),
    prenom: joi.string().min(3).max(30).required(),
    sex: joi.string().min(3).max(30).required(),
    address: joi.string().min(3).max(50).required(),
    date_de_naissance: joi.string().required(),
    email: joi.string()
      .pattern(new RegExp('! # $ % & \' * + - / = ? ^ _ ` { | } ~')),
  }
)

// nom: 'Almokdad',
//   prenom: 'muhanad',
//   sex: 'Homme',
//   email: 'mouhand@gmail.com',
//   date_de_naissance: '02/01/1993',
//   address:
app.post('/api/user', async (req, res, next) => {

  const newUser = {
    ...req.body
  }
  try {
    db.query("INSERT INTO users SET ?", newUser, async (error, user) => {
      if (error) {
        throw error
      }
     await res.status(201).json({newUser, id : user.insertId});
    })
  } catch (e) {
    res.status(500).send(e.message);
  }
});



app.put('/api/user/:id', async (req, res, next) => {
  const id = +req.params.id;
  const modifUser = {
    ...req.body
  }
  delete modifUser.iduser;
  try {
    db.query("UPDATE users SET ? WHERE users.iduser = ?", [modifUser, id], async (error, user) => {
      if (error) {
        throw error
      }
     await res.status(201).json(modifUser);
    })
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.delete('/api/user/:id', async (req, res) => {
  try {
    const id = +req.params.id;
    db.query("DELETE FROM users WHERE iduser = ?", id, async (error, user) => {
      if (error || user.affectedRows < 1) {
        throw error
      }
        await res.status(200).json("user is deleted !!!");
    })
  } catch (e) {
    res.status(500).send(e.message);
  }
})
module.exports = app;
// CREATE TABLE users (iduser INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(30) NOT NULL, prenom VARCHAR(30) NOT NULL, email VARCHAR(50), sex VARCHAR(20), date_de_naissance VARCHAR(50), address VARCHAR(50));
