function Exception(msg, data, couse) {
    this.init(new Error(msg), data, couse);
}

Exception.prototype.init = function(error, data, couse) {
    var func = arguments.callee.caller.toString();
    this.name = func.substring(8, func.indexOf("(")).trim();
    this.error = error;
    this.message = this.error.message;
    this.data = data;
    this.couse = couse;
    
    var stack = this.error && this.error.stack ? this.error.stack.toString().split("\n") : "";
    var newStack = [];
    var index = -1;
    for (var i = 0; i < stack.length; i++) {
        var s = stack[i];
        if (s.trim() == "") {
            continue;
        }
        if (s.indexOf("   ") != 0) {
            s = "    " + s;
        }
        if (index == -1 && s.indexOf(this.name) != -1) {
            newStack = [];
        }
        else {
            newStack.push(s);
        }
    }
    this.stack = newStack.join("\n");
}

Exception.prototype.toString = function() {
    var res = this.name + (this.data ? " (with additional data)" : "") + ": " + this.message + "\n" + this.stack;
    if (this.couse) {
        res += "\nCoused by: " + this.couse;
    }
    return res;
}

Exception.prototype.printData = function(printer) {
    if (this.data) {
        printer(this.name + " additional data", this.data);
    }
    if (this.couse && this.couse instanceof Exception) {
        this.couse.printData(printer);
    }
}

Exception.printer = console.log.bind(console);

Exception.print = function(e, printer) {
    printer = printer || Exception.printer;
    if (e instanceof Exception) {
        printer(e.toString());
        e.printData(printer);
    }
    else if (e instanceof Error) {
        if (e.stack) {
            var msg = e.toString().trim();
            var stack = e.stack.toString().split("\n");
            var newStack = [];
            for (var i = 0; i < stack.length; i++) {
                var s = stack[i];
                if (s.trim() == "" || s.trim() == msg) {
                    continue;
                }
                if (s.indexOf("   ") != 0) {
                    s = "    " + s;
                }
                newStack.push(s);
            }
            printer(msg + "\n" + newStack.join("\n"));
        }
        else {
            printer(e.toString());
        }
    }
    else {
        printer(e);
    }
}

module.exports = Exception;
