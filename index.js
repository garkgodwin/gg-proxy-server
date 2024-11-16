const fs = require("fs");
const https = require("https");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Proxy target configuration
const proxyTarget = "http://example.com"; // Replace with your target URL

// Proxy middleware setup
app.use(
  "/api", // Proxy requests starting with /api
  createProxyMiddleware({
    target: proxyTarget,
    changeOrigin: true, // Changes the origin of the host header to the target URL
    secure: false, // If your target uses a self-signed certificate, set to false
  })
);

// SSL options
const sslOptions = {
  key: fs.readFileSync("server.key"), // Path to the private key
  cert: fs.readFileSync("server.cert"), // Path to the certificate
};

// Start HTTPS server
https.createServer(sslOptions, app).listen(443, () => {
  console.log("HTTPS proxy server is running on port 443");
});
