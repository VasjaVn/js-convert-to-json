var idTimer;

function moveDivJson() {
	
	var widthDiv = 200;
	var widthWindow = window.innerWidth - widthDiv;
	var divJsonStyle = document.getElementById('jsonID').currentStyle || window.getComputedStyle(document.getElementById('jsonID'), null);
	var styleLeft = parseInt( divJsonStyle.left );
	styleLeft += 20;
	
	if ( styleLeft + widthDiv > widthWindow ) {
		styleLeft = 0;
	}
	
	document.getElementById('jsonID').style.left = styleLeft + 'px';
	idTimer = setTimeout( moveDivJson, 200 );
}

function stopDivJson() {
	clearTimeout( idTimer );
}