
//  玩家先
class Grade{
	constructor(score,coordinates) {
	}
	render(){
		this.getSite();
	}
	setPoint(score,x,y){
		let str = x + "_" + y;
		if(!site[x + '_' + y] && (x > 0 && y > 0 && x < ROW && y < ROW)){
			if(siteScore[str] == 500){
				if(score == 100){
					score = (score + siteScore[str]) * 1.5;
				}
			}
			if(siteScore[str] == 100){
				if(score == 500){
					score = (score + siteScore[str]) * 1.5;
				}
			}
			
			if(siteScore[str] > score){
				score = siteScore[str];
			}else if(siteScore[str] == score){
				score = score * 1.5;
			}
			// 四颗子的得分
			if(score == 5000 || score == 25000){
				score = score * 2;
			}
			
			siteScore[str] = score;
		}
		
	}
	// 获取五子棋下子对应的坐标
	getSite(){
		let siteKey = Object.keys(site);
		siteKey.forEach(value=>{
			let {x,y} = string(value);
			if(site[value] == 1){
				direction.forEach(res =>{
					let count = alignment(x,y,res[0],res[1]);
					this.guard(x,y,res[0],res[1],count,1);
				})
			}else if(site[value] == 2){
				direction.forEach(res =>{
					let count = alignment(x,y,res[0],res[1]);
					this.guard(x,y,res[0],res[1],count,6);
				})
			}
			
		})
	}
	// 设置对应坐标的估分值 
	guard(x,y,dx,dy,count,multiple){
		let X = 0;
		let Y = 0;
		let size = 0;
		let maxMultiple = 1;
		size = this.size(count);
		X = x + dx * (count + 1);
		Y = y + dy * (count + 1);
		let dX = x - dx;
		let dY = y - dy;
		if(site[dX + '_' + dY]){
			multiple = 1;
			size = size / 2;
		}
		if(site[X + '_' + Y]){
			multiple = 1;
			size = size / 2;
		}
		this.setPoint(multiple * size,X,Y);
		this.setPoint(multiple * size,dX,dY);
		
		
		let {emptyX,emptyY,num} = this.umpRush(x,y,dx,dy);
		if((emptyX != 0 || emptyY != 0) && num > 1){
			size = this.size(num - 1);
			X = x + dx * (num + 1);
			Y = y + dy * (num + 1);
			let dX = x - dx;
			let dY = y - dy;
			if((site[X + '_' + Y] || site[dX + '_' + dY] || site[emptyX + "_" + emptyY]) && num < 4){
				size = size / 2;
			}else{
				if(!site[emptyX + "_" + emptyY]){
					maxMultiple = 1.2;
				}
			}
			this.setPoint(multiple * size * maxMultiple,emptyX,emptyY);
			
			this.setPoint(multiple * size,X,Y);
			this.setPoint(multiple * size,dX,dY);
		}
	}
	size(count){
		let size = 0;
		size = Math.pow(10,count + 1);
		return size;
	}
	// 获取比较优的坐标
	tallGrade(){
		
		let arr = [];
		let keys = Object.keys(siteScore);
		let d = keys[0];
		arr.push(d);
		for(let i = 1;i < keys.length;i++){
			if(siteScore[d] < siteScore[keys[i]]){
				arr = [];
				d = keys[i];
			}
			if(siteScore[d] == siteScore[keys[i]]){
				arr.push(keys[i]);
			}
		}
		let num = Math.random() * arr.length;
		num = Math.floor(num);
		let main = string(arr[num]);
		let {x,y} = main;
		return main;
	}
	umpRush(x,y,dx,dy){
		let num = 0;
		let oldResult = x + "_" + y;
		let emptyX = 0,emptyY = 0;
		let n = 0,s = 0;
		for(let i = 1; i < 5;i++){
			let X = x + dx * i;
			let Y = y + dy * i;
			let result = X + "_" + Y;
			if(site[result] != null && site[result] == site[oldResult]){
				num++;
				if(n >= 1 && s <= 1){
					n++;
				}
			}else{
				s++
				if(n < 1 && site[result] == null){
					emptyX = X;
					emptyY = Y;
					num++
					n++;
				}else{
					if(site[result] != null){
						return {emptyX,emptyY,num};
					}
				}
				
			}
		}
		if(n <= 1){
			return {emptyX:0,emptyY,num:0};
		}else{
			return {emptyX,emptyY,num};
		}
		return {emptyX:0,emptyY,num:0};

	}
	
}


