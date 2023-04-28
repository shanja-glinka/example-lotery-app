const Responce = require('../utils/Responce');

exports.isjson = (req, res, next) => {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
}

exports.is404 = (req, res, next) => {
    const responce = new Responce(res);
    return responce.error('Not found', 404);
}

exports.is500 = (err, req, res, next) => {
    console.error('ERROR:' + err.stack)

    const responce = new Responce(res);
    return responce.error(err.stack, 500);
}
