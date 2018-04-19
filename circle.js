//import "circles_intersect.js"
window.onload = function (){
	var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
	var y_0= height *.5, x_0 = width*.5; //represents orgin

	var dist = (p1,p2) =>  Math.sqrt(Math.pow(p2[0] - p1[0],2) +  Math.pow( p2[1] - p1[1],2))

	function kissing(n,r){
//	ctx.clearRect(0,0,width,height);
	const delta = 2*Math.PI/n, r0 = dist([x_0+r*Math.sin(0),y_0+r*Math.cos(0)], [x_0+r*Math.sin(delta),y_0+r*Math.cos(delta)])/2
        let theta = 0
	for(let i = 0; i<n;i++){
		theta += delta; 
		ctx.beginPath();
		ctx.arc(x_0+r* Math.sin(theta),y_0+r * Math.cos(theta),r0,0,Math.PI*2, false);
		ctx.stroke();
	}
	return r0
	}
//kissing(20,kissing(2,25)+27)
kissing(2,40)
//kissing(3,75)

//kissing(4,100)
//kissing(5,120)
kissing(300,500)
}

