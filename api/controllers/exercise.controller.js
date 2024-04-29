const Exercise = require("../models/exercise.model");

const getAllExercises = async (req, res) => {
  try {
    const exercise = await Exercise.findAll();
    return res.status(200).json(exercise);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createExercise = async (req, res) => {
  try {
    const newExercise = await Exercise.create({
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.body.videoUrl,
    });
    return res
      .status(200)
      .json({ message: "Here it is your new Exercise", newExercise });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateExercise = async (req, res) => {
  try {
    const updatedRows = await Exercise.update(req.body, {
      where: {
        id: req.params.exerciseId,
      },
    });

    if (updatedRows > 0) {
      const updatedExercise = await Exercise.findByPk(req.params.exerciseId);
      return res.status(200).json(updatedExercise);
    } else {
      return res.status(404).send("Exercise not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.destroy({
      where: {
        id: req.params.exerciseId,
      },
    });
    if (exercise > 0) {
      return res.status(200).json("Exercise deleted");
    } else {
      return res.status(404).send("Exercise not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllExercises,
  createExercise,
  updateExercise,
  deleteExercise,
};
