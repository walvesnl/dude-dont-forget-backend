const { Router } = require("express");
const auth = new Router();
const User = require("../models").user;
const Partner = require("../models").partner;
const Event = require("../models").event;
const Fact = require("../models").fact;
const Date = require("../models").date;
const authMiddleware = require("../auth/middleware");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");
const { toJWT } = require("../auth/jwt");

auth.post("/signup", async (req, res) => {
  try {
    const { name, email, password, nameFriend } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide your name, email and password" });
    }

    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
    });

    if (newUser) {
      const newPartner = await Partner.create({
        name: nameFriend,
        user_id: newUser.dataValues.id,
      });
    }

    const userWithPartner = await User.findOne({
      where: { email },
      include: {
        model: Partner,
        include: [{ model: Event, include: { model: Date } }, { model: Fact }],
      },
    });

    delete userWithPartner.dataValues["password"];

    const token = toJWT({ userId: newUser.id });

    res.status(201).send({ token, user: userWithPartner.dataValues });
  } catch (e) {
    console.log(e.message);
    if (e.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// LOGIN ROUTE

auth.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide your email and password" });
    }

    const user = await User.findOne({
      where: { email },
      include: {
        model: Partner,
        include: [{ model: Event, include: { model: Date } }, { model: Fact }],
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"];

    const token = toJWT({ userId: user.id });

    return res.status(200).send({ token, user: user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

auth.get("/me", authMiddleware, async (req, res) => {
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues });
});

module.exports = auth;
