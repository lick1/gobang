let site = {};
let isVictory = -1;  // 1：黑 2：白
let isBlack = true;
let siteScore = {};
let direction = [[1,0],[0,1],[1,1],[1,-1]];

let sunTime = 90;
let claerTime = null; 

let siteKey = [];




function isNull(x,y){
	let str = x + "_" + y;
	// 判断那个子下了
	if(site[str] == null){
		if(isBlack){
			erupted(x,y,1);
		}else{
			erupted(x,y,2,'#fff');
		}
		return true;
	}else{
		return false;
	}
}

// 下子
function erupted(x,y,c,color="#000"){
		let str = x + "_" + y;
		site[str] = c;
		siteKey.push(str);
		Drawing.circle(x * WIDTH,y * WIDTH,15,color);
		let isRenju = new IsRenju();
		isRenju.render();
}

//
function string(str){
	let x = parseInt(str.split('_')[0]);
	let y = parseInt(str.split('_')[1]);
	return {x,y};
}

// 五子棋的判断是否获取胜利
class IsRenju{
	constructor() {
	    this.oldResult = null;
	}
	// this.count = 0;
	render(){
		let siteKey = Object.keys(site);
		siteKey.forEach(value=>{
			let {x,y} = string(value);
			direction.forEach(value=>{
				this.renju(x,y,value[0],value[1]);
			})
		})
	}
	// 胜利判断
	renju(x,y,dx,dy){
		
		this.oldResult = x + "_" + y;
		let count = alignment(x,y,dx,dy);
		if(count >= 4){
			isVictory = site[this.oldResult];
			
		}
	}
}


 
 // 测试代码的函数
 function demo(){
	 Object.keys(siteScore).forEach(value=>{
		 let {x,y} = string(value);
		 let count = siteScore[value];
		 Drawing.text(count,x,y)
	 })
 }
// 余时计数的定时器
function time(tement){
	claerTime = setInterval(()=>{
		tement.innerHTML = sunTime > 60 ? "1:" + sunTime % 60 : sunTime;
		sunTime--;
		if(sunTime < 0){
			isVictory = 2;
			victorys();
		}
	},1000)
}

function victorys(){
	if(isVictory != -1){
		clearInterval(claerTime);
		let str = isVictory == 1 ? "黑棋,恭喜你获取胜利！":"白棋恭喜你获取胜利";
		showBox(str);
	}
}

function alignment(x,y,dx,dy){
	let count = 0;
	let oldResult = x + "_" + y;
	for(let i = 1; i < 5;i++){
		let X = x + dx * i;
		let Y = y + dy * i;
		let result = X + "_" + Y;
		if(site[result] != null && site[result] == site[oldResult]){
			count++;
		}else{
			return count;
		}
	}
	return count;
}


function canvasCircle(data){
	let newSite = JSON.parse(JSON.stringify(site));
	site = {};
	data.forEach(value=>{
		let {x,y} = string(value);
		if(newSite[value] == 1){
			erupted(x,y,1);
		}else{
			erupted(x,y,2,"#fff");
		}
	})
}
