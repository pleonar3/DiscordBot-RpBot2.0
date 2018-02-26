const Collection = require("../collection.js").Collection;
const CommandEcho = require("../commands/echo.js").Echo;
const CommandEchoPermission = require("../commands/echo.js").Permission;

const COLLECTION_NAME = "Default";
const COLLECTION_TRIGGER = "!";

exports.Default = new Collection(COLLECTION_NAME, COLLECTION_TRIGGER);

exports.Default.addCommand(CommandEcho, CommandEchoPermission);
