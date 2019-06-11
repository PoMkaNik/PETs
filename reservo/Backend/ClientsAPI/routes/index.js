const sysRoutes = require('./sysRoutes');

const dashRoutes = require('./dashRoutes');

const apiRoutes = require('./apiRoutes');

module.exports = {
  sys: sysRoutes,
  dash: dashRoutes,
  api: apiRoutes,
};
