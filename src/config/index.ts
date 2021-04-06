process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    // port: parseInt(process.env.PORT as string, 10),

    // databaseURL: process.env.MARIADB_URL,

    // logs: {
    //     level: process.env.LOG_LEVEL
    // }

    api: {
        prefix: '/api'
    }
}