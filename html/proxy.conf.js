const PROXY_CONFIG = [
  {
    context: [
      "/bootcamp"
    ],
    target: "https://localhost",
    secure: false,
    logLevel: "debug"
  }
];

module.exports = PROXY_CONFIG;
