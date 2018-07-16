const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const genresSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       minlength: 5,
       maxlength: 50
   }
});

const Genre = mongoose.model('genre', genresSchema);

router.get('/', (req, res) => {
  const genres = Genre.find().sort('name');
    genres.then((resolve, reject) => res.send(resolve));
});

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);


  const genre = new Genre({
    name: req.body.name
  });
  genre.save().then((resolve, reject) => {
      res.send(resolve);
  });


});

router.put('/:id', (req, res) => {
  const { error } = validateGenre(req.body);
  const genre = Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, { new: true}).then((resolve, reject) => {
      if (!resolve || resolve.lenght < 1) return res.status(404).send('The genre with the given ID was not found.');
      if (error) return res.status(400).send(error.details[0].message);

      res.send(resolve);
  });

});

router.delete('/:id', (req, res) => {
  const genre = Genre.findByIdAndDelete(req.params.id).then((resolve, reject) => {
      if (!resolve) return res.status(404).send('The genre with the given ID was not found.');
      //resolve.delete();
      res.send(resolve);
  });
});

router.get('/:id', (req, res) => {
  const genre = Genre.findById(req.params.id).then((resolve, reject) => {
      if (!resolve) return res.status(404).send('The genre with the given ID was not found.');
      res.send(resolve);
  });
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;