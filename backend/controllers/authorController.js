// controllers/authorController.js
const Author = require("../models/authorModel");

exports.getAuthors = async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
};

exports.createAuthor = async (req, res) => {
  const newAuthor = await Author.create(req.body);
  res.status(201).json(newAuthor);
};

exports.updateAuthor = async (req, res) => {
  const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedAuthor);
};

exports.deleteAuthor = async (req, res) => {
  await Author.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
