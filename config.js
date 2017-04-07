module.exports = {
    urls: {
        extLibsDir: '/node_modules',
        distDir: '/dist',
        staticDir: '/public',
        appDir: '/app',
        home:'/app/index.html'
    },
    mongoConn: {
        transaction: '10.2.50.3:27017/transactions',
        hrdb: '10.2.50.3:27017/hrdb',
        tmsVehicle: '10.2.50.3:27017/tmsVehicle',
        location: '10.2.50.3:27017/location',
        user: '10.2.50.3:27017/user'
    }
}