window.onload = function(){
	var show = document.getElementById("show"),
	a = show.getElementsByTagName("a")[0],
    operate = document.getElementById("operate"),
	number = document.getElementById("number"),
	equal = document.getElementById("equal"),
	clear = document.getElementById("clear"),
	num = null;
	var arr = [];
	var count = 0;//第一次输入的值
	var opera = "";//保存输入的操作符
	var temp = 0;

	function Calculator(){    //判定输入的操作符
	    this.caculate=function(num1,num2,opera){
	        var result=0;
	        switch(opera)
			{
				case "+":
					result = add(num1,num2);
					break;
				case "-":
					result = del(num1,num2);
					break;
				case "*":
					result = mutiplication(num1,num2);
					break;
				case "/":
					result = division(num1,num2);
					break;				
			}
	        return result;
	    }
	}
	var calculator = new Calculator();



	number.addEventListener("click",function(){  //点击数字，采用的代理方法
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		if (target.nodeName.toLowerCase() === 'span') {
			//target.setAttribute("class","numberh");
			num = target.innerHTML;//获取输入的数字
			arr.push(num);//将数字放入数组
			count = arr.join("");//将数组变为数字
			//console.log(count);
			a.innerHTML = count;//显示到屏幕
			
			//alert(num);
		};
	},false);
	operate.addEventListener("click",function(){
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		if (target.nodeName.toLowerCase() === 'span'  && target.innerHTML != 'c') {
		    temp = a.innerHTML;//保存上一次输入的数字
			arr = [];//将上一次的数据清空
			opera = target.innerHTML;//保存输入的操作符
			//this.setAttribute("background","#e18104");
			//a.innerHTML = num;
			//alert("num");
			// console.log(count+","+temp);

		};
	},false);
	
	equal.addEventListener("click",function(){   //等于，得出答案
		//alert(temp+" "+opera+" "+count);
		a.innerHTML = calculator.caculate(temp,count,opera);
	},false);

	clear.addEventListener("click",function(){   //清除数据
		a.innerHTML = 0;
	},false);


	function add(num1,num2){
		num1 += "";
		num2 += "";
		var arr1 = num1.split("");
		var arr2 = num2.split("");//将num1,num2变成一个数组
		arr1.reverse();
		arr2.reverse();//数组反转，便于相加
		var len = 0;
		len = arr1.length > arr2.length? arr1.length:arr2.length;//找到长度最大的数组的长度
		var arr = arr1.length > arr2.length? arr2:arr1;//找到数组长度最小的数组
		var sum = [];//数组相加得到的新数组
		var a = 0;//让数组逢十进一
		var difference = Math.abs(arr2.length - arr1.length);//数组长度的差
		for(var j=0;j<difference;j++){
			arr[arr.length] = 0;//让长度短的数组在差得那一部分填为0
		}
		for(var i=0;i<len;i++){
			sum[i] = arr1[i]*1 + arr2[i]*1 + a;//新数组具体数值
			if (sum[len-1] > 9 ) {//当最后一位大于9时，向最高位进1
				sum[len] =1;
			};
			if (sum[i]>9) {  //判断是否需要进1
				sum[i] = sum[i]- 10;
				a=1;
			}else{
				a=0;
			}
		}
		sum.reverse();  //数组反转
		sum = sum.join(""); //将数组变为数字或字符串
		return sum;
	}
	function del(num1,num2){
		//var sum = [];
		if (num1 > num2) {
			var different = delt(num1,num2);
			return different
		}
		if (num1 < num2) {
			var different = delt(num2,num1);
			return -different;
		}
		if (num1 == num2) {
			return 0;
		}
	}
	function mutiplication(num1,num2){
		return num1 * num2;
	}
	function division(num1,num2){
		if (num2 == 0) {
			alert("除数不能为0");
			return 0;
		};
		return num1/num2;
	}
	function delt(num1,num2){
		num1 += "";
		num2 += "";
		var arr1 = num1.split("");
		var arr2 = num2.split("");//将num1,num2变成一个数组
		arr1.reverse();
		arr2.reverse();//数组反转，便于相加
		var len = 0;
		len = arr1.length;//找到长度最大的数组的长度
		var arr = arr2;//找到数组长度最小的数组
		sum = [];//数组相加得到的新数组
		var a = 0;//让数组逢十进一
		var difference = arr1.length - arr2.length;//数组长度的差
		for(var j=0;j<difference;j++){
			arr[arr.length] = 0;//让长度短的数组在差得那一部分填为0
		}
		for(var i=0;i<len;i++){
			sum[i] = arr1[i]*1 - arr2[i]*1 + a;//新数组具体数值
			// if (sum[len-1] > 9 ) {//当最后一位大于9时，向最高位进1
			// 	sum[len] =1;
			// };        
			if (sum[i] < 0) {  //判断是否需要进1
				sum[i] = sum[i] + 10;
				a = -1;
			}else{
				a=0;
			}
		}
		sum.reverse();  //数组反转
		sum = sum.join(""); //将数组变为数字或字符串
		return sum;
	}
}