const clarifai = require('clarifai');
const app =new Clarifai.App({
    apiKey: '16e53b8ca5274236b3c9ef904ce70739'
});

const handleApiCall = (req, res) =>{
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL ,req.body.input)
        .then(data =>{
            res.json(data);
        })
        .catch(err => res.status(400).json(`error is ${err}`))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err =>{
        res.status(400).json(`Error is ${err}`)
    })
}

module.exports = {
    handleImage,
    handleApiCall
}