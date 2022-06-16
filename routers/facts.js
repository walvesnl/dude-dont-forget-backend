const { Router } = require("express");
const router = new Router();
const Fact = require("../models").fact;

router.post("/addNew", async (req, res, next) => {
  try {
    const { title, details, partnerId, userId } = req.body;

    const addFact = await Fact.create({
      title,
      details,
      partner_id: partnerId,
      user_id: userId,
    });

    res.send(addFact);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.delete("/delete", async (req, res, next) => {
  try {
    const { factId } = req.body;

    const addFact = await Fact.findByPk(factId);

    addFact.destroy();

    res.send({ message: "Fact deleted", addFact });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
