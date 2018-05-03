window.onload = function (){

	const canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
		//represent orgin:
		const y_0 = height *.5, x_0 = width*.5; 

	const dist = (p1,p2) =>  Math.sqrt(Math.pow(p2[0] - p1[0],2) +  Math.pow( p2[1] - p1[1],2))

	const kissing = (n,r, alpha, color) => {//number of circles, radius they lie on
		const delta = 2*Math.PI/n+alpha, 
		//distance between two kissing with centers on same circle
		r0 = dist([x_0+r*Math.sin(0),y_0+r*Math.cos(0)], [x_0+r*Math.sin(delta),y_0+r*Math.cos(delta)])/2 
		let theta = 0
		for(let i = 0; i<n;i++){
			theta += delta; 
			ctx.beginPath();
			ctx.arc(x_0+r* Math.sin(theta),y_0+r * Math.cos(theta),r0,0,Math.PI*2, false);
			ctx.strokeStyle = "green" 
			ctx.stroke();
		}
		//return [r+r0,r0]
	}

	class Ring {
		constructor(numCirc, distOrgin, initAngle,color) {
			this.n = numCirc
			this.r = distOrgin 
			this.theta = initAngle
			this.color = color
		}	
		draw(newAng){
			this.theta = newAng
			kissing(this.n,this.r,newAng,"black")	
		}
	}

	let animArr = []
	let angle = 0;
		for(let k = 15; k<30; k++){
			animArr.push(new Ring(k,65,angle,"black"))
		//	kissing(k,65,angle, "black")
		//	console.log(k, newR,x)
			for(j = 0; j< height; j+=50){ 
				animArr.push(new Ring(k,100+j,angle,"black")) 
			}
		}
	const go = () => { ticks = 0; setInterval(animate,300)}
	const animate = () => {
	//	const startTime = performance.now();
		ticks++
		ctx.clearRect(0,0,width,height)
		animArr.forEach( el => el.draw(angle+ticks*Math.PI/360)) 
	      //const duration = performance.now() - startTime;
              //console.log(`someMethodIThinkMightBeSlow took ${duration}ms`,ticks);
	}
	go()
}
