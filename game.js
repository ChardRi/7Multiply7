var map = new Array(); //方块对应的数组
var color = ['noCell','redCell','greenCell','yellowCell','blueCell','purpleCell'];
var board;
var cellNum = 3; //每次增加的方块数
var cellLive = 0;
var cellFocus = {
		col: 0,
		row: 0,
		flag: 0,
		value: 0,
		className: 'noCell'
	}//方块被点击
var minusFlag = 0;

window.onload = function(){
	initHtml();
	initArray();
	initBind();
	for(var i=0;i<cellNum;i+=1){
		addCell();
		cellLive+=1;
	}
}

function initHtml(){
	var div,ul,li;
	var i,j;
	div = document.createElement('div');
	div.className = 'board';
	div.setAttribute('id','board');
	for(i=0;i<7;i++){
		ul = document.createElement('ul');
		ul.className = 'row';
		for (j=0;j<7;j++){
			li = document.createElement('li');
			li.className = 'noCell';
			ul.appendChild(li);
		} 
		div.appendChild(ul);
	}	
	document.getElementsByTagName('body')[0].appendChild(div);
	board = document.getElementById('board');
}

function initArray(){
	for(var i=-1;i<8;i+=1){
	    map[i]=new Array();
		for(var j=-1;j<8;j+=1){
			map[i][j]={
				value : 0,
				left: 0,
				leftTop: 0,
				top: 0,
				rightTop: 0,
				right: 0,
				rightBottom: 0,
				bottom: 0,
				leftBottom: 0
			}
		}
	}
}

function initBind(){
	for(var i=0; i<7; i+=1){
		(function(i){
			for(var j=0; j<7; j+=1){
				(function(j){
					var _self = board.getElementsByTagName('ul')[i].getElementsByTagName('li')[j];
					_self.addEventListener('click',function(){
						if( _self.className === 'noCell'){
							if(cellFocus.flag === 1 && map[j][i].value === 0){
								_self.className = cellFocus.className;
								map[j][i].value = cellFocus.value;
								map[cellFocus.col][cellFocus.row].value = 0;
								board.getElementsByTagName('ul')[cellFocus.row].getElementsByTagName('li')[cellFocus.col].className = 'noCell' ;
								cellFocus.flag = 0;
								clean(j,i);
								if(minusFlag == 0)
								setTimeout(next,100);
								minusFlag = 0;
							}
						}
						else{
							if(this.className.match(new RegExp('On'))&&cellFocus.flag == 1){
								this.className = this.className.replace('On','');
								cellFocus.flag = 0;
							}
							else if(!this.className.match(new RegExp('On'))&&cellFocus.flag == 0){
								this.className += 'On';
								cellFocus.col = j;
								cellFocus.row = i;
								cellFocus.flag = 1;
								cellFocus.value = map[j][i].value;
								cellFocus.className = this.className.replace('On','');
							}
						}
					})
				}(j))
			}
		}(i))
	}
}


function next(){
	for(var k=0;k<cellNum;k+=1){
		if(cellLive <= 48){
			addCell();
			cellLive+=1;
		}				
		else{
			alert('You Lose!');
			break;
		}
	}	
}

function addCell(){
	var newRow,newCol,newColor;
	do{
		newRow = randomNum(6);
		newCol = randomNum(6);
		newColor = randomNum(4)+1;
	}while( map[newCol][newRow].value != 0 )
	var row = board.getElementsByTagName('ul');
	var col = row[newRow].getElementsByTagName('li')[newCol];
	col.className = color[newColor];
	map[newCol][newRow].value = newColor;	
	clean(newCol,newRow);
}

