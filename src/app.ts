import { User } from './type/User';

const express = require('express');
const app = express();

app.use(express.json());

const users: User[] = [
  {
    id: 1,
    nom: 'Almokdad',
    prenom: 'muhanad',
    civilite: 'Homme',
    email: 'mouhand@gmail.com',
    date_de_naissance: '02/01/1993',
    address: {
      numeroRue: '99',
      nomRue: 'crosne',
      cp: '54000',
      ville: 'Nancy'
    }
  },
  {
    id: 2,
    nom: 'Almokdad',
    prenom: 'muhanad',
    civilite: 'Homme',
    email: 'mouhand@gmail.com',
    date_de_naissance: '02/01/1993',
    address: {
      numeroRue: '99',
      nomRue: 'crosne',
      cp: '54000',
      ville: 'Nancy'
    }
  },
  {
    id: 3,
    nom: 'Almokdad',
    prenom: 'muhanad',
    civilite: 'Homme',
    email: 'mouhand@gmail.com',
    date_de_naissance: '02/01/1993',
    address: {
      numeroRue: '99',
      nomRue: 'crosne',
      cp: '54000',
      ville: 'Nancy'
    }
  },

];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/api/users', async (req, res) => {
  try {
    await res.status(200).json(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


app.get('/api/user/:id', async (req, res) => {
  const id: number = parseInt(req.params.id);
  try {
    const user: User = users.find(user => user.id === id);
    if (!user){
      throw new Error('user not founded');
    }else {
      await res.status(200).json(user)
    }
    await res.status(200).json(user)
  } catch (e) {
    res.status(500).send(e.message);
  }
});


app.post('/api/user', async (req, res, next) => {
  try {
    const  idNewUser:number = (users.length + 1);
    const user: User = await req.body;
    user.id = idNewUser;
    res.status(201).json(user)
  } catch (e) {
    res.status(500).send(e.message);
  }
});



app.put('/api/user/:id', async (req, res, next) => {
  try {
    const id: number = parseInt(req.params.id);

    let user: User = users.find(user => user.id === id);

    if (user){
      user
     const userUpDate: User = await res.status(200).json(req.body)
    }else {
      throw new Error('user not founded');
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.delete('/api/user/:id', async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);

    const indexOfUser = users.findIndex(user => {
      return user.id === id;
    });
    if (indexOfUser != -1){
      users.splice(indexOfUser, 1);
      res.status(200).json(users)
    }else {
      throw new Error('user not founded');
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
})
module.exports = app;
//
