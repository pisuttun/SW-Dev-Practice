const sql = require("../config/vacCenterDB.js");

const VacCenter = function (vacCenter) {
    this.id = vacCenter.id;
    this.name = vacCenter.name;
    this.address = vacCenter.address;
};

VacCenter.getAll = (result) => {
    sql.query("SELECT * FROM vacCenters", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("vaccenter: ", res);
        result(null, res);
    });
};

module.exports = VacCenter;
