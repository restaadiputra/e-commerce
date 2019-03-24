const { Highlight } = require('../models');

function findAll(req, res, next) {
  Highlight
    .find({})
    .then(function(highlights) {
      res.status(200).json(highlights)
    })
    .catch(function(err) {
      next(err)
    })
}

function findOne({ params }, res, next) {
  Highlight
    .findById(params.id)
    .then(function(highlight) {
      if(highlight) {
        res.status(200).json(highlight)
      } else {
        res.status(404).json({
          message: 'No Highlight found.'
        })
      }
    })
    .catch(function(err) {
      next(err)
    })
}

function create({ body, decoded, file }, res, next) {
  body.userId = decoded.id;
  body.image = file ? file.cloudStoragePublicUrl : '';
  Highlight
    .create({...body})
    .then(function(highlight) {
      res.status(201).json(highlight);
    })
    .catch(function(err) {      
      next(err);
    });
}

function updateOne({ params, body, file }, res, next) {
  if(file) {
    body.image = file.cloudStoragePublicUrl;
  }
  const opts = {
    new: true,
    runValidators: true,
    context: 'query'
  }

  Highlight
    .findOneAndUpdate({ _id: params.id }, { ...body }, opts)
    .then(function(highlight) {
      if(highlight) {
        res.status(200).json(highlight)
      } else {
        res.status(404).json({
          message: 'No Product found.'
        })
      }
    })
    .catch(function(err) {
      next(err)
    })
}

function deleteOne({ params }, res, next) {
  Highlight
    .findOneAndDelete({ _id: params.id })
    .then(function(highlight) {
      if(highlight) {
        res.status(200).json(highlight)
      } else {
        res.status(404).json({
          message: 'No Product found.'
        })
      }
    })
    .catch(function(err) {
      next(err)
    })
}

module.exports = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne
}