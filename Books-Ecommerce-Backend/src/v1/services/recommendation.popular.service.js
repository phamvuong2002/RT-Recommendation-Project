'use strict'

const {bookDB_master} = require('../services/dbpool.service');
const { BadRequestError } = require('../core/error.response');

class RecommendationPopularService {
    static getPopularItems = async () => {
        const query = 'SELECT * FROM popularitems Limit 12';

        try {
            const [results, fields, rows] = await bookDB_master.query(query);
            return {
                code: '200',
                metadata: results
            }
        }
        catch (err) {
            console.log(err.message);
            throw new BadRequestError ('Create Recommendation Popular Items Failed');
        }

        // //error
        // return {
        //     code: '200',
        //     metadata: null
        // }
    };

}
module.exports = RecommendationPopularService;