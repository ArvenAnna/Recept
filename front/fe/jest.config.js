module.exports = {
    verbose: true,
    setupFiles: [
        "./test/jestSetup.js"
    ],
    snapshotSerializers: [
        "enzyme-to-json/serializer"
    ],
    moduleNameMapper: {
        "^.+\\.(css|scss|less)$": "identity-obj-proxy",
        "\\.(svg|jpg|png)$": "<rootDir>/empty-module.js"
    },
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.jsx$": "babel-jest"
    }
};