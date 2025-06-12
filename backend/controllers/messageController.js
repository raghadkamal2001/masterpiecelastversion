// controllers/messageController.js
const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'فشل في إرسال الرسالة' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'فشل في جلب الرسائل' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'تم الحذف بنجاح' });
  } catch (error) {
    res.status(500).json({ error: 'فشل في حذف الرسالة' });
  }
};
