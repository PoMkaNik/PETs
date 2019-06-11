const Power = require("./models/power");

module.exports = app => {
	app.get("/dacha/data/power", (req, res) => {
		const pass = req.query.pass;
		const reqTime = new Date() + 3;
		let powerData;
		!req.query.val
			? res.sendStatus(403)
			: ([
					DS,
					u1Avg,
					u2Avg,
					u3Avg,
					u1Min,
					u2Min,
					u3Min,
					u1Max,
					u2Max,
					u3Max
				] = req.query.val.split(";"));

		pass !== "44009321" || DS !== "DS"
			? res.sendStatus(403)
			: ((powerData = new Power({
					time: reqTime,
					u1Avg,
					u2Avg,
					u3Avg,
					u1Min,
					u2Min,
					u3Min,
					u1Max,
					u2Max,
					u3Max
				})),
				powerData.save(
					err => (err ? res.sendStatus(500) : res.sendStatus(200))
				));
	});
	app.get("/dacha/api/power", (req, res) => {
		Power.find()
			.limit(20)
			.then((err, powerData) => {
				err ? res.send(err) : res.json(powerData);
			});
	});
};
