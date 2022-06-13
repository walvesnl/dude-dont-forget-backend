const { Router } = require("express");
const router = new Router();
const User = require("../models").user;
const Partner = require("../models").partner;
const Event = require("../models").event;
const Fact = require("../models").fact;
const Date = require("../models").date;

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      include: {
        model: Partner,
        include: [{ model: Event, include: { model: Date } }, { model: Fact }],
      },
    });
    res.send(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/addNew", async (req, res, next) => {
  try {
    const { name, user_id } = req.body;
    console.log(name, user_id);

    const addPartner = await Partner.create({
      name,
      user_id,
    });
    res.send(addPartner);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
