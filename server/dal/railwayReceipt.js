const connection = require(__base + '/server/coredal/connection');
const promise = require('bluebird');

class RailwayReceipt {
    constructor() {

    }
    getRRList() {
        return new promise((resolve, reject) => {
            connection.transaction.collection('railwayreceipt').find({ 'workflowtype': '0' },
                { fields: { '_id': 0, "RRNumber": 1, "consignorDetails.consignorName": 1, "consigneeName": 1, "quantityDetails.RRQuantity": 1, "RRDate": 1, "consignorDetails.consignorBrand": 1, "quantityDetails.RRbalanceQuantity": 1 } }, (err, docs) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(docs)
                });
        })
    }
}

module.exports = RailwayReceipt;