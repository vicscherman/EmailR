const  {createProxyMiddleware}  = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};

//***Do not add changeOrigin: true to your proxy script, it will completely break our redirects!***