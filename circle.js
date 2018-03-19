//import "circles_intersect.js"
window.onload = function (){
	var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
	var y_0= height *.5, x_0 = width*.5;

	var dist = (p1,p2) =>  Math.sqrt(Math.pow(p2[0] - p1[0],2) +  Math.pow( p2[1] - p1[1],2))

	function kissing(n,r){
//	ctx.clearRect(0,0,width,height);
	const delta = 2*Math.PI/n, r0 = dist([x_0+r*Math.sin(0),y_0+r*Math.cos(0)], [x_0+r*Math.sin(delta),y_0+r*Math.cos(delta)])/2
        let theta = 0
	for(let i = 0; i<n;i++){
		theta += delta; 
		ctx.beginPath();
		ctx.arc(x_0+r* Math.sin(theta),y_0+r * Math.cos(theta),r0,0,Math.PI*2, false);
		ctx.fill();
	}
	}
kissing(20,100)
}

