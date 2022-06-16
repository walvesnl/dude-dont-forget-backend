const { Router } = require("express");
const router = new Router();
const Fact = require("../models").fact;
const Event = require("../models").event;
const Partners = require("../models").partner;
const authMiddleware = require("../auth/middleware");

router.post("/addNew", async (req, res, next) => {
  try {
    const { title, details, partnerId, userId } = req.body;

    const addFact = await Fact.create({
      title,
      details,
      partner_id: partnerId,
      user_id: userId,
    });
    // console.log(addFact);
    const partners = await Partners.findAll({
      where: { user_id: userId },
      include: [{ model: Event }, { model: Fact }],
    });

    res.send(partners);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res, next) => {
  try {
    const factID = req.params.id;

    const findFact = await Fact.findByPk(factID);

    findFact.destroy();

    const user = req.user;
    // res.send({ message: "Fact deleted", addFact });
    const partners = await Partners.findAll({
      where: { user_id: user.id },
      include: [{ model: Event }, { model: Fact }],
    });

    res.send({ message: "Fact deleted", findFact, partners });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
