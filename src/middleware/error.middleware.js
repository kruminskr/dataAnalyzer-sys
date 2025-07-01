const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || error.response.status || 500;

    const consoleError = error.response.data[0].error || error.response.data 

    console.log(consoleError)

    res.status(statusCode).json({
        code: statusCode,
        status: 'error',
        message: error.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;