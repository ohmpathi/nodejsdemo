var storage = require('node-persist');
storage.initSync();

storage.setItemSync('accounts', [{
    username: 'Ompathi',
    balance: 100
}, {
    username: 'Ompathi duplicate',
    balance: 100.9876
}]);

// get existing accounts
var acc = storage.getItemSync('accounts');

// push on a new account
acc.push({
    username: 'Jen',
    balance: 0.00
});

// saving
storage.setItemSync('accounts', acc);

console.log(acc);
