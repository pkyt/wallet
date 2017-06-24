// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
window.MetaCoin = contract(metacoin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
window.accounts;
window.account;
window.ks; // KeyStore

// window.App = {
//   start: function() {
//     var self = this;

//     // Bootstrap the MetaCoin abstraction for Use.
//     MetaCoin.setProvider(web3.currentProvider);

//     // Get the initial account balance so it can be displayed.
//     web3.eth.getAccounts(function(err, accs) {
//       if (err != null) {
//         alert("There was an error fetching your accounts.");
//         return;
//       }

//       if (accs.length == 0) {
//         alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
//         return;
//       }

//       accounts = accs;
//       account = accounts[0];

//       var provider = new HookedWeb3Provider({
//         // Let's pick the one that came with Truffle
//         host: web3.currentProvider.host,
//         transaction_signer: { 
//             hasAddress: function(address, callback) {
//                 console.log(address);
//                 console.log(callback);
//             },
//             signTransaction: function(tx_params, callback) {
//                 console.log(tx_params);
//                 console.log(callback);
//             }
//           }
//       });
//       web3.setProvider(provider);
//       // And since Truffle v2 uses EtherPudding v3, we also need the line:
//       MetaCoin.setProvider(provider);


//       console.log("If you need a new key, use this one");
//       console.log(lightwallet.keystore.generateRandomSeed());
//       // Example of seed 'unhappy nerve cancel reject october fix vital pulse cash behind curious bicycle'
//       var seed = prompt('Enter your private key seed', '12 words long');;
//       // the seed is stored in memory and encrypted by this user-defined password
//       var password = prompt('Enter password to encrypt the seed', 'samsung');

//       lightwallet.keystore.createVault({
//         password: password
//       }, function (err, ks) {
//         console.log("---");
//         console.log(err);
//         console.log(ks);
//         console.log("---;");
//         ks.keyFromPassword(password, function (err, pwDerivedKey) {
//             if (err) throw err;
//             console.log(pwDerivedKey);
//         console.log(err);
//         // ks = new lightwallet.keystore(seed, pwDerivedKey);

//         // Create a custom passwordProvider to prompt the user to enter their
//         // password whenever the hooked web3 provider issues a sendTransaction
//         // call.
//         ks.passwordProvider = function (callback) {
//             console.log("passwordProvider");
//             var pw = prompt("Please enter password to sign your transaction", "dev_password");
//             callback(null, pw);
//         };

//         var provider = new HookedWeb3Provider({
//             // Let's pick the one that came with Truffle
//             host: web3.currentProvider.host,
//             transaction_signer: ks
//         });
//         web3.setProvider(provider);
//         // And since Truffle v2 uses EtherPudding v3, we also need the line:
//         MetaCoin.setProvider(provider);

//         // Generate the first address out of the seed
//         console.log(pwDerivedKey)
//         ks.generateNewAddress(pwDerivedKey);

//         accounts = ks.getAddresses();
//         account = "0x" + accounts[0];
//         console.log("Your account is " + account);
//         self.refreshBalance();
//       });
//     });


//       // lightwallet.keystore.deriveKeyFromPassword(password, function(err, _pwDerivedKey) {
//       //   var pwDerivedKey = _pwDerivedKey;
//       //   console.log(pwDerivedKey);
//       //   console.log(err);
//       //   ks = new lightwallet.keystore(seed, pwDerivedKey);

//       //   // Create a custom passwordProvider to prompt the user to enter their
//       //   // password whenever the hooked web3 provider issues a sendTransaction
//       //   // call.
//       //   ks.passwordProvider = function (callback) {
//       //       console.log("passwordProvider");
//       //       var pw = prompt("Please enter password to sign your transaction", "dev_password");
//       //       callback(null, pw);
//       //   };

//       //   var provider = new HookedWeb3Provider({
//       //       // Let's pick the one that came with Truffle
//       //       host: web3.currentProvider.host,
//       //       transaction_signer: ks
//       //   });
//       //   web3.setProvider(provider);
//       //   // And since Truffle v2 uses EtherPudding v3, we also need the line:
//       //   MetaCoin.setProvider(provider);

//       //   // Generate the first address out of the seed
//       //   console.log(pwDerivedKey)
//       //   ks.generateNewAddress(pwDerivedKey);

//       //   accounts = ks.getAddresses();
//       //   account = "0x" + accounts[0];
//       //   console.log("Your account is " + account);
//       //   refreshBalance();
//       // });

//       self.refreshBalance();
//     });
//   },

//   setStatus: function(message) {
//     var status = document.getElementById("status");
//     status.innerHTML = message;
//   },

//   refreshBalance: function() {
//     var self = this;

//     var meta;
//     MetaCoin.deployed().then(function(instance) {
//       meta = instance;
//       return meta.getBalance.call(account, {from: account});
//     }).then(function(value) {
//       var balance_element = document.getElementById("balance");
//       balance_element.innerHTML = value.valueOf();
//     }).catch(function(e) {
//       console.log(e);
//       self.setStatus("Error getting balance; see log.");
//     });
//   },

//   sendCoin: function() {
//     var self = this;

//     var amount = parseInt(document.getElementById("amount").value);
//     var receiver = document.getElementById("receiver").value;

//     this.setStatus("Initiating transaction... (please wait)");

//     var meta;
//     MetaCoin.deployed().then(function(instance) {
//       meta = instance;
//       return meta.sendCoin(receiver, amount, {from: account});
//     }).then(function() {
//       self.setStatus("Transaction complete!");
//       self.refreshBalance();
//     }).catch(function(e) {
//       console.log(e);
//       self.setStatus("Error sending coin; see log.");
//     });
//   }
// };

// window.addEventListener('load', function() {
//   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//   if (typeof web3 !== 'undefined') {
//     console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
//     // Use Mist/MetaMask's provider
//     window.web3 = new Web3(web3.currentProvider);
//   } else {
//     console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
//     // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//     window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//   }

//   App.start();
// });
