/**
 * Dean Ostergaard
 *
 * CS771/871 Web Programming Paradigms
 * JavaScript Calisthenics
 * Problem Set 1
 * Problem #3) A SORT-OF REAL-WORLD PROBLEM
 * Due: Thursday, Sept 19 by 6:00pm (aka before class)
 */

/*
    If str isn't a string the parseText must return undefined.
    If str is a string, the function will return an array of
    character codes (ASCII code aka integers).
 */
function parseText(str) {
    var out = [];
    if (typeof str === "string") {
        for (let i = 0; i < str.length; i++) {
            out.push(str.charCodeAt(i));
        }
        return out;
    }
    // If it falls through to here the result will be undefined
}


function TextConstructor(arg) {
    /*
        if the number of arguments is 0:
            the property "text" must have the value of [].
     */
    if ( arguments.length === 0 ) {
        this.text = [];
    } else if ( arguments.length === 1 ) {
        switch (typeof arg) {
            /*
                if arg is a string:
                    the string must be parsed by parseText and the result stored
                    as a property of the object being constructed and it must be
                    named "text."
             */
            case "string":
                this.text = parseText(arg);
                break;

            /*
                if arg is a number:
                    the property "text" is just an array with one element whose value is the arg.
             */
            case "number":
                this.text = [arg];
                break;

            /*
                if arg is an object constructed by TextConstructor:
                    the property "text" must be a copy of the array stored in the object arg.
                    (copy the argument using the slice method of Array).
             */
            case "object":
                if (arg instanceof TextConstructor) {
                    // copy text property using slice
                    this.text = arg.text.slice();
                }
                break;
        }
    } else if ( arguments.length > 1 ) {
        notAllNums = false;
        for (var i = 0; i < arguments.length; i++ ) {
            if (typeof arguments[i] != "number") {
                notAllNums = true;
            }
        }
        if ( !notAllNums ) {
            this.text = Array.prototype.slice.call(arguments);
        }
        /*
            The assignment does not specify the behavior if
            the arguments are of mixed types. This constructor
            will produce an empty object in that case.
         */
    }
}


/*
    otext is an object constructed by TextConstructor, and
    sep is an array of character codes (aka integers)

    The function separates the arrays at the separator(s)
    and returns an array of TextConstructor objects.
 */
function disconnectText(otext, sep) {
    // The sep argument must be an array. I used the Array.isArray() function
    // rather than instanceof because there are cases where (obj instanceof Array)
    // can be false and therefore using instanceof would be bad practice and should
    // get flagged as such during a code review.
    if ( !(otext instanceof TextConstructor) || !Array.isArray(sep) ) {
        return; // undefined
    }
    var lookAhead = sep.length;
    var result = [];
    var element = [];
    var matched = false;
    var str = "";

    for ( var i = 0; i < otext.text.length; i++ ) {
        // If we match the first char of the sep check if we have the whole sep
        if ( otext.text[i] === sep[0] ) {
            for ( var j = 0; j < lookAhead; j++ ) {
                matched = ( otext.text[i + j] === sep[j] );
                if ( !matched ) break;
            }
        }
        if ( !matched ) {
            element.push(otext.text[i]);
        } else {
            // TextConstructor only accepts strings, numbers, or TextConstructor objects!
            // Therefore we need to turn the element array into one of those.
            // It sure would be nice if we could pass an array to synthesizeString!
            for ( var k = 0; k < element.length; k++ ) {
                str += String.fromCharCode(element[k]);
            }
            // append next element to result
            result.push(new TextConstructor(str));
            element = [];       // reset element to empty
            str = "";           // reset str
            matched = false;    // reset matched
            i += lookAhead - 1; // skip the sep
        }
    }
    // Append the final element to result
    // It sure would be nice if we could pass an array to synthesizeString!
    for ( var l = 0; l < element.length; l++ ) {
        str += String.fromCharCode(element[l]);
    }
    result.push(new TextConstructor(str));
    return result;
}

/*
    collected is an array of objects constructed by TextConstructor,
    and sep is an array of character codes (aka integers)

    connectText will return an TextConstructor object whose property
    "text" is the original array that was disconnected.
 */
