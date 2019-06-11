const config = require('./config');

const Client = require('./models/client');

const Personnel = require('./models/personnel');

const bcrypt = require('bcrypt'); // password hashing

const saltRounds = 10; // password hashing

const clientsData = [
  { name: 'Client1' },
  { name: 'Client2' },
  { name: config.teamName },
];

const personnelData = [
  {
    name: 'Client1Pers1',
    password: 'password',
    position: 'manager',
    client: 'Client1',
  },
  {
    name: 'Client1Pers2',
    password: 'password',
    position: 'waiter',
    client: 'Client1',
  },
  {
    name: 'Client2Pers1',
    password: 'password',
    position: 'manager',
    client: 'Client2',
  },
  {
    name: 'Client2Pers2',
    password: 'password',
    position: 'waiter',
    client: 'Client2',
  },
  {
    name: 'ReservoPers1',
    password: 'password',
    position: 'manager',
    client: 'Reservo',
  },
  {
    name: 'ReservoPers2',
    password: 'password',
    position: 'intern',
    client: 'Reservo',
  },
];

const placesData = [
  {
    name: 'Client1Place1',
    client: 'Client1',
  },
  {
    name: 'Client1Place2',
    client: 'Client1',
  },
  {
    name: 'Client2Place1',
    client: 'Client2',
  },
  {
    name: 'Client2Place2',
    client: 'Client2',
  },
];

function seedDB(clients, personnel, places) {
// create client
  const result = clients.forEach((elem) => {
    const newClient = new Client(elem);
    return newClient.save().then((savedClient) => {
      // then for each client create personnel
      personnel.filter(pers => pers.client === savedClient.name)
      .forEach(filteredPers =>
        bcrypt.hash(filteredPers.password, saltRounds).then((passwordHash) => {
          filteredPers.password = passwordHash;
          filteredPers.client = savedClient._id;
          // create new personnel
          const newPersonnel = new Personnel(filteredPers);
          return newPersonnel.save().then((savedPers) => {
            console.log('pers was created!');
            // update admin ID in Client collection
            Client.findOneAndUpdate({ _id: savedPers.client },
                                    { $push: { personnel: savedPers._id } },
                                    { new: true })
            .then(updatedClient => console.log('pers was added to Client DB'));
          });
        }));
      places.filter(place => place.client === savedClient.name)
      .forEach((filteredPlace) => {
        filteredPlace.client = savedClient._id;
        // create new personnel
        const newPlace = new Place(filteredPlace);
        return newPlace.save().then((savedPlace) => {
          console.log('place was created!');
          // update admin ID in Client collection
          Client.findOneAndUpdate({ _id: savedPlace.client },
                                    { $push: { places: savedPlace._id } },
                                    { new: true })
            .then(updClient => console.log('place was added to Client DB'));
          
        });
      });
      // add additional data like places
    }).catch(err => err);
  });
  return result;
}

module.exports.seed = (req, res) => {
  // remove Personnel
  Personnel.remove({}, () => console.log('Personnel REMOVED successfully'))
  // remove all clients
  .then(Client.remove({}, () => console.log('Clients REMOVED successfully')))
  // seed new data in DB
  .then(seedDB(clientsData, personnelData, placesData))
  .then(res.json('done!'));
};
