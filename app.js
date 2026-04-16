function interpret_bf(s) {
    if (typeof s != "string") { 
        throw new Error("Argument is not a string.")
    }

    for (i in s) {
        console.log(s[i]);
    }
    return s;
}

// module time
module.exports = interpret_bf;