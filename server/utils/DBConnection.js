const mysql = require('mysql2');


class DBConnection {
    constructor(connectionData) {
        this.connection = mysql.createConnection(connectionData);

        this.connection.connect((err) => {
            if (err) {
                throw (err)
            }
        });
    }

    query(query, values, callback) {
        return this.connection.promise().query(
            query,
            values
        ).then(([rows, fields]) => {
            if (typeof callback === 'function')
                callback(rows, fields);
        }).catch(err => {
            console.log(err);
        });
    }
}

module.exports = DBConnection;