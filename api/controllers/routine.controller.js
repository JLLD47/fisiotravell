const Routine = require("../models/routine.model");

const getAllRoutines = async (req, res) => {
  try {
    const routines = await Routine.findAll();
    return res.status(200).json(routines);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createRoutine = async (req, res) => {
  try {
    const newRoutine = await Routine.create({
      date: req.body.date,
    });
    return res
      .status(200)
      .json({ message: "Here it is your new Routine", newRoutine });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateRoutine = async (req, res) => {
  try {
    const updatedRows = await Routine.update(req.body, {
      where: {
        id: req.params.routineId,
      },
    });

    if (updatedRows > 0) {
      const updatedRoutine = await Routine.findByPk(req.params.routineId);
      return res.status(200).json(updatedRoutine);
    } else {
      return res.status(404).send("Routine not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteRoutine = async (req, res) => {
  try {
    const routine = await Routine.destroy({
      where: {
        id: req.params.routineId,
      },
    });
    if (routine > 0) {
      return res.status(200).json("Routine deleted");
    } else {
      return res.status(404).send("Routine not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  deleteRoutine,
};
