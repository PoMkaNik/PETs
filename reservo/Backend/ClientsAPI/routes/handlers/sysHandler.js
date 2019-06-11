const User = require('../../models/user');

const Client = require('../../models/client');

const Team = require('../../models/team');

const bcrypt = require('bcrypt'); // password hashing

const saltRounds = 10; // password hashing

function funCreateClientAndAdminUser(client) {
  // create hash of password to store in DB
  const createdClientPromise = bcrypt.hash(client.adminPass, saltRounds).then((passwordHash) => {
    // create new Client
    const newClient = new Client({
      name: client.name,
      address: client.address,
    });

    return newClient.save().then((savedClient) => {
    // create new admin user
      const adminUser = new User({
        name: client.adminName,
        password: passwordHash,
        admin: true,
        client: savedClient._id,
      });

      return adminUser.save().then(savedUser =>
      // update admin ID in Client collection
       Client.findOneAndUpdate({ _id: savedUser.client }, { $set: { admin: savedUser._id } }, { new: true }));
    });
  }).catch(err => err);
  // return
  return createdClientPromise;
}

// function funCreateTeamMember(teamMember) {}

module.exports.createClientAndAdminUser = (req, res) => {
  // get data from request
  // required fields to send: name, address, adminName, adminPass
  const client = req.body;

  funCreateClientAndAdminUser(client).then((createdClient) => {
    if (createdClient.message !== 'data and salt arguments required' && !createdClient.errors) {
      res.json(createdClient);
    } else if (createdClient.errors) {
      res.status(403).json(createdClient);
    } else {
      res.status(403).json({ errors: {
        kind: 'required',
        path: 'password',
      },
        message: 'AdminPass validation failed',
        name: 'ValidationError',
      });
    }
  });
};

module.exports.createSetupEnvironment = (req, res) => {
  // create a sample user
  const nick = {
    name: 'Nick Cafe',
    address: 'Nick Cafe Address',
    adminName: 'Nick Cerminara',
    adminPass: 'password',
  };

  // remove all admin users
  User.remove({}, () => console.log('Admin Users REMOVED successfully'))
  // remove all clients
  .then(Client.remove({}, () => console.log('Clients REMOVED successfully')))
  // remove all team members
  .then(Team.remove({}, () => console.log('Team Members REMOVED successfully')))
  // save the sample user
  .then(funCreateClientAndAdminUser(nick).then(createdClient => res.json(createdClient)));
};
