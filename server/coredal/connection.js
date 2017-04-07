var monk = require('monk');

class Connection {

}

Connection.transaction = monk(config.mongoConn.transaction);
Connection.hrdb = monk(config.mongoConn.hrdb);
Connection.tmsVehicle = monk(config.mongoConn.tmsVehicle);
Connection.location = monk(config.mongoConn.location);
Connection.user = monk(config.mongoConn.user);

module.exports = Connection;