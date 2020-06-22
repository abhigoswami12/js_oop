// Create User(class/ function) with the following properties.
// * [] properties(data):
// * [] name
// * [] id
// * [] password
// * [] noOfProjects
// * [] methods:
// * [] getUsername -> return username
// * [] getPassword -> returns password
// * [] getProjects -> return number of project
// * [] changeUsername -> returns old username
// * [] changePassword -> returns old password
// * [] incrementProject -> returns updated number of projects
// * [] decrementProject -> returns updated number of projects

//1* [] Using function to create object

// function createUser(name, id, password ) {
//   let user =  {
//        name,
//        id,
//        password,
//        noOfProjects: 0,
//        getUsername: function() {
//            return this.name;
//        },
//        getPassword: function() {
//            return this.password;
//        },
//        getProjects: function() {
//            return this.noOfProjects;
//        },
//        incrementProject: function() {
//             this.noOfProjects++;
//            return this.noOfProjects;
//        },
//        decrementProject: function() {
//            this.noOfProjects--;
//            return this.noOfProjects;
//        }
//    }
//    return user;
// }

//2* [] Using Object.create
// var userMethods = {
// getUsername: function () {
//     return this.name;
// },
// getPassword: function () {
//     return this.password;
// },
// getProjects: function () {
//     return this.noOfProjects;
// },

// incrementProject: function () {
//     this.noOfProjects++;
//     return this.noOfProjects;
// },
// decrementProject: function () {
//     this.noOfProjects--;
//     return this.noOfProjects;
// },
// }

// function createUser(name, id, password) {
//     let user = Object.create(userMethods)
//         user.name = name;
//         user.id = id;
//         user.password = password;
//         user.noOfProjects = 0;

//         return user;
// }

//3 * [] Using Pseudoclassical Way
// function CreateUser(name, id, password) {
//     // let user = Object.create(userMethods)
//     this.name = name;
//     this.id = id;
//     this.password = password;
//     this.noOfProjects = 0;
// }

// CreateUser.prototype.getUsername = function () {
//     return this.name;
// };
// CreateUser.prototype.getPassword = function () {
//     return this.password;
// };
// CreateUser.prototype.getProjects = function () {
//     return this.noOfProjects;
// };

// CreateUser.prototype.incrementProject = function () {
//     this.noOfProjects++;
//     return this.noOfProjects;
// };
// CreateUser.prototype.decrementProject = function () {
//     this.noOfProjects--;
//     return this.noOfProjects;
// };

//4 * [] Using Class
class CreateUser {
  // DATA
  constructor(name, id, password) {
    this.name = name;
    this.id = id;
    this.password = password;
    this.noOfProjects = 0;
  }

  // METHODS
  getUsername() {
    return this.name;
  }
  getPassword() {
    return this.password;
  }
  getProjects() {
    return this.noOfProjects;
  }

  incrementProject() {
    this.noOfProjects++;
    return this.noOfProjects;
  }
  decrementProject() {
    this.noOfProjects--;
    return this.noOfProjects;
  }
}

let ashik = new CreateUser("Ashik", 78, "abhishek");
console.log(ashik);
console.log(ashik.name);
console.log(ashik.id);
console.log(ashik.password);
console.log(ashik.noOfProjects);
console.log(ashik.getUsername());
console.log(ashik.getPassword());
console.log(ashik.getProjects());
console.log(ashik.incrementProject());
console.log(ashik.incrementProject());
console.log(ashik.decrementProject());
console.log(ashik.decrementProject());
