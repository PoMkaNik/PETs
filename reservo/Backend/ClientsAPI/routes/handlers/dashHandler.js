module.exports.showListOfStaff = (req, res) => {
  const Staff = req.persDB.staff;
//  const Table = req.persDB.table;

  const personnel = new Staff({
    name: 'Nick Cafe Barman',
    position: 'Barmen',
    pass: 'password',
  });

  if (!res) {
    personnel.save()
    .then(() => {
      Staff.find({}).then(findings => res.json(findings));
    });
  }
};
