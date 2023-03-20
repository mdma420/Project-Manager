module.exports = {
  getUserame: function (user) {
    return user.username;
  },
  getPassword: function (user) {
    return user.password;
  },
  getFullname: function (user) {
    return user.fullname;
  },
  getEmail: function (user) {
    return user.email;
  },
  getPhone: function (user) {
    return user.phone;
  },
  // ifeq: function (user, y, options) {
  //   // console.log(user)
  //   var currentRole = user == undefined ? "" : user.role;
  //   // console.log(currentRole)
  //   // console.log(y)
  //   if (currentRole === y) {
  //     return options.fn(this);
  //   } else {
  //     return options.inverse(this);
  //   }
  // },
};
