const { Country } = require("../db");
const { Op } = require("sequelize");

const getCountries = async (name, pag) => {
  if (name) {
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return countries;
  }

  if (pag) {
    const limit = 10;
    let offset = (pag - 1) * limit;
    const countries = await Country.findAll({ offset, limit });
    return countries;
  }

  const countries = await Country.findAll();
  return countries;
};

module.exports = getCountries;
