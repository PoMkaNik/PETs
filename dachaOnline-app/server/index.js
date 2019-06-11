const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.promise = global.Promise;

const router = require("./router");

// DB setup
mongoose.connect("mongodb://dacha:dacha@ds127375.mlab.com:27375/dacha-online", {
	useMongoClient: true
});

app.use(cors());
router(app);

const PORT = process.env.PORT || 3030;
app.listen(PORT);
console.log("Server started on port: ", PORT);
