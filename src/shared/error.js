class AppError extends Error {
    constructor(messege, statusCode = 400) {
        super(messege);
        this.name = 'AppError';
        this.statusCode = statusCode;
    }
}

export { AppError };