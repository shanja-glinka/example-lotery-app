const DBConnection = require('./DBConnection');
const DBValidator = require('./DBValidator');


class Connection extends DBConnection {
    constructor(tableName) {
        super({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            rowsAsArray: false
        });

        this.tableName = tableName;
    }



    prop(fields = '*', filter = '', values = [], order = '', limit = '') {
        return {
            tableName: this.tableName,
            fields: fields,
            filter: filter,
            values: values,
            order: order,
            limit: limit
        }
    }

    props(filedsAndValues, fields = '', filter = '', values = []) {
        return {
            tableName: this.tableName,
            filedsAndValues: filedsAndValues,
            fields: fields,
            filter: filter,
            values: values
        }
    }

    filter(values, fields = '') {

        if (fields != '') {
            fields = fields.split(',');
            fields.map(s => s.trim());
        }

        if (!fields.length)
            fields = Object.keys(values);

        let result = {};
        fields.forEach(key => {
            result[key] = values[key];
        });


        return result;
    }

    objectToString(values, fields = '') {
        if (fields != '') {
            fields = fields.split(',');
            fields.map(s => s.trim());
        }

        if (!fields.length)
            fields = Object.keys(values);

        let result = '';
        fields.forEach(key => {
            result += (DBValidator.validateField(key) + '="' + DBValidator.validateValue(values[key]) + '"');
        });

        return result;
    }



    select(queryParam, callback) {

        let query = 'SELECT ' + queryParam.fields + ' FROM `' + queryParam.tableName + '`';

        query += (queryParam.filter ? (' WHERE ' + queryParam.filter) : '') +
            (queryParam.group ? ' GROUP BY ' + queryParam.group : '') +
            (queryParam.order ? ' ORDER BY ' + queryParam.order : '') +
            (queryParam.limit ? ' LIMIT ' + queryParam.limit : '');


        return this.query(query, queryParam.values, callback);
    }


    insert(queryParam, callback) {
        let query = 'INSERT INTO ' + queryParam.tableName;


        queryParam.filedsAndValues = this.filter(queryParam.filedsAndValues, queryParam.fields);

        if (queryParam.filedsAndValues == {})
            return callback([]);

        query += ' (' +
            DBValidator.validateFields(Object.keys(queryParam.filedsAndValues)) +
            ') VALUES (' +
            DBValidator.validateValues(Object.values(queryParam.filedsAndValues))
            + ')';


        return this.query(query, queryParam.values, callback);
    }


    update(queryParam, callback) {
        let query = 'UPDATE ' + queryParam.tableName + ' SET ';

        if (queryParam.filedsAndValues == {})
            return callback([]);

        query += this.objectToString(queryParam.filedsAndValues) + ' WHERE ' + queryParam.filter;


        return this.query(query, queryParam.values, callback);
    }

    remove(queryParam, callback) {

        let query = 'DELETE FROM `' + queryParam.tableName + '`';

        query += (queryParam.filter ? (' WHERE ' + queryParam.filter) : '') +
            (queryParam.order ? ' ORDER BY ' + queryParam.order : '') +
            (queryParam.limit ? ' LIMIT ' + queryParam.limit : '');


        return this.query(query, queryParam.values, callback);
    }

}




module.exports = Connection;