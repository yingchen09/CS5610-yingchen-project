module.exports = function(app) {
    var models = require("./model/models.server.js")();

    require("./services/user.service.server.js")(app, models);
    require("./services/post.service.server.js")(app, models);
    // require("./services/page.service.server.js")(app, models);
    // require("./services/widget.service.server.js")(app, models);
};
