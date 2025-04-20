module.exports = {
  transformIgnorePatterns: [
    // Transform all node_modules except Tone.js
    "node_modules/(?!(tone)/)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    // Handle CSS imports (if you're using CSS modules)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Handle file imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testEnvironment: "jsdom",
};