function clean(j,i){
	var k = 1;
	var sign = map[j][i].value;
	map[j][i].left = 0;
	map[j][i].leftTop = 0;
	map[j][i].top = 0;
	map[j][i].rightTop = 0;
	map[j][i].right = 0;
	map[j][i].rightBottom = 0;
	map[j][i].bottom = 0;
	map[j][i].leftBottom = 0;
	while(map[j-k][i].value === sign){ 
		k+=1; map[j][i].left+=1;}; 
	k=1; 
	while(map[j-k][i-k].value === sign){ 
		k+=1; map[j][i].leftTop+=1;}; 
	k=1;
	while(map[j][i-k].value === sign){ 
		k+=1; map[j][i].top+=1;}; 
	k=1;
	while(map[j+k][i-k].value === sign){ 
		k+=1; map[j][i].rightTop+=1;}; 
	k=1;
	while(map[j+k][i].value === sign){ 
		k+=1; map[j][i].right+=1;}; 
	k=1;
	while(map[j+k][i+k].value === sign){ 
		k+=1; map[j][i].rightBottom+=1;}; 
	k=1;
	while(map[j][i+k].value === sign){ 
		k+=1; map[j][i].bottom+=1;}; 
	k=1;
	while(map[j-k][i+k].value === sign){ 
		k+=1; map[j][i].leftBottom +=1;}; 
	k=0;
	if(map[j][i].left + map[j][i].right >= 3) {
		while(map[j-k][i].value === sign){ 
			map[j-k][i].value = 0;
			cellLive-=1;
			board.getElementsByTagName('ul')[i].getElementsByTagName('li')[j-k].className = 'noCell' ;
			k+=1; 
			}; 
		k=1; 
		while(map[j+k][i].value === sign){ 
			map[j+k][i].value = 0;
			cellLive-=1;
			board.getElementsByTagName('ul')[i].getElementsByTagName('li')[j+k].className = 'noCell' ;
			k+=1; 
			}; 
		k=0; 
		minusFlag = 1;
	}
	if(map[j][i].leftTop + map[j][i].rightBottom >= 3) {
		while(map[j-k][i-k].value === sign){ 
			map[j-k][i-k].value = 0;
			cellLive-=1;
			board.getElementsByTagName('ul')[i-k].getElementsByTagName('li')[j-k].className = 'noCell' ;
			k+=1; 
			}; 
		k=1; 
		while(map[j+k][i+k].value === sign){ 
			map[j+k][i+k].value = 0;
			cellLive-=1;
			board.getElementsByTagName('ul')[i+k].getElementsByTagName('li')[j+k].className = 'noCell' ;
			k+=1; 
			}; 
		k=0; 
		minusFlag = 1;
	}
	if(map[j][i].top + map[j][i].bottom >= 3) {
		while(map[j][i-k].value === sign){ 
			map[j][i-k].value = 0;
			cellLive-=1;
			board.getElementsByTagName('ul')[i-k].getElementsByTagName('li')[j].className = 'noCell' ;
			k+=1; 
			}; 
		k=1; 
		while(map[j][i+k].value === sign){ 
			map[j][i+k].value = 0;
			cellLive-=1;
			board.getElementsByTagName('ul')[i+k].getElementsByTagName('li')[j].className = 'noCell' ;
			k+=1; 
			}; 
		k=0; 
		minusFlag = 1;
	}
	if(map[j][i].rightTop + map[j][i].leftBottom >= 3) {
		while(map[j-k][i+k].value === sign){ 
			map[j-k][i+k].value = 0;
			cellLive-=1;
			board.getElementsByTagName('ul')[i+k].getElementsByTagName('li')[j-k].className = 'noCell' ;
			k+=1; 
			}; 
		k=1; 
		while(map[j+k][i-k].value === sign){ 
			map[j+k][i-k].value = 0;
			cellLive-=1;
			board.getElementsByTagName('ul')[i-k].getElementsByTagName('li')[j+k].className = 'noCell' ;
			k+=1; 
			}; 
		k=0;
		minusFlag = 1;
	}
}

function randomNum(range){
	return Math.round(Math.random()*range) ; 
}