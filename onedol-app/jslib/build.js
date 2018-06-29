{
    baseUrl: "",
    dir: "",
    optimize: "uglify2",
    uglify2: {
	  mangle: false //false 不混淆变量名
	},
    mainConfigFile: "main.js",
	findNestedDependencies: true,
	name: "main",
	out: "main-build.js",
}