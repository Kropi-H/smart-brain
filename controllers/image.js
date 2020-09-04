const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'b3ce58478cf545f1b93b96c898a45c14'
  });

  const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })  
    .catch(err => res.status(400).json(err, 'Unable to work with API'));
  }

const handelImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries!'));
}

module.exports = {
    handleImage: handelImage,
    handleApiCall
}

