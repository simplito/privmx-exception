var Exception = require("./Exception");

function IllegalArgumentException(paramName, paramValue) {
    this.init(new Error(paramName), paramValue);
}

IllegalArgumentException.prototype = Object.create(Exception.prototype);
IllegalArgumentException.prototype.constructor = IllegalArgumentException;

module.exports = IllegalArgumentException;