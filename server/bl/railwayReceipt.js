const rrDAL = require(__base + '/server/dal/railwayReceipt');
const _ = require('underscore');
const promise = require('bluebird');

class railwayReceipt extends rrDAL {
    getRRList() {
        return new promise((resolve, reject) => {
            super.getRRList().then((docs) => {
                let finalJson = _.map(docs, (obj) => {
                    var o = _.extend(obj, obj.consignorDetails[0], obj.quantityDetails[0]);
                    delete o.consignorDetails;
                    delete o.quantityDetails;
                    return o;
                })

                if(docs.count > 1){
                    
                }
                resolve(finalJson);
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

module.exports = railwayReceipt;
