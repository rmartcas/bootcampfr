const PROXY_CONFIG = [
  {
    context: [
      "/poc"
    ],
    target: "https://localhost",
    secure: false,
    logLevel: "debug"
  }
];

module.exports = PROXY_CONFIG;
