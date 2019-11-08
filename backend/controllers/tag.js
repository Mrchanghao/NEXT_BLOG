const Tag = require('../models/tag');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req ,res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();
  let tag = new Tag({name, slug});

  tag.save()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        error: errorHandler(err)
      })
    })
};

exports.list = (req, res) => {
  Tag.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      return res.status(400).json({
        error: errorHandler(err)
      })
    })
}

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOne({slug})
    .then((tag) => {
      res.json(tag)
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        error: errorHandler(err)
      })
    })
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndDelete({slug})
    .then(data => {
      res.json({
        message: 'Tag deleted'
      })
    })
    .catch(err => {
      return res.status(400).json({
        error: errorHandler(err)
      })
    })
}