const { Router } = require("express");
const router = new Router();
const Event = require("../models").event;

router.post("/addNew", async (req, res, next) => {
  try {
    const { title, startDate, interval, partnerId } = req.body;

    const addEvent = await Event.create({
      title,
      startDate,
      interval,
      partner_id: partnerId,
    });

    res.send(addEvent);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.delete("/delete", async (req, res, next) => {
  try {
    const { eventId } = req.body;

    const addEvent = await Event.findByPk(eventId);

    addEvent.destroy();

    res.send({ message: "Event deleted", addEvent });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
