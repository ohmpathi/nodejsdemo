var yargs = require('yargs')
var argv = yargs
    .usage('usage: $0 <command>')
    .command('adduser', 'Greets the user', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Your first name goes here',
                type: 'string'
            },
            lastname: {
                demand: true,
                alias: 'l',
                description: 'Your last name goes here',
                type: 'string'
            }
        }).help('help');
        checkCommands(yargs, argv, 2)
    })
    .command('hello', 'Smiple command yargs demo', function (yargs) {
        yargs.options({
            city: {
                demand: true,
                alias: 'c',
                description: 'Your current city goes here',
                type: 'string'
            },
            state: {
                demand: true,
                alias: 's',
                description: 'Your state goes here',
                type: 'string'
            }
        }).help('help');
    })
    .help('help')
    .argv;

checkCommands(yargs, argv, 1)

function checkCommands(yargs, argv, numRequired) {
    if (argv._.length < numRequired) {
        yargs.showHelp()
    } else {
        // check for unknown command
    }
}

// var command = argv._[0];

// console.log(argv);

// if (command === 'adduser' && typeof argv.name !== 'undefind' && typeof argv.lastname !== 'undefined') {
//     console.log('Hello ' + argv.name + ' ' + argv.lastname + '!');  
// } else if (command === 'adduser' && typeof argv.name !== 'undefined') {
//     console.log('Hello ' + argv.name + '!');
// } else if (command === 'adduser') {
//     console.log('Hello world!');
// }