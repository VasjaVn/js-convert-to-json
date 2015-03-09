
var mapArray = new Array();


function Map(key, value, typeValue) {

	this.key = key;
	this.value = value;
	this.typeValue = typeValue;
}


function isKeyExist( key ) {

	var result = false;
	
	for( var i = 0; i < mapArray.length; i++ ) {		
		if( key == mapArray[i].key ) {
			alert("Key \"" + key + "\" is exist!!!\nPlease enter unique key!");
			result = true;
			break;
		}
	}
	
	return result;
}


function isSubKeyExistHelper( subKey, Key ) {

	var result = false;
	var count = 0;

	var i = 0;
	while ( i < subKey.length ) {
		
		if ( subKey[i] == Key[i] ) {
			count++;
		}
		i++;
	}
	
	if ( count == subKey.length ) {
		result = true;
	}
	
	return result;
}


function isSubKeyExist( key ) {
	
	var result = false;
	
	var subKey;
	var Key;
	
	var i = 0;
	while ( i < mapArray.length ) {
	
		if ( key.length < mapArray[i].key.length ) {
			subKey = key;
			Key = mapArray[i].key;
			
		} else {
			subKey = mapArray[i].key;
			Key = key;
		}
		
		if ( isSubKeyExistHelper( subKey.split('.'), Key.split('.') ) ) {
			alert("\"" + subKey + "\" is sub key for key \"" + Key + "\"!!!\nPlease enter another key!");
			result = true;
			break;
		}
		
		i++;		
	}
	
	return result;
}


function isKeyCorrect( key ) {

	var result = true;
	
	if ( key.length == 0 ) {
		alert("You enter empty key!!!");
		result = false;
		
	} else if ( key[0].match(/[a-z]/) == null || key.match(/\s|[,]/) !=  null || key.charAt(key.length - 1) == '.'  ) {
		alert("You enter incorrect key: \"" + key + "\"!!!");
		result = false;
	}
	
	return result;
}


function validateKey( key ) {
	
	var result = true;

	if ( isKeyCorrect( key ) ) {
		if ( isKeyExist( key ) || isSubKeyExist( key ) ) {
			result = false;
		}
	} else {
		result = false;
	}
	
	return result;
}


function validateValue( value ) {

	var result = true;
	
	if ( value.length == 0 || value.match(/\s/) !=  null ) {
		alert("You enter empty value!!!");
		result = false;
	}
	
	return result;

}


function addKeyValue() {
	
	var key   = form.txtKey.value;
	var value = form.txtValue.value;
	var typeValue = getTypeValue( value );
	
	if ( validateKey(key) ) {
		var map = new Map( key, value, typeValue );
		mapArray.push( map );
		
		var text = form.textKV.value + "\n" + key + ": " + value;
		form.textKV.value = text;
	}
}


function isNull( value ) {

	var result = false;

	if ( value == "null" ) {
		result = true;
	}

	return result;
}


function isBoolean( value ) {

	var result = false;

	if ( value == "true" || value == "false" ) {
		result = true;
	}

	return result;
}


function isNumber( value ) {
	
	var result = false;
	
	var intN = value.match(/^\d+$/);
	var floatN = value.match(/^[+-]?((\d+(\.\d*)?)|(\.\d+))([Ee][+-]?\d+)?$/);
	
	if ( ( intN != null ) || ( floatN != null ) ) {
		result = true;
	}
	
	return result;
}

function getTypeValue( value ) {

	if ( isNull(value) ) {
		return "null";

	} else if ( isBoolean(value) ) {
		return "boolean";

	} else if ( isNumber(value) ) {
		return "number";
	
	} else {
		return "string";
	}
}


function eraseForm() {
	
	var len = mapArray.length;
	for ( var i = 0; i < len; i++ ) {
		mapArray.pop();
	}
}

function convertToJsonAndShow() {
	
	var json = convertToJSON();
	showWindowWithJSON( json );
}

function convertToJSON() {
	
	var tree = new Node( "root", null, null );
	tree.fillFromMap( mapArray );
	var json = tree.toJSON();
	return json;
}

function showWindowWithJSON( json ) {
	
	var winJSON = window.open("", "", "width=400, height=400");
	winJSON.document.open();
	winJSON.document.write("<html>");
	winJSON.document.write("<head>");
    winJSON.document.write("<title>JSON Format</title>");
    winJSON.document.write("</head>");
    winJSON.document.write("<body>");
	winJSON.document.write( "<center>" );	
	winJSON.document.write("<input type='button' value='Close' onClick='javascript: self.close()'>");
	winJSON.document.write( "</center>" );	
	winJSON.document.write( "<hr>" );	
	winJSON.document.write( "<pre>" );
	winJSON.document.write( json );
	winJSON.document.write( "</pre>" );
	winJSON.document.write( "<hr>" );	
    winJSON.document.write("</body>");
    winJSON.document.write("</html>");
	winJSON.document.close();
}
