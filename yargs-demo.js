var argv = require('yargs').argv;
var command = argv._[0];

// if (command === 'hello' && typeof argv.name !== 'undefined' && typeof argv.lastname !== 'undefined') {
//     console.log('Hello ' + argv.name + ' ' + argv.lastname + '!');  
// } else if (command === 'hello' && typeof argv.name !== 'undefined') {
//     console.log('Hello ' + argv.name + '!');
// } else if (command === 'hello') {
//     console.log('Hello world!');
// }


// city, country and state

if (command === 'hello' && typeof argv.city != 'undefined' && typeof argv.country != 'undefined' && typeof argv.state != 'undefined') {
    console.log('Hello ' + argv.city + '! ' + argv.country + ', ' + argv.state);
}
else if (command === 'hello' && typeof argv.city != 'undefined' && typeof argv.country != 'undefined') {
    console.log('Hello ' + argv.city + '! ' + argv.country);
}
else if (command == 'hello' && typeof argv.city != 'undefined') {
    console.log('Hello ' + argv.city);
}
else if (command == 'hello') {
    console.log('Hello world');
} else {
    console.log('Welcome to my world');
}
