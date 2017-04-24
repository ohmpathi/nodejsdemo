console.log('starting password manager');

var storage = require('node-persist');
var crypto = require('crypto-js');
storage.initSync();

var argv = require('yargs')
    .command('create', 'Create a new account', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Account name (eg: Twitter, Facebook)',
                type: 'string'
            },
            username: {
                demand: true,
                alias: 'u',
                description: 'Account username or email',
                type: 'string'
            },
            password: {
                demand: true,
                alias: 'p',
                description: 'Account password',
                type: 'string'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Master password',
                type: 'string'
            }
        }).help('help');
    })
    .command('get', 'Get an existing account', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Account name (eg: Twitter, Facebook)',
                type: 'string'
            },
            masterPassword: {
                demand: true,
                alias: 'm',
                description: 'Master password',
                type: 'string'
            }
        }).help('help');
    })
    .help('help')
    .argv;
var command = argv._[0];

// create
//     --name
//     --username
//     --password

// get
//     --name

// account.name Facebook
// account.username User12!
// account.password Password123!

function getAccounts(masterPassword) {
    debugger
    var accounts = [];
    var encrypted = storage.getItemSync('accounts')
    console.log("encrypted =>  " + encrypted);

    if (typeof encrypted === undefined) {
        var bytes = crypto.AES.decrypt(encrypted, masterPassword);
        accounts = JSON.parse(bytes);
    }
    return accounts;
}

function saveAccounts(accounts, masterPassword) {
    var encrypted = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
    storage.setItemSync('accounts', encrypted.toString());
    return accounts;
}


function createAccount(account, masterPassword) {
    debugger
    var accounts = getAccounts(masterPassword);
    accounts.push(account);
    saveAccounts(accounts);
    return account;
}

function getAccount(accountName, masterPassword) {
    var accounts = getAccounts(masterPassword);
    var matchedAccount;

    accounts.forEach(function (account) {
        if (account.name === accountName) {
            matchedAccount = account;
        }
    });

    return matchedAccount;
}




if (command === 'create') {
    try {
        debugger
        // if (argv.password === argv.confirmpassword) {
        var createdAccount = createAccount({
            name: argv.name,
            username: argv.username,
            password: argv.password,
            // question: argv.question
        }, argv.masterPassword);
        console.log('Account created!');
        console.log(createdAccount);
        // } else {
        //     console.log('passwords does not match! please try again.');
        // }
    } catch (e) {
        console.error('Unable to create user');
        console.error(e);
    }
} else if (command === 'get') {
    try {
        var fetchedAccount = getAccount(argv.name, argv.masterPassword);

        if (typeof fetchedAccount === 'undefined') {
            console.log('Account not found');
        } else {
            console.log('Account found!');
            console.log(fetchedAccount);
        }
    } catch (e) {
        console.error('Unable to fetch account!');
    }
}