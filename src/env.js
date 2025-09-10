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
      USERINQUIRE: "/api/userpnlx/user-inquire",
    },

    ADMIN: {
      ADMINLOGIN: "/api/adminpnlx/admin-login",
      SENDOTP: "/api/adminpnlx/sendotp",
      VERIFYOTP: "/api/adminpnlx/verifyotp",
    },
    BLOG:"/api/adminpnlx/blogs",
    SINGLEBLOG:"/api/adminpnlx/show-blogs",
    DELETEBLOG:"/api/adminpnlx/delete-blog"
  },
};

export default constant;
