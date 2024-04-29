const Region = require("../models/region.model");

const getAllRegions = async (req, res) => {
  try {
    const regions = await Region.findAll();
    return res.status(200).json(regions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createRegion = async (req, res) => {
  try {
    const newRegion = await Region.create({
      name: req.body.name
    });
    return res
      .status(200)
      .json({ message: "Here it is your new Region", newRegion });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateRegion = async (req, res) => {
  try {
    const updatedRows = await Region.update(req.body, {
      where: {
        id: req.params.regionId,
      },
    });

    if (updatedRows > 0) {
      const updatedRegion = await Region.findByPk(req.params.regionId);
      return res.status(200).json(updatedRegion);
    } else {
      return res.status(404).send("Region not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteRegion = async (req, res) => {
  try {
    const region = await Region.destroy({
      where: {
        id: req.params.regionId,
      },
    });
    if (region > 0) {
      return res.status(200).json("Region deleted");
    } else {
      return res.status(404).send("Region not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllRegions,
  createRegion,
  updateRegion,
  deleteRegion,
};
