var Exception = require("./Exception");

function UnsupportedOperationException() {
    this.init(new Error(""));
}

UnsupportedOperationException.prototype = Object.create(Exception.prototype);
UnsupportedOperationException.prototype.constructor = UnsupportedOperationException;

module.exports = UnsupportedOperationException;