"use strict";
const Account = require("../model-components/accountModelComponent");
// const StudentAccount = require("../model-components/studentModelComponent");
// const FacultyAccount = require("../model-components/facultyModelComponent");
// const AdminAccount = require("../model-components/adminModelComponent");

// const findByEmail = (req, res) => {
//   simultaneouslyQueryEmail(req, function (status) {
//     res(status);
//   });
// };

// //Attemps to find email first on student table then goes to faculty table
// const simultaneouslyQueryEmail = (req, res) => {
//   Account.findByEmail(req, function (err, account) {
//     if (err) {
//       res.send(err);
//     }
//     if (Object.keys(account).length !== 0) {
//       res(409);
//     }
//   });
// };

//   const findByAccountId = (req, res) => {
//     simultaneouslyQueryAccountID(req, function (status) {
//       res(status);
//     });
//   };

//   //Attemps to find email first on student table then goes to faculty table
//   const simultaneouslyQueryAccountID = (req, res) => {
//     Account.findByAccountId(req, function (err, account) {
//       if (err) {
//         res.send(err);
//       }
//       if (Object.keys(account).length !== 0) {
//         res(409);
//       }
//     });
//   };

exports.signup = function (req, res) {
  const newAccount = new Account(req.body);
  //handles null error
  // console.log(newAccount["email"]);
  Account.findByEmail(newAccount["email"], function (err, email) {
    console.log(email.length);
    if (email.length === 0) {
      Account.createAccount(newAccount, function (err, accountId) {
        if (err) {
          res.send(err);
        }
        res.json({
          error: false,
          status: 200,
          message:
            newAccount.name + "'s account has been successfully created.",
          data: accountId,
        });
      });
    } else {
      res.status(409).send({error: true, message: "Email already exists."});
    }
  });
};

// exports.findById = function (req, res) {
//   Account.findById(req.params.accountId, function (err, account) {
//     if (err) {
//       res.send(err);
//     }
//     if (Object.keys(account).length !== 0) {
//       res.json({ status: 200, data: account });
//     } else {
//       res.json({ status: 404 });
//     }
//   });
// };

// const simultaneouslyQueryEmail = (req, res) => {
//   StudentAccount.findByEmail(req, function (err, account) {
//     if (err) {
//       res.send(err);
//     }
//     if (Object.keys(account).length !== 0) {
//       res(409);
//     } else {
//       FacultyAccount.findByEmail(req, function (err, account) {
//         if (err) {
//           res.send(err);
//         }
//         if (Object.keys(account).length !== 0) {
//           res(409);
//         } else {
//           res(200);
//         }
//       });
//     }
//   });
// };

exports.login = function (req, res) {
  Account.findByEmailAndPassword(
    req.body.email,
    req.body.password,
    function (err, count, accountId, name, email) {
      if (err) {
        res.status(err.statusCode).json({success: false});
      } else if (count > 0) {
        res.status(200).json({success: true, accountId, name, email});
      } else {
        res.status(404).json({success: false});
      }
    }
  );
};

// const findByEmail = (req, res) => {
//   simultaneouslyQueryEmail(req, function (status) {
//     res(status);
//   });
// };

// //Attemps to find email first on student table then goes to faculty table
// const simultaneouslyQueryEmail = (req, res) => {
//   StudentAccount.findByEmail(req, function (err, account) {
//     if (err) {
//       res.send(err);
//     }
//     if (Object.keys(account).length !== 0) {
//       res(409);
//     } else {
//       FacultyAccount.findByEmail(req, function (err, account) {
//         if (err) {
//           res.send(err);
//         }
//         if (Object.keys(account).length !== 0) {
//           res(409);
//         } else {
//           res(200);
//         }
//       });
//     }
//   });
// };

// const findByAccountId = (req, res) => {
//   simultaneouslyQueryAccountID(req, function (status) {
//     res(status);
//   });
// };

// //Attemps to find email first on student table then goes to faculty table
// const simultaneouslyQueryAccountID = (req, res) => {
//   StudentAccount.findByAccountId(req, function (err, account) {
//     if (err) {
//       res.send(err);
//     }
//     if (Object.keys(account).length !== 0) {
//       res(409);
//     } else {
//       FacultyAccount.findByAccountId(req, function (err, account) {
//         if (err) {
//           res.send(err);
//         }
//         if (Object.keys(account).length !== 0) {
//           res(409);
//         } else {
//           res(200);
//         }
//       });
//     }
//   });
// };

// exports.create = function (req, res) {
//   var x = req.body["userType"] === "student" ? StudentAccount : FacultyAccount;
//   const newAccount = new x(req.body);
//   //handles null error
//   // console.log(req.body);
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({error: true, message: "Please provide all required field"});
//   } else {
//     findByEmail(newAccount["email"], function (status) {
//       if (status === 200) {
//         findByAccountId(newAccount["id"], function (status) {
//           if (status === 200) {
//             x.createAccount(newAccount, function (err, accountId) {
//               if (err) {
//                 res.send(err);
//               }
//               res.json({
//                 error: false,
//                 status: 200,
//                 message: "New record has successfully been added.",
//                 data: accountId,
//               });
//             });
//           } else {
//             res.status(409).send({error: true, message: "ID already exists."});
//           }
//         });
//       } else {
//         res.status(409).send({error: true, message: "Email already exists."});
//       }
//     });
//   }
// };

// exports.retrieveAccounts = function (req, res) {
//   var x = req.body["userType"] === "student" ? StudentAccount : FacultyAccount;
//   console.log(req.body);
//   x.retrieveAllAccounts(function (err, post) {
//     if (err) {
//       res.send(err);
//     }
//     console.log("res", post);
//     res.send({status: 200, data: post});
//   });
// };

// // exports.findById = function (req, res) {
// //   Account.findById(req.params.accountId, function (err, account) {
// //     if (err) {
// //       res.send(err);
// //     }
// //     if (Object.keys(account).length !== 0) {
// //       res.json({ status: 200, data: account });
// //     } else {
// //       res.json({ status: 404 });
// //     }
// //   });
// // };

// // const simultaneouslyQueryEmail = (req, res) => {
// //   StudentAccount.findByEmail(req, function (err, account) {
// //     if (err) {
// //       res.send(err);
// //     }
// //     if (Object.keys(account).length !== 0) {
// //       res(409);
// //     } else {
// //       FacultyAccount.findByEmail(req, function (err, account) {
// //         if (err) {
// //           res.send(err);
// //         }
// //         if (Object.keys(account).length !== 0) {
// //           res(409);
// //         } else {
// //           res(200);
// //         }
// //       });
// //     }
// //   });
// // };

// exports.login = function (req, res) {
//   StudentAccount.findByEmailAndPassword(
//     req.body.email,
//     req.body.password,
//     function (err, count, accountId, userType, name, role) {
//       if (err) {
//         res.status(err.statusCode).json({success: false});
//       } else if (count > 0) {
//         res.status(200).json({success: true, accountId, userType, name, role});
//       } else {
//         FacultyAccount.findByEmailAndPassword(
//           req.body.email,
//           req.body.password,
//           function (err, count, accountId, userType, name, role) {
//             if (err) {
//               res.status(err.statusCode).json({success: false});
//             } else if (count > 0) {
//               res
//                 .status(200)
//                 .json({success: true, accountId, userType, name, role});
//             } else {
//               AdminAccount.findByEmailAndPassword(
//                 req.body.email,
//                 req.body.password,
//                 function (err, count, accountId, userType, name, role) {
//                   if (err) {
//                     res.status(err.statusCode).json({success: false});
//                   } else if (count > 0) {
//                     res
//                       .status(200)
//                       .json({success: true, accountId, userType, name, role});
//                   } else {
//                     res
//                       .status(401)
//                       .json({success: false, message: "Invalid credentials"});
//                   }
//                 }
//               );
//             }
//           }
//         );
//       }
//     }
//   );
// };

// exports.disableAccount = (req, res) => {
//   var x = req.body["userType"] === "student" ? StudentAccount : FacultyAccount;
//   console.log(req.body);
//   x.disableAccount(req.body.accountId, (err, data) => {
//     if (err) {
//       res.json({err});
//     } else {
//       res.json({status: 200, data});
//     }
//   });
// };

// exports.updateAccount = (req, res) => {
//   var x = req.body["userType"] === "student" ? StudentAccount : FacultyAccount;
//   const data = req.body;
//   const dataJson =
//     data.userType === "student"
//       ? {
//           id: data.id,
//           name: data.name,
//           course: data.course,
//           role: data.role,
//           email: data.email,
//         }
//       : {
//           id: data.id,
//           name: data.name,
//           role: data.role,
//           email: data.email,
//         };
//   if (data.oldEmail !== data.email) {
//     findByEmail(data.email, function (status) {
//       if (status === 200) {
//         updateAccount(data.accountId, x, dataJson, res);
//       } else {
//         res.status(409).send({error: true, message: "Email already exists."});
//       }
//     });
//   } else {
//     updateAccount(data.accountId, x, dataJson, res);
//   }
// };

// function updateAccount(accountId, x, dataJson, res) {
//   x.updateAccount(accountId, dataJson, function (err, account) {
//     if (err) {
//       res.send(err);
//     }
//     res.json({
//       error: false,
//       status: 200,
//       message: "Account information has been updated.",
//       data: account,
//     });
//   });
// }

// exports.findById = function (req, res) {
//   var x = req.body["userType"] === "student" ? StudentAccount : FacultyAccount;
//   console.log(req.body);
//   x.findById(req.body.accountId, function (err, account) {
//     if (err) {
//       res.send(err);
//     }
//     if (Object.keys(account).length !== 0) {
//       res.json({status: 200, data: account});
//     } else {
//       res.json({status: 404});
//     }
//   });
// };