function connectText(collected, sep) {
    // Both arguments must be arrays. I used the Array.isArray() function
    // rather than instanceof because there are cases where (obj instanceof Array)
    // can be false and therefore using instanceof would be bad practice and should
    // get flagged as such during a code review.
    if ( !Array.isArray(collected) || !Array.isArray(sep) ) {
        console.log("not all arguments are arrays");
        return; // undefined
    }

    var result = [];
    for ( var i=0; i < collected.length; i++ ) {
        // Every element of collected must be a TextConstructor object
        if ( !(collected[i] instanceof TextConstructor) ) {
            console.log("An element of collected is not a TextConstructor object.");
            return; // undefined
        } else {
            // Append the elements of the TextConstructor text property
            for ( var j = 0; j < collected[i].text.length; j++ ) {
                result.push(collected[i].text[j]);
            }
            // If this is not the last element of collected append the sep
            if ( i < collected.length - 1 ) {
                for ( var k = 0; k < sep.length; k++ ) {
                    result.push(sep[k]);
                }
            }
        }
    }
    // TextConstructor only accepts strings, numbers, or TextConstructor objects!
    // Therefore we need to turn the result array into one of those.
    // It sure would be nice if we could pass an array to synthesizeString!
    var str = "";
    for ( var k = 0; k < result.length; k++ ) {
        str += String.fromCharCode(result[k]);
    }
    return new TextConstructor(str);
}

/*
    otext is an object returned from TextConstructor
 */
function synthesizeString(otext) {
    // if otext isn't an object returned from TextConstructor
    // the function should return an empty string.
    result = "";
    if ( otext instanceof TextConstructor ) {
        /*
            if otext is an object returned from TextConstructor
            then the array (otext.text) must be iterated over
            and each element must be converted into a string
            using the fromCharCode string method.
         */
        for ( var i = 0; i < otext.text.length; i++ ) {
            result += String.fromCharCode(otext.text[i]);
        }
    }
    return result;
}

/* Tests
    I have not learned a testing framework yet for JavaScript so
    the tests I performed are below. Careful with uncommenting
    the tests since some variables are declared again in the vicinity
    of their test group.
 */
// console.log(parseText(42) === undefined);
// console.log(parseText({}) === undefined);
// console.log(parseText("").length === 0);
// var dean = new TextConstructor("Dean Ostergaard");
// console.log(dean);
// var aCopy = new TextConstructor(dean);
// console.log(aCopy );
// var fortytwo = new TextConstructor(42);
// console.log(fortytwo);
// var empty = new TextConstructor();
// console.log(empty);
// var bunchONums = new TextConstructor(1, 2, 3, 4, 5, 6, 7, 8, 9 );
// console.log(bunchONums);
// var mixedBag = new TextConstructor(1, 2, 3, "four", 5, 6);
// console.log(mixedBag);

var sepTest = new TextConstructor(98, 105, 108, 108, 44, 106, 105, 108, 108);

// Note the last "fake" separator.
// var tstStr = "The-,-quick-,-red-,-fox-,lazy";
// var sepStr = "-,-";
// var sepTest = new TextConstructor(tstStr);
// var dashes = new TextConstructor(sepStr).text;
// var disc = disconnectText(sepTest, dashes);
// console.log("Disconnected ");
// for (var s = 0; s < disc.length; s++) {
//     console.log(synthesizeString(disc[s] ));
// }
// var conn = connectText(disc, dashes);
// console.log("Connected ", synthesizeString(conn));

// Prof. Weiner's tests
// test set 1
// var text = new TextConstructor("bill,jill,joe");
// var disconnected = disconnectText(text, [44]);
// var connected = connectText(disconnected, [44]);
// var str = synthesizeString(connected);
// console.log(text);
// console.log(disconnected);
// console.log(connected);
// console.log(str);

// test set 2
// var bill = new TextConstructor("bill");
// var jill = new TextConstructor("jill");
// var joe = new TextConstructor("joe");
// var collected = [bill,jill,joe];
// var sep = [44];
// var connected = connectText(collected, sep);
// var str = synthesizeString(connected);
// console.log(str);
