/**
 * Dean Ostergaard
 *
 * CS771/871 Web Programming Paradigms
 * JavaScript Calisthenics
 * Problem Set 1
 * Problem #2) PROTOTYPE CHAIN
 * Due: Thursday, Sept 19 by 6:00pm (aka before class)
 */

function A(name) {
    // Created property 'me' for the name since me
    // is referenced in the whoami member function
    this.me = name;
}

A.prototype.whoami = function() {
    return this.me;
};

function B(name, age) {
    A.call(this, name);
    this.yearsold = age;
}

// Establish the prototype inheritance chain
// Must be called before adding any new items to B's prototype
// Otherwise they'd get wiped out by the assignment
B.prototype = new A;    // Hint from Bobby in class

// Now that's we've inherited A's prototypes we can add our own
B.prototype.aboutme = function() {
    return {who: this.whoami(), age: this.yearsold > 30 ? "old" : "young"};
};

b = new B("Bob", 32);

console.log(b.aboutme());
