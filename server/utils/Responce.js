class Responce {
    constructor(expressRes) {
        this.status = 200;
        this.res = expressRes;
        return this;
    }

    setStatus(status) {
        return (this.status = status);
    }

    error(message, errCode = 500) {
        this.setStatus(errCode);
        this.send({
            error: message
        });
    }

    send(data) {
        if (this.res === null)
            throw('Express Responce is unspecified');


        this.res.status(this.status);
        this.res.json(data);
    }
}

module.exports = Responce;