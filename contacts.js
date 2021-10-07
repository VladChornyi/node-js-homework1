const fs = require("fs").promises;

const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const contactsList = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  console.table(contactsList.map((contact) => contact));
}

async function getContactById(contactId) {
  const contactsList = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  console.table(
    contactsList.find((contact) => {
      if (contact.id === Number(contactId)) {
        return contact;
      }
    })
  );
}

async function removeContact(contactId) {
  const contactsList = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const filteredList = contactsList.filter((contact) => {
    if (contact.id !== Number(contactId)) {
      return contact;
    }
  });
  fs.writeFile(contactsPath, JSON.stringify(filteredList));
  console.table(filteredList);
}

async function addContact(name, email, phone) {
  const contactsList = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const newId = Math.max(...contactsList.map((contact) => contact.id)) + 1;
  const newContact = {
    id: newId,
    name,
    email,
    phone,
  };
  const newContactsList = [...contactsList, newContact];
  fs.writeFile(contactsPath, JSON.stringify(newContactsList));
  console.table(newContactsList);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
