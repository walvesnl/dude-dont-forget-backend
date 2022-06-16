const { Router } = require("express");
const router = new Router();
const Event = require("../models").event;
const Partners = require("../models").partner;
const authMiddleware = require("../auth/middleware");

router.post("/addNew", authMiddleware, async (req, res, next) => {
  try {
    const { title, startDate, interval, partnerId } = req.body;

    const addEvent = await Event.create({
      title,
      startDate,
      interval,
      partner_id: partnerId,
    });

    const user = req.user;

    const partners = await Partners.findAll({
      where: { user_id: user.id },
      include: { model: Event },
    });

    console.log(partners);

    res.send(partners);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res, next) => {
  try {
    const eventId = req.params.id;
    console.log("ID", eventId);

    const addEvent = await Event.findByPk(parseInt(eventId));

    addEvent.destroy();

    const user = req.user;

    const partners = await Partners.findAll({
      where: { user_id: user.id },
      include: { model: Event },
    });

    res.send({ message: "Event deleted", addEvent, partners });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
