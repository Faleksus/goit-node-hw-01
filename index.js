const contacts = require("./contacts");
console.log(contacts);
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "choose id")
  .option("-n, --name <type>", "choose name")
  .option("-e, --email <type>", "choose email")
  .option("-p, --phone <type>", "choose phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.table(contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.table(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
