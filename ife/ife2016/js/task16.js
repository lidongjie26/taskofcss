/**
 * Created by Administrator on 2016/9/25.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

/**
 * 1.参考以下示例代码，用户输入城市名称和空气质量指数后，
 点击“确认添加”按钮后，就会将用户的输入在进行验证后，添加到下面的表格中，新增一行进行显示---完成
 2.用户输入的城市名必须为中英文字符，空气质量指数必须为整数---
 3.用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）---完成
 4.用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）---完成
 5.用户可以点击表格列中的“删除”按钮，删掉那一行的数据-----完成
 */
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g,'');
}
function addAqiData() {
    var attName=document.getElementById("aqi-city-input").value;
    attName=trim(attName);
    var attValue=document.getElementById("aqi-value-input").value;
    attValue=trim(attValue);
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if((attName.match(/^[A-Za-z]+$/)||attName.match(reg)) && attValue.match(/^\+?[1-9][0-9]*$/)){
        aqiData[attName]=attValue;
        document.getElementById("aqi-value-input").value="";
        document.getElementById("aqi-city-input").value="";
        document.getElementById("aqi-city-input").focus();
    }
    else if( (attName.match(/^[A-Za-z]+$/)||attName.match(reg)) && !attValue.match(/^\+?[1-9][0-9]*$/)){
        alert("输入的空气质量指数应为正整数");
        document.getElementById("aqi-value-input").value="";
        document.getElementById("aqi-value-input").focus();
    }
    else if(!(attName.match(/^[A-Za-z]+$/)||attName.match(reg))  && attValue.match(/^\+?[1-9][0-9]*$/)){
        alert("输入的城市名应为中文或英文字符");
        document.getElementById("aqi-city-input").value="";
        document.getElementById("aqi-city-input").focus();
    }
    else{
     alert("输入的城市名和空气质量指数都有问题");
        document.getElementById("aqi-value-input").value="";
        document.getElementById("aqi-city-input").value="";
        document.getElementById("aqi-city-input").focus();
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    document.getElementById("aqi-table").innerHTML="";
    function addTr(a,b,c){
        var tr=document.getElementById("aqi-table").insertRow();
        var td_1=tr.insertCell();
        var td_2=tr.insertCell();
        var td_3=tr.insertCell();
        td_1.innerHTML=a;
        td_2.innerHTML=b;
        td_3.innerHTML=c;
        td_1.className="td";
        td_2.className="td";
        td_3.className="td";

    }
    console.log(aqiData);
    if(!aqiData){
        addTr("城市","空气质量","操作");
    }
    var city;
    for(city in aqiData){
        addTr(city,aqiData[city],"<button >删除</button>");
    }
    var tab=document.getElementById("aqi-table");
    tab.style.border="1px solid #000"

    ;
    tab.rules="all";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.
    var btn=window.event.srcElement || window.event.target;
    var city=btn.parentNode.previousSibling.previousSibling.innerHTML;
    delete aqiData[city];


    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").onclick=addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").onclick=delBtnHandle;
}

init();