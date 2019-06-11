
// resolver for graphQL

const config = require('../../config'); // get our config file

const Client = require('../../models/client');

// CLIENT schema
// get all
function listOfClients(req, res) {
  const user = req.decoded;
  // get user Client name and ID
  const clientID = user.clientID;
  const clientName = user.clientName;
  // if request from smb from AppTeam
  if (clientName === config.teamName) {
    // check permissions
    if (user.position === 'manager') {
      Client.find({}, (err, clients) => {
        if (err) {
          res.json(err);
        }

        res.json(clients);
      });
  // else return only that user Clients' info
    } else {
      res.status(403).json('Not enough rights for this query');
    }
  } else if (clientID) {
    Client.find({ _id: clientID }, (err, clients) => {
      if (err) {
        res.json(err);
      }

      res.json(clients);
    });
  }
}
// get one with params (args)
// add one
// update one
// delete one

module.exports.listOfClients = listOfClients;
