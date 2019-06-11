const resolver = require('./resolver');


function handleRequest(req, res) {
  const context = { user: req.user };
  const query = req.body;
  graphql(todoSchema, query, context).then(handleResponse(res));
}

function handleResponse(res) {
  return (result) => {
    if (result.errors && result.errors.length) {
      const msgs = result.errors.map(e => e.message);
      return sendErrors(res, ...msgs);
    }
    return res.status(200).json(result);
  };
}

module.exports.handleRequest = handleRequest;
module.exports.handleResponse = handleResponse;
