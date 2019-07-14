module.exports = {
    verbose: true,
    setupFiles: [
        "./jestSetup.js"
    ],
    snapshotSerializers: [
        "enzyme-to-json/serializer"
    ],
    moduleNameMapper: {
        "^.+\\.(css|scss|less)$": "identity-obj-proxy",
        "\\.(svg|jpg|png)$": "./empty-module.js"
    },
    transform: {
        "^.+\\.js$": "babel-jest",
    },
	moduleFileExtensions: [
		"js"
	],
	testMatch: [
		"**/test/**/*.(js)"
	]
};