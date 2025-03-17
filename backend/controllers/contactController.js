import Contact from "../models/Contact.js";
import asyncHandler from "express-async-handler";

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getContacts = asyncHandler(async (_req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json(contacts);
});

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Public
const createContact = asyncHandler(async (req, res) => {
  const { name, phone, address } = req.body;

  if (!name || !phone || !address) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if phone number is valid (10 digits)
  if (!/^\d{10}$/.test(phone)) {
    res.status(400);
    throw new Error("Phone number must be exactly 10 digits");
  }

  const contact = await Contact.create({
    name,
    phone,
    address,
  });

  res.status(201).json(contact);
});

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const { phone } = req.body;
  if (phone && !/^\d{10}$/.test(phone)) {
    res.status(400);
    throw new Error("Phone number must be exactly 10 digits");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedContact);
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await contact.deleteOne();

  res.status(200).json({ id: req.params.id });
});

export { getContacts, getContact, createContact, updateContact, deleteContact };
