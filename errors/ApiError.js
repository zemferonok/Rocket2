
class ApiError extends Error {
  /**
   * General Error
   * @param message {String} Error message
   * @param status  {Number} Error code
   */
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequest extends Error {
  /**
   * BadRequest Error
   * @param message {String} Error message
   */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class Unauthorized extends Error {
  /**
   * Unauthorized Error
   * @param message {String} Error message
   */
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class Forbidden extends Error {
  /**
   * Forbidden Error
   * @param message {String} Error message
   */
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

class NotFound extends Error {
  /**
   * NotFound Error
   * @param message {String} Error message
   */
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  ApiError,
  BadRequest,
  Forbidden,
  Unauthorized,
  NotFound,
};