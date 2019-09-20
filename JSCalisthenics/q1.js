/**
 * Dean Ostergaard
 *
 * CS771/871 Web Programming Paradigms
 * JavaScript Calisthenics
 * Problem Set 1
 * Problem #1) A FIXER UPPER
 * Due: Thursday, Sept 19 by 6:00pm (aka before class)
 */

/*
    This function will never execute because it is
    overridden by a new definition later in the source
    file. "He who laughs last laughs best."
 */
function A() {
    return 'a';
}

var b = 'D';
a = function() {
    b = 'C';    // Was unterminated so I appended the semicolon
    console.log(1 +'3' === '13'); // assertion // Was unterminated so I appended the semicolon
    var b = 'E';    // Was unterminated so I appended the semicolon
    aa = A() + b;
    return(aa);
}

/*
 The variable b in this scope will have the value 'D'
 The assignment of 'C' to b takes place within the local
 scope of function a() and so reverts to the global scoped b.
 So, in the assertion below 'CAE' is replaced with 'DAE'.
*/
console.log(b + a() == 'DAE'); // assertion
function A() {
    return 'A';
}
o = {}; // Was unterminated so I appended the semicolon
/*
 The following statement contained a syntax error with a
 comma causing the creation of a globally scoped function "Robot()"
 and leaving o.I undefined since it is never assigned a value or object.
 Assuming an attempted Heinlein reference I removed the comma thereby
 creating a member function of the o object IRobot().
*/
o.IRobot = function() {return "I'm not a Robot"};  // Was unterminated so I appended the semicolon
console.log(o.IRobot);  // Was unterminated so I appended the semicolon
/*
    The statement above dutifully reports that o.IRobot is a function
    and is therefore technically correct. If, however, the intent was to
    display the output from the o.IRobot() function then it is necessary
    to add a pair of parentheses to cause the function to execute.
    Shown by the following statement.
 */
console.log(o.IRobot());
