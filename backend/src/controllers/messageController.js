import User from "../model/userModel.js";
import Message from "../model/messageModel.js";

export const contactsForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.User._id;
    const users = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password",
    );

    if (users) res.status(200).json(users);
  } catch (error) {
    console.log("Error in contactsForSidebar", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getMessages = async (req, res) => {
  const receiverId = req.params._id;
  const senderID = req.User._id;

  try {
    const messages = Message.find({
      $or: [
        { senderId: senderID, receiverId: receiverId },
        { senderId: receiverId, receiverId: receiverId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller", error.message);
    res.status(400).json({ message: "Invalid userId" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const senderID = req.User._id;
    const receiverId = req.params._id;

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
    });
    await newMessage.save();
    if (newMessage) res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
