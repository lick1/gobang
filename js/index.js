let begin = false;

gameBegin.addEventListener('click',()=>{
	gameBegin.style.display = "none";
	begin = true;
	canvasClick();
	sunTime = 90;
	time(portraitTime);
})
render();
// 初次化项目
function render(){
	Drawing.create();
	site = {};
	siteScore = {};
	isVictory = -1;
	isBlack = true;
	
	portraitNum = 0;
	machineNum = 0;
	sunTime = 90;
	stepNum(portraitStep,portraitNum);
	stepNum(machineStep,machineNum);
	clearInterval(claerTime);
	gameBegin.style.display = "block";
	
	begin = false;
}


function canvasClick(){
	
	
	let isAi = false;
	
	canvas.addEventListener('click',function(e){
		
		if(isVictory != -1 || !begin){
			clearInterval(claerTime);
			return
		}
		if(isBlack){
			Drawing.clear1();
			siteScore = {};
			// console.log(e);
			let x = e.offsetX;
			let y = e.offsetY;
			x = Math.round(x / WIDTH);
			y = Math.round(y / WIDTH);
			if(isNull(x,y)){
				
				isBlack = false;
				let grade = new Grade();
				grade.render();
				isAi = true;
				victorys();
				portraitNum += 1;
				stepNum(portraitStep,portraitNum);
				sunTime = 90;
				clearInterval(claerTime);
				time(machineTime);
			}
			}
		
		if(isAi){
			isAi = false;
			let grade = new Grade();
			// demo();
			setTimeout(()=>{
				let {x,y} = grade.tallGrade();
				isNull(x,y);
				isBlack = true;
				
				siteScore = {};
				victorys();
				machineNum += 1;
				stepNum(machineStep,machineNum);
				sunTime = 90;
				clearInterval(claerTime);
				time(portraitTime);
			},1000)
		}
		
		
	})
	
	
}

// 重玩
resumeBtn.addEventListener('click',()=>{
	Drawing.clear();
	render();
})

// 悔棋
undo.addEventListener('click',()=>{
	
	if(siteKey.length > 4){
		Drawing.clear();
		
		Drawing.create();
		if(site[siteKey[siteKey.length - 1 ]] == 2){
			siteKey.pop();
			siteKey.pop();
		}else{
			siteKey.pop();
		}
	}
	canvasCircle(siteKey);
})
//  重新开始
 btn.addEventListener('click',function(){
 		 Drawing.clear();
 		 victory.style.display = "none";
 		 render();
		 sunTime = 90;
		 stepNum(portraitStep,portraitNum);
		 stepNum(machineStep,machineNum);
		 clearInterval(claerTime);
 })