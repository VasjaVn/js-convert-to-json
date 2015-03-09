
function Node( key, value, typeValue ) {
	
	this.key        = key;
	this.value      = value;
	this.typeValue  = typeValue;
	this.childNodes = new Array();
}


Node.prototype.isNodeExist = function( key ) {
	
	var result = false;
	var len = this.childNodes.length;
	
	for ( var i = 0; i < len; i++ ) {
		if ( key == this.childNodes[i].key ) {
			result = true;
			break;
		}
	}
	return result;
}


Node.prototype.getNode = function( key ) {	
	
	var resultNode = null;
	var len = this.childNodes.length;
	
	for ( var i = 0; i < len; i++ ) {
		if ( key == this.childNodes[i].key ) {
			resultNode = this.childNodes[i];
		}
	}
	return resultNode;	
}


Node.prototype.addNode = function( arr, len, value, typeValue ) {
	
	var	key = arr.shift();

	var newArr = arr;
	var newLen = newArr.length;
	
	if ( this.isNodeExist( key ) ) {
		var nodeParent = this.getNode( key );
		nodeParent.addNode( newArr, newLen, value, typeValue );
	
	} else {
		if ( len == 1 ) {			
			var nodeLeaf = new Node( key, value, typeValue );
			this.childNodes.push( nodeLeaf );
			return;
			
		} else {
			var node = new Node( key, null, null ); 
			this.childNodes.push( node );
			node.addNode( newArr, newLen, value, typeValue );
		}
	}	
}


Node.prototype.fillFromObject = function( obj ) {
		
	for ( var key in obj ) {
	
		var array  = key.split('.');
		var length = array.length;
		var value  = obj[key];
		var typeValue = this.getTypeValue( obj[key] );

		this.addNode( array, length, value, typeValue );
	}
}

Node.prototype.fillFromMap = function( map ) {

	var len = map.length;

	for ( var i = 0; i < len; i++ ) {

		var array  = map[i].key.split('.');
		var length = array.length;
		var value  = map[i].value;
		var typeValue = map[i].typeValue;

		this.addNode( array, length, value, typeValue );
	}
		
}


Node.prototype.getTypeValue = function( value ) {

	if ( value == null ) {
		return "null";

	} else if ( typeof( value) == "boolean") {
		return "boolean";

	} else if ( typeof( value) == "number") {
		return "number";
	
	} else if ( typeof( value) == "string") {
		return "string";
	}
}


Node.prototype.toJSON = function() {

	return this.toJSONHelper() + '\n}';
}


Node.prototype.toJSONHelper = function() {
	
	var result = '{\n';
	var len = this.childNodes.length

	for ( var i = 0; i < len; i++ ) {

		var node = this.childNodes[i];
			
		result += '"' + node.key + '": ';
		
		if ( node.value != null  ) {
			if ( node.typeValue == "string" ) {
				result += '"' + node.value + '"';

			} else {
				result += node.value;
			}
			
			if ( i < (len - 1) ) {
				result += ',\n';
			} 

		} else {
			result += node.toJSONHelper();
			
			if ( i < (len - 1) ) {
				result += '\n},\n\n';	
			} else {
				result += '\n}';
			}
		}
	}
	
	return result;
}
