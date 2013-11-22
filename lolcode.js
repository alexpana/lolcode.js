var fs = require("fs");
var inputProgram = "test.lol"
var data = fs.readFileSync(inputProgram, "utf8");

var keywords = [
	// variable declaration
	"I HAS A", "ITZ", 
	// program scope
	"HAI", "KTHXBYE",
	// print to stdout
	"VISIBLE", 
	// read from stdin
	"GIMMEH",
	// comments
	"BTW", "OBTW", "TLDR", 
	// undefined value
	"NOOB",
	// boolean literals
	"WIN", "FAIL",
	// types
	"TROOF", "NUMBR", "NUMBAR", "YARN",
	// operand separator
	"AN",
	// mathematical operators
	"SUM OF", "DIFF OF", "PRODUKT OF", "QUOSHUNT OF", "MOD OF", "BIGGR OF", "SMALLR OF",
	// boolean operators
	"BOTH OF", "EITHER OF", "WON OF", "NOT", "ALL OF", "ANY OF",
	// comparison operators
	"BOTH SAEM", "DIFFRINT",
	// string concatenation
	"SMOOSH", "MKAY",
	// casting
	"MAEK", "A",
	// branching
	"O RLY?", "YA RLY", "MEBBE ", "NO WAI", "OIC",
	// switch
	"WTF?", "OMG", "OMGWTF",
	// looping
	"IM IN YR", "YR", "TIL", "WHILE", "IM OUTTA YR",
	// functions
	"HOW DUZ I", "AN YR", "IF U SAY SO", "FOUND YR", "GTFO"
	];

var next_token = function(input){
	var i = 0;
	var line = 0;
	var column = 0;

	return function(){
		if (i >= input.length){
			return null;
		}

		// skip whitespace
		while( data[i] == " " || data[i] == "\r" || data[i] == "\t") ++i;

		// handle new line
		if (data[i] == "\n"){
			++i;
			return ["EOL"];
		}

		// handle keywords
		for (var ki in keywords){
			keyword = keywords[ki];
			if (data.substr(i, keyword.length) == keyword){
				i += keyword.length;
				return ["KEYWORD", keyword];
			}
		}

		// handle string literals
		if (data[i] == "\"") {
			i += 1;
			var start = i;
			while (data[i] != "\"") ++i;
			var end = i++;
			return ["STR", data.substr(start, end - start)];
		}

		// handle literals, identifiers, etc.
		var start = i;
		var end = start;
		while (i < input.length && data[i] != " " && data[i] != "\r" && data[i] != "\n"){
			i += 1;
		}
		end = i;
		return ["ID", input.substr(start, end - start)];
	}
}(data);

var token = next_token();
while (token != null){
	console.log(token);
	token = next_token();
}