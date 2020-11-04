require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const { Sequelize, DataTypes } = require('sequelize');
const publicIp = require('public-ip');

const dbName = process.env.DATABASE_NAME;
const dbDialect = process.env.DATABASE_DIALECT;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbUser = process.env.DATABASE_USER;
const dbHost = process.env.DATABASE_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect
});

const Diputado = sequelize.define('diputado', {
  id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  identificacion: {
    type: DataTypes.STRING(255),
  },
  email: {
    type: DataTypes.STRING(255),
  },
  nombre: {
    type: DataTypes.STRING(255),
  },
  apellido: {
    type: DataTypes.STRING(255),
  },
  img: {
    type: DataTypes.STRING(255),
  },
  imgCompleta: {
    type: DataTypes.STRING(255),
  },
  descripcion: {
    type: DataTypes.STRING(255),
  },
  biografia: {
    type: DataTypes.TEXT(),
  },
  disponible: {
    type: DataTypes.INTEGER(1),
  },
  idPartido: {
    type: DataTypes.STRING(255),
  },
  idEstado: {
    type: DataTypes.STRING(255),
  },
  createdUsu: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  updatedUsu: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.TIME,
    allowNull: false,
  },
},
{
  tableName: "diputado",
});

const app = express()
const port = 8080

async function start() {
  sequelize.sync();
  
  app.get('/', async (req, res) => {
    res.json({
      message: 'getting ip'
    });
  });  

  app.get('/diputados', async (req, res) => {
    let diputados = await Diputado.findAll();
    const serverIp = await publicIp.v4();
    const response = {
      serverIp,
      diputados
    }
    res.json(response);
  })
  

  app.post('/diputados', urlencodedParser, async (req, res) => {
    const serverIp = await publicIp.v4();
    res.json({
      serverIp
    });
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}, ${process.env.NODE_ENV}`)
  })
}

start();