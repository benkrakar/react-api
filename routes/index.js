const usersRouters = require("./users");
const hotelsRouters = require("./hotels");

const routes = {};

routes.usersRouter = usersRouters;
routes.hotelsRouter = hotelsRouters;

module.exports = routes;
