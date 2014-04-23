var lo, authorize, Permit, permitFor, Ability,
    Book, book,
    GuestUser, guestUser,
    GuestPermit, guestPermit,
    user, ability, aBook, currentUser, currentAbility,
    userCan, readBook;

authorize = require('permit-authorize');

Ability = authorize.Ability;
Permit = authorize.Permit;
permitFor = authorize.permitFor;

User = require(./models/user');

GuestUser = function(properties){
  // User prototypical inheritance?
  // guest user constructor code...
}
// all guest users have a role of guest
GuestUser.prototype.role = 'guest';

guestUser = new GuestUser({
  name: 'a guest'
});

guestPermit = permitFor('guest', {

  // Determine when the permit applies
  match: function(access){
      return this.matches(access).user({
        role: 'guest'
  },


  // authorization rules to apply when permit applies
  rules: {
    // context dependent rules (dynamic)
    ctx: {
      area: {
        guest: function(){
          return this.ucan('publish', 'Paper');
        },
        admin: function(){
          return this.ucannot('publish', 'Paper');
        }
      }
    },
    // action rules (dynamic)
    read: function(){
      return this.ucan('read', 'Book');
    },
    write: function(){
      return this.ucan('write', 'Book');
    },
    // default rule always applies for any user, action, subject or context
    // static rules
    'default': function(){
      return this.ucan('read', 'any');
    }
  }
});

// utility functions and constructors...
user = function(name){
  return new User(name);
};

Book = function(properties){
  // book constructor code...
}

book = function(title){
  return new Book(title);
};

ability = function(user){
  return new Ability(user);
};

userCan = function(accessRequest){
  return currentAbility.can(accessRequest);
};

userCannot = function(accessRequest){
  return currentAbility.cannot(accessRequest);
};


readBook = function(user, book){
  // code for user to read the book
};


aBook           = book('some book');
currentUser     = user('kris');
currentAbility  = ability(currentUser);

// Finally, here we go :)

if (userCan({action: 'read', subject: aBook})) {
  readBook(currentUser, aBook);
}

// or using implicit hash in the implied order: action, subject, context

if (userCannot('read', 'Book')) {
  throw new Error("Stupid illiterate user!");
}