const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const signUp = async (req, res) => {
  try {
    const { name, lastname, email, password, phone } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      phone,
    });

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    delete newUser.password;

    return res.status(200).json({ message: ">> Sign up!!", token, newUser });
  } catch (error) {
    console.log(error);
    return res.status(404).send(">> Oops something went wrong!");
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1y" }
          );

          return res.status(200).json({ token, user });
        }
        return res
          .status(404)
          .send(">> Oops something went wrong, user or password incorrect.");
      });
    } else {
      return res
        .status(404)
        .send(">> Oops something went wrong, user or password incorrect.");
    }
  } catch (error) {
    return res
      .status(402)
      .send(">> Oops something went wrong, user or password incorrect.");
  }
};

module.exports = { signUp, logIn };
