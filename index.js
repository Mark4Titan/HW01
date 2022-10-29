const { Command } = require("commander");
const db = require("./db/contacts");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({
  action,
  id,
  name,
  email,
  phone,
}) {
  switch (action) {
    case "list":
      message(await db.listContacts());
      break;
    case "add":
      message(await db.addContact(name, email, phone));
      break;

    case "remove":
      message(await db.removeContact(id));
      break;

    case "get":
      message(await db.getContactById(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const message = (log) => {
  if (log.params === "table") {
    console.log("code :", log.code);
    console.table(log.data);
  }

  if (log.params === "log") {
    console.log("code :", log.code, " ||  message : (", log.data, ")");
  }
};

invokeAction(argv);
