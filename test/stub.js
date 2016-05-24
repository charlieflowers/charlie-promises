const u = require(`./../utilities`);
const promisesAplusTests = require('promises-aplus-tests');
const adapter = require('./my-adapter');

promisesAplusTests(adapter, function(err) {
   console.log(`error count: ${u.prettyObject(err)}`); 
});