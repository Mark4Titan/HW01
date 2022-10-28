const fs = require("fs").promises;
const path = require("path");
const contactsDbPath = path.join(__dirname, "./contacts.json");
const { v4: IdGenerator } = require("uuid");

// усі контакти
async function listContacts() {
  const dbRow = await fs.readFile(contactsDbPath);
  const db = JSON.parse(dbRow);

  return { data: db, code: 200, params: "table" };
}

// пошук по id контакту
async function getContactById(contactId) {
  if (!contactId) return { data: "no id", code: 404, params: "log" };
  const contacts = (await listContacts()).data;

  const getСontactId = contacts.find((item) => item.id === contactId);
  if (!getСontactId) return { data: "id not found", code: 404, params: "log" };
  const contact = contacts.filter((item) => item.id === contactId);

  return { data: contact, code: 200, params: "table" };
}

// видалення контакту
async function removeContact(contactId) {
  if (!contactId) return { data: "no id", code: 400, params: "log" };
  const contacts = (await listContacts()).data;

  const foundСontactId = contacts.find((item) => item.id === contactId);
  if (!foundСontactId)
    return { data: "id not found", code: 400, params: "log" };
  const nevContacts = contacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsDbPath, JSON.stringify(nevContacts));

  return { data: foundСontactId, code: 202, params: "table" };
}

// додавання контакту
async function addContact(name, email, phone) {
  if (!name.trim() || !phone.trim())
    return { data: "Invalid name or phone number", code: 400, params: "log" };
  const newId = IdGenerator();
  const nevContact = { id: newId, name, email, phone };

  const contacts = (await listContacts()).data;
  contacts.push(nevContact);
  await fs.writeFile(contactsDbPath, JSON.stringify(contacts));

  return { data: nevContact, code: 201, params: "table" };
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
