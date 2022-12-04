//----Encabezado
const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const port = process.env.PORT || 3000
require('dotenv').config();
//----Express
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.listen(port, function() {
    console.log('Enlazado a Puerto')
})

app.get('/', (req, res) => {
  res.render('index')
  
})

MongoClient.connect(process.env.CONNECTION_URL, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    //--------------------------OMEGA--------------------------
    const db = client.db('Crefind')
    const collectionClientes = db.collection('clientes')

    app.get('/credenciales', (req, res) => {
      res.render('credenciales.ejs')
      
    })

    //----------FORMULARIO CLIE------------------------------------
    app.post('/registrar', (req, res) => {
      collectionClientes.insertOne(req.body)
        .then(result => {
          res.redirect('/')
          console.log(result)
        })
        .catch(error => console.error(error))
      })

      //-----------------CV-------------------------------------------
      app.post('/registrarCV', (req, res) => {
        console.log(req.body.archivo);
        res.redirect('/')
        console.log(result)
      })

        
  })
