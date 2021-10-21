
const canvas = document.querySelector('#canvas');
const victory = document.querySelector('.victory');
const title = document.querySelector('.title');
const btn = document.querySelector('.btn');
const portraitStep = document.querySelector('.player-step');
const machineStep = document.querySelector('.machine-step');
const portraitTime = document.querySelector('.player-time');
const machineTime = document.querySelector('.machine-time');
const resumeBtn = document.querySelector('.resume');
const undo = document.querySelector('.undo');
const gameBegin = document.querySelector('.game-begin');

const canvas1 = document.querySelector('#canvas1');
let ctx1 = canvas1.getContext('2d');

let ctx = canvas.getContext('2d');

const WIDTH = 35;
const ROW = 18;

const SIDE = 15; 

let portraitNum = 0;
let machineNum = 0;
// 绘制表格


class Drawing {
	static create() {
		for (let i = 0; i < 19; i++) {
			this.line(0, WIDTH * i,WIDTH * ROW, WIDTH * i);
			this.line(WIDTH * i, 0,WIDTH * i, WIDTH * ROW);
		}
		ctx.beginPath();
		let auto = (ROW / 2) * WIDTH;
		this.circle(auto, auto, 10);
		this.circle(4 * WIDTH, 4 * WIDTH, 8);
		this.circle(14 * WIDTH, 4 * WIDTH, 8);
		this.circle(14 * WIDTH, 14 * WIDTH, 8);
		this.circle(4 * WIDTH, 14 * WIDTH, 8);
	}
	
	static circle(x, y, r,color="#000") {
		
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(x + SIDE, y + SIDE, r, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();

	}
	static line(x,y,endX,endY){
		ctx.beginPath();
		ctx.moveTo(x + SIDE, y + SIDE);
		ctx.lineTo(endX + SIDE, endY + SIDE);
		ctx.stroke();
		ctx.closePath();
	}
	static clear(){
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	}
	static text(txt,x,y){
		ctx1.font = "18px serif";
		ctx1.fillText(txt,x * WIDTH + SIDE - 9, y  * WIDTH + SIDE + 9);
	}
	static clear1(){
		ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
	}
}
function showBox(txt){
	victory.style.display = "block";
	title.innerHTML = txt;
}

function stepNum(step,txt){
	step.innerHTML = txt;
}

