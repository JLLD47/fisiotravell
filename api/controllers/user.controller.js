const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  console.log(res.locals.user.role);
  if (res.locals.user.role === "admin") {
    try {
      const users = await User.findAll({
        where: req.query,
        attributes: {
          exclude: ["password"],
        },
      });
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const users = await User.findAll({
        where: req.query,
        attributes: {
          exclude: ["password", "email", "userName"],
        },
      });
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }
};

const getOneUser = async (req, res) => {
  if (res.locals.user.role === "admin") {
    try {
      const user = await User.findByPk(req.params.userId, {
        attributes: {
          exclude: ["password"],
        },
      });

      if (!user) {
        console.log(req.params.id)
        return res.status(404).send("User not found");
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const user = await User.findByPk(req.params.userId, {
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

const getMyUser = async (req, res) => {
  try {
    const user = await User.findByPk(res.locals.user.id, {
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
};

const createUser = async (req, res) => {
  try {
    const saltRounds = bcrypt.genSaltSync(parseInt(10));
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    const newUser = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userUpdated = await User.update(req.body, {
      where: {
        id: req.params.userId,
      },
    });
    if (!userUpdated) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyUser = async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: res.locals.user.id,
      },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (user > 0) {
      return res.status(200).json("User deleted");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getMyUser,
  createUser,
  updateUser,
  updateMyUser,
  deleteUser,
};
