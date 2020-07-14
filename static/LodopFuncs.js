//====页面动态加载C-Lodop云打印必须的文件CLodopfuncs.js====
var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;

//让其它电脑的浏览器通过本机打印（仅适用C-Lodop自带的例子）：
var oscript = document.createElement("script");
oscript.src ="/CLodopfuncs.js";
head.insertBefore( oscript,head.firstChild );

//让本机的浏览器打印(更优先一点)：
oscript = document.createElement("script");
oscript.src ="http://localhost:8000/CLodopfuncs.js?priority=2";
head.insertBefore(oscript,head.firstChild );

//加载双端口(8000和18000）避免其中某个端口被占用：
oscript = document.createElement("script");
oscript.src ="http://localhost:18000/CLodopfuncs.js?priority=1";
head.insertBefore( oscript,head.firstChild );

//====获取LODOP对象的主过程：====
function LodopFuncs(){}
LodopFuncs.prototype = {
	getLodop: function(oOBJECT,oEMBED){
		var LODOP;
	    try{
	        try{
			LODOP=getCLodop();
		} catch(err) {};

	        if (!LODOP && document.readyState!=="complete") {
			alert("C-Lodop没准备好，请稍后再试！");
			return;
		};

		//清理原例子内的object或embed元素，避免乱提示：
		if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
		if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);

	        return LODOP;
	    } catch(err) {alert("getLodop出错:"+err);};
	},
	needCLodop: function(){
		return true;  //本例子强制所有浏览器都调用C-Lodop
	}
}

function print(){
  var n = new LodopFuncs()
  LODOP=n.getLodop();
  LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_全页");
  LODOP.ADD_PRINT_HTM(0,0,"100%","100%",document.documentElement.innerHTML);
  LODOP.PREVIEW();
}

function print1(){
  var n = new LodopFuncs()
  LODOP=n.getLodop();
  LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_全页");
  LODOP.ADD_PRINT_HTM(0,0,"100%","100%","<html><body><h1>aaa</h1></body></html>");
  LODOP.PREVIEW();
}

export { //很关键
  print,
  print1
}
