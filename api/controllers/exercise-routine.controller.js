const ExerciseRoutine = require("../models/exerciseRoutine.model");

const getAllExerciseRoutines = async (req, res) => {
  try {
    const exerciseRoutine = await ExerciseRoutine.findAll();
    return res.status(200).json(exerciseRoutine);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createExerciseRoutine = async (req, res) => {
  try {
    const newExerciseRoutine = await ExerciseRoutine.create({
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.body.videoUrl,
    });
    return res
      .status(200)
      .json({ message: "Here it is your new ExerciseRoutine", newExerciseRoutine });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateExerciseRoutine = async (req, res) => {
  try {
    const updatedRows = await ExerciseRoutine.update(req.body, {
      where: {
        id: req.params.exerciseRoutineId,
      },
    });

    if (updatedRows > 0) {
      const updatedExerciseRoutine = await ExerciseRoutine.findByPk(req.params.exerciseRoutineId);
      return res.status(200).json(updatedExerciseRoutine);
    } else {
      return res.status(404).send("ExerciseRoutine not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteExerciseRoutine = async (req, res) => {
  try {
    const exerciseRoutine = await ExerciseRoutine.destroy({
      where: {
        id: req.params.exerciseRoutineId,
      },
    });
    if (exerciseRoutine > 0) {
      return res.status(200).json("ExerciseRoutine deleted");
    } else {
      return res.status(404).send("ExerciseRoutine not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllExerciseRoutines,
  createExerciseRoutine,
  updateExerciseRoutine,
  deleteExerciseRoutine,
};
