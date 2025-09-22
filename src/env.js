const constant = {
  USER: "",
  EMAIL_ID: "",

  COOKIE: {
    HEADER: "@#$%^AZ##",
  },

  ROUTES: {
    INDEX: "/",
    // add more routes here
  },

   BASE_URL: "https://stage.digibima.com/public",

  API: {
    USER: {
      SENDOTP: "/api/sendotp",
      VERIFYOTP: "/api/verifyotp",
       PINCODE: "/api/acpincode",
      USERINQUIRE: "/api/userpnlx/user-inquire",
      USERLOGIN: "/api/motor/vehicle-type-select",
    },

    ADMIN: {
      ADMINLOGIN: "/api/adminpnlx/admin-login",
      SENDOTP: "/api/adminpnlx/sendotp",
      VERIFYOTP: "/api/adminpnlx/verifyotp",
    },
    BLOG:"/api/adminpnlx/blogs",
    SINGLEBLOG:"/api/adminpnlx/show-blogs",
    DELETEBLOG:"/api/adminpnlx/delete-blog",
    TRASHBLOG:"/api/adminpnlx/trash-blog"
  },
};

export default constant;
