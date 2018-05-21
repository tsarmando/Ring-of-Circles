window.onload = function (){

	const canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
		//represent orgin:
	const y_0 = height *.5, x_0 = width*.5; 

	const dist = (pnt1,pnt2) =>  Math.sqrt(Math.pow(pnt2[0] - pnt1[0],2) +  Math.pow( pnt2[1] - pnt1[1],2))

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF'.split('')
		let color = '#'
		for(let i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 15)]
		}
		return color
				
	}

	const kissing = (n,r, alpha, color) => {
		const delta = 2*Math.PI/n, 
		r0 = dist([x_0+r*Math.sin(0),y_0+r*Math.cos(0)], [x_0+r*Math.sin(delta),y_0+r*Math.cos(delta)])/2 
		let theta = 0
		//let fill = getRandomColor()
		for(let i = 0; i<n;i++){
			theta += delta
			ctx.beginPath()
			ctx.arc(x_0+r* Math.sin(theta*alpha),y_0+r * Math.cos(theta*alpha),r0,0,Math.PI*2, false)
			ctx.fillStyle = color
			ctx.fill()
		}
		//return [r+r0,r0] r+r0 - checkRadius(n+1,r+r0+x) < tol 
	}

	const checkRadius = (n, r) => { //Checks measure of new radius 
		const delta = 2*Math.PI/n
		return dist([x_0+r*Math.sin(0),y_0+r*Math.cos(0)], [x_0+r*Math.sin(delta),y_0+r*Math.cos(delta)])/2 
	}

	const secantMethod = (n, guess, fixedPt, tol = .0000000000001, iterations=10) => {
		if(Math.abs(guess-checkRadius(n,guess)-fixedPt) <  tol) 
			return [n,guess]
		else{
			let g = (x) => x-checkRadius(n,x)-fixedPt
			let p0 = guess, q0 = g(p0),p1 =  guess+fixedPt/2, q1 = g(p1) 

			for(let i = 0; i<iterations; i++){
				let p = p1-q1*(p1-p0)/(q1-q0)	
				if(p-p1<tol) 
					return [n, p]
				else{
					p0 = p1
					q0 = q1
					p1 = p
					q1 = g(p)
				}
			
			}
		return "failure"
		}
	}

	class Ring {
		constructor(numCirc, distOrgin, initAngle = 0,color,i) {
			this.n = numCirc
			this.r = distOrgin 
			this.theta = initAngle
			this.color = color
			this.outer = this.r+checkRadius(this.n,this.r)
			this.posNeg=Math.pow(-1,i)
		}	
		draw(newAng){
			kissing(this.n,this.r,this.posNeg*newAng,this.color)
		}
		getProps(){
			return [this.n,this.r,this.theta,this.color, this.outer]
		}
	}

	let animArr = []
	let angle = 0;
	let circPacked = []
	circPacked.push(new Ring(15,35))
	for(let i = 0; i<25;i++)
	{
		let props= circPacked[i].getProps()
		let nextCirc = secantMethod(props[0]+5,props[1]+props[4],props[4])
		if(nextCirc == "failure")
			nextCirc = secantMethod(props[0]+11,props[4]+props[1],props[4])
		circPacked.push(new Ring(nextCirc[0],nextCirc[1],0,getRandomColor(),i))
	
	}
	console.log(circPacked)
	circPacked.forEach(el => el.draw(0))
	//const go = () => { steps= 0; setInterval(animate,400)}//50-100ms good?
	let steps = 0
	const animate = () => {
		steps++
		ctx.clearRect(0,0,width,height)
		circPacked.forEach( el => el.draw((steps)*16.65/80*Math.PI/180)) 
		window.requestAnimationFrame(animate)
	}
	animate()
//	go()
}
