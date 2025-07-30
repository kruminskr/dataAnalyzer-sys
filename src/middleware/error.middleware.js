const errorHandler = (error, req, res, next) => {
    const status = error.statusCode || error.response?.status || 500;
    const code = error?.code || 'INTERNAL_SERVER_ERROR';
    const host  = error?.request?.host;

    const response = {
        status,
        code,
    }

    if (host) {
        response.message = `${host} - ${error.message}`;
        
    }
    if (!host) {
        response.message = error.message;
        response.stack = error.stack;
    }

    console.error(response)

    res.status(status).json(response);
};

module.exports = errorHandler;