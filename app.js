const express = require('express')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express()
const port = 8080

const params = {
	protocol: process.env.DATABASE_PROTOCOL,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	cluster: process.env.DATABASE_CLUSTER,
	db: process.env.DEFAULT_DATABASE
};

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

const ArticleSchema = new Schema({
	name: String,
  title: String,
  content: String
});

async function start() {
  mongoose.connect(`${params.protocol}://${params.user}:${params.password}@${params.cluster}/${params.db}`, options);

  const Article = mongoose.model('Article', ArticleSchema);
  
  app.get('/articles', async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
  });

  app.post('/articles', async (req, res) => {
    const article = new Article();
    article.title = 'Hola';
    article.content = 'Mundo';
    await article.save();
    res.json(article);
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}, ${process.env.NODE_ENV}`)
  })
}
