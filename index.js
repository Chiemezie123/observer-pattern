class Telephone {
    constructor() {
      this.phoneBook = [];
      this.observers = new Set();
    }
    addContact(name = "no name", number = "no number") {
      let isContactInPhoneBook = false;
      this.phoneBook.forEach((contact) => {
        if (contact.name.toLowerCase() === name || contact.number === number) {
          isContactInPhoneBook = true;
          // console.log("Contact is already in Phonebook");
        }
      });
      if (!isContactInPhoneBook) {
        this.phoneBook.push({ name: name, number: number });
      }
    }
    removeContact(nameOrNumber) {
      this.phoneBook.forEach((contact, index) => {
        if (
          contact.name.toLowerCase() === nameOrNumber.toLowerCase() ||
          contact.number === nameOrNumber
        ) {
          this.phoneBook.splice(index, 1);
        }
      });
    }
    dialContact(nameOrNumber) {
      let isContactFound = false;
      this.phoneBook.forEach((contact) => {
        if (
          contact.name.toLowerCase() === nameOrNumber.toLowerCase() ||
          contact.number === nameOrNumber
        ) {
          isContactFound = true;
          this.notifyObserver({
            type: "Dialing",
            context: "a number is being dialed",
            payload: contact,
          });
        }
      });
      if (!isContactFound) {
        console.log(`${nameOrNumber} is NOT in Phonebook`);
      }
      console.log("");
    }
    addObserver(observer) {
      this.observers.add(observer);
    }
    removeObserver(observer) {
      this.observers.delete(observer);
    }
    notifyObserver(context) {
      for (let observer of this.observers) observer.notify(context);
    }
  }
  
  //Creating the observer class
  class TelephoneObserver {
    constructor(action) {
      this.action = action;
    }
    notify(context) {
      //destructuring payload and type from the context object
      // {type: "Dialing",context: "a number is being dialed",payload: contact,}
      let { type, payload } = context;
      // console.log(payload)
      if (this.action == "printNumber") {
        console.log(`${payload.name} ${payload.number}`);
      } else if (this.action == "printDialingNumber") {
        console.log(`${type} ${payload.name} ${payload.number}`);
      }
    }
  }
  
  //instantiating the two instances of the observer class
  const printNumberObserver = new TelephoneObserver("printNumber");
  const printDialingNumberObserver = new TelephoneObserver("printDialingNumber");
  
  //instantiating the instance of the subject class
  const Techno = new Telephone();
  
  //adding the observers to the subject
  Techno.addObserver(printNumberObserver);
  Techno.addObserver(printDialingNumberObserver);
  
  //adding contacts to the phonebook
  Techno.addContact("James", "08037806428");
  Techno.addContact("Somto", "08063191313");
  Techno.addContact("Sarah", "08144141249");
  Techno.addContact("Ben", "07174129251");
  console.log(Techno.phoneBook)
  
  //Removing contacts
  Techno.removeContact("08037806428");
  Techno.removeContact("BEN");
  
  //Dialing contacts
  Techno.dialContact("James");
  Techno.dialContact("Somto");
  Techno.dialContact("08144141249");
  Techno.dialContact("Ben");
  Techno.dialContact("Chinedu");