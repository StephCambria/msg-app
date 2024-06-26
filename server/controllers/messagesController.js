const messageModel = require("../model/messageModel");

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to, _id],
        },
      })
      .sort({ updatedAt: 1 })
     // .filter({ _id });

    const projectedMessages = messages.map((msg) => {
      return {
        //fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      //sender: from,
    });
    if (data) return res.json({ msg: "Message added!" });
    return res.json({ msg: "Unable to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
