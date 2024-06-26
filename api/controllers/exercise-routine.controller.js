const Exercise = require("../models/exercise.model");
const Routine = require("../models/routine.model");
const ExerciseRoutine = require("../models/exercise-routine.model");

const getAllExerciseRoutines = async (req, res) => {
  try {
    const routines = await Routine.findAll({
      include: [{
        model: Exercise,
        as: 'exercises',
        attributes: ['title', 'description', 'videoUrl'],
        through: {
          attributes: ["duration", "lapse", "series", "observations"] 
        }
      }]
    });
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: 'Error accessing exercise routines', error: error.message });
  }
};


const getMyExerciseRoutines = async (req, res) => {
  try {
    const userId = res.locals.user.id;

    if (!userId) {
      return res.status(403).json({ message: 'User ID not provided' });
    }

    const exRoutines = await Routine.findAll({
      where: { userId: userId },
      include: [{
        model: Exercise,
        as: 'exercises',
        attributes: ['title', 'description', 'videoUrl'],
        through: {
          attributes: ["duration", "lapse", "series", "observations"] 
        }
      }]
    });
    res.status(200).json(exRoutines);
  } catch (error) {
    res.status(500).json({ message: 'Error accessing exercise routines', error: error.message });
  }
};


const getOneUserRoutineExercise = async (req, res) => {
  if (res.locals.user.role === "admin") {
    try {
      const user = await Routine.findAll( {
        where: { userId: req.params.id }  ,
        
        include: [{
          model: Exercise,
          as: 'exercises',
          attributes: ['title', 'description', 'videoUrl'],
          through: {
            attributes: ["duration", "lapse", "series", "observations"] }
        }],
      });

      if (!user) {
        console.log(req.params.id);
        return res.status(404).send("User not found");
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ["password"],
        },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }
};


const createExerciseRoutine = async (req, res) => {
  try {
    const userId = req.params.id;
    const { date , exercises } = req.body;
    const newExRoutine = await Routine.create({ date, userId });

    for (const exercise of exercises) {
      const exerciseObj = await Exercise.findByPk(exercise.exerciseId); 
      if (exerciseObj) {
        await ExerciseRoutine.create({
          routineId: newExRoutine.id,
          exerciseId: exerciseObj.id,
          duration: exercise.duration,
          lapse: exercise.lapse,
          observations: exercise.observations,
          series: exercise.series,

        });
      } else {
        console.error(`Not found exercise with ID ${exercise.exerciseId}`); 
      }
    }

    return res
      .status(200)
      .json({ message: "Here it is your new ExerciseRoutine", newExRoutine });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}


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
  getMyExerciseRoutines,
  getOneUserRoutineExercise,
  createExerciseRoutine,
  updateExerciseRoutine,
  deleteExerciseRoutine,
};
