loql.js
=======

loql.js : A simple interface to localStorage

=======

// js Example:

var person0 = {
        'name':'Marco',
        'nick':'mrk25'
}

var personID = loql.insert('persons', person0);

var person = loql.select('persons', personID);

console.log(person.name);

console.log(person.nick);
