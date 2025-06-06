const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;

    console.error(`Error: ${error}`);

    res.status(statusCode).json({
        code: statusCode,
        status: 'error',
        message: error.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;