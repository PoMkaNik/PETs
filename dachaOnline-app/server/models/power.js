const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const powerSchema = new Schema({
	time: Date,
	u1Avg: Number,
	u2Avg: Number,
	u3Avg: Number,
	u1Min: Number,
	u2Min: Number,
	u3Min: Number,
	u1Max: Number,
	u2Max: Number,
	u3Max: Number
});

const Power = mongoose.model("power", powerSchema);
module.exports = Power;
