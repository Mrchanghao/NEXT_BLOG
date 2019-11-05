const Category = require('../models/category');
const slugify = require('slugify');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const { name } = req.body;

  let slug = slugify(name).toLowerCase();
  console.log(slug)
  let category = new Category({name, slug});

  category.save().then(data => {
    
    res.json(data)
    // res.json({})
  }).catch(err => {
    
    return res.status(400).json({
      error: errorHandler(err)
    })
  })

  // category.save((err, data) => {
  //   if(err) {
  //     return res.status(400).json({
  //       error: err
  //     })
  //   } else {
  //     res.json(data)
  //   }
  // })
};

exports.list = (req, res) => {
  Category.find({})
    .then(data => {
      res.json(data);
    }).catch(err => {
      return res.status(400).json({
        err: errorHandler(err)
      })
    })
};

exports.read = async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  try {
    const data = await Category.findOne({slug});

    res.json(data); // blog 모델 작성후 다시 수정

  } catch (error) {
    return res.status(400).json({
      error: errorHandler(error)
    })
  }
  
};


exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Category.findOneAndRemove({slug})
    .then(data => {
      res.json({
        message: 'Category remove success'
      })
    })
    .catch(err => {
      return res.status(400).json({
        error: errorHandler(err)
      })
    })

}