/**
 * Created by Administrator on 2016/9/27.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date('2016-01-01');
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    '北京': randomBuildData(500),
    '上海': randomBuildData(300),
    '广州': randomBuildData(200),
    '深圳': randomBuildData(100),
    '成都': randomBuildData(300),
    '西安': randomBuildData(500),
    '福州': randomBuildData(100),
    '厦门': randomBuildData(100),
    '沈阳': randomBuildData(500)
};
var cityList=[];
// 用于渲染图表的数据
var chartData = {};
var citySelected;

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: 0,
    nowGraTime: 'day'
};
var arr_day=[];
var x;
/**
 * 渲染图表
 */
function getDay(){
    var item;
    x=0;
    for(item in aqiSourceData[citySelected]){
        arr_day[x]=Number(aqiSourceData[citySelected][item]);
        x++;
    }
}
function renderChart() {
    //首先清除上次的图形
    var wrap=document.getElementsByClassName('aqi-chart-wrap')[0];
    while(wrap.hasChildNodes()){
        wrap.removeChild(wrap.firstChild);
    }
    //然后选择新的城市，新的时间间隔。
    for(var i=0;i<chartData['时间'].length;i++){
        var item=document.createElement('div');
        document.getElementsByClassName('aqi-chart-wrap')[0].appendChild(item);
        item.style.height=chartData['时间'][i]+'px';
        item.innerHTML="<p class='aqi'>"+Math.round(chartData['时间'][i])+"</p>";
        var p=item.firstElementChild;
        var widthDiv=(document.body.clientWidth-20)/chartData['时间'].length;
        p.style.width=widthDiv*2/3+'px';
        item.style.width=widthDiv*2/3+'px';
        item.style.marginRight=widthDiv*1/3+'px';
        item.className='item';
        if(chartData['时间'][i]>0&&chartData['时间'][i]<100){
            item.style.backgroundColor='#008000';
        }
        else if(chartData['时间'][i]>=100&&chartData['时间'][i]<200){
            item.style.backgroundColor='#00f';
        }
        else if(chartData['时间'][i]>=200&&chartData['时间'][i]<300){
            item.style.backgroundColor='#dc143c';
        }
        else if(chartData['时间'][i]>=300&&chartData['时间'][i]<400){
            item.style.backgroundColor='#800080';
        }
        else{
            item.style.backgroundColor='#000';
        }
        item.style.marginTop=(500-chartData['时间'][i])+'px';
        item.style.float='left';
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
//时间尺度发生变化，选择数据不变，但是要对数据进行处理
function graTimeChange() {
    // 确定是否选项发生了变化
    var checked;
    var checkObj=document.getElementsByName('gra-time');
    for(var i=0,len=checkObj.length;i<len;i++){
        if(checkObj[i].checked==true){
            checked=checkObj[i];
        }
    }
    // 设置对应数据
    getDay();
    var arr_week=[];
    var arr_month=[0,0,0];
    var arrCopy=arr_day.slice();
    while(arrCopy.length!==0){
        var num=0;
        if(arrCopy.length>=7){
            for(i=0;i<7;i++){
                num+=arrCopy.shift();
            }
            num=num/7;
        }
        else{
            var x=arrCopy.length;
            for(i=0;i<arrCopy.length;i++){
                num+=arrCopy.shift();
            }
            num=num/x;
        }
        arr_week.push(num);
    }
    for( x=0;x<arr_day.length;x++) {
        if (x < 31) {
            arr_month[0]+=arr_day[x];
        }
        if (x >= 31 && x < 60) {
            arr_month[1]+=arr_day[x];
        }
        if (x >= 60 && x < 91) {
            arr_month[2]+=arr_day[x];
        }
    }
    arr_month[0]=arr_month[0]/31;
    arr_month[1]=arr_month[1]/29;
    arr_month[2]=arr_month[2]/31;
    console.log(arr_day);
    console.log(arr_week);
    console.log(arr_month);
    switch (checked.value){
        case 'day':
            chartData['时间']=arr_day;
            break;
        case 'week' :
            chartData['时间']=arr_week;
            break;
        case 'month':
            chartData['时间']=arr_month;
            break;
    }
    // 调用图表渲染函数
    renderChart();
}


/**
 * select发生变化时的处理函数
 */
//城市发生变化，数据发生变化,数据发生变化，需要重新读取时间尺度。
function citySelectChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
         var select=document.getElementById('city-select');
        citySelected=select.options[select.selectedIndex].innerHTML;
        chartData['城市']=citySelected;
        console.log(citySelected);
        graTimeChange();
    // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    // 设置对应数据
    var item;
    var arr_day=[];
    var x=0;
    for(item in aqiSourceData[citySelected]){
        arr_day[x]=Number(aqiSourceData[citySelected][item]);
        x++;
    }

    chartData['时间']=arr_day;
    var checkObj=document.getElementsByName('gra-time');
    $("input[name='gra-time']").change(function(){
        graTimeChange();
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var city;
    var i=0;
    for(city in aqiSourceData){
        var optionCity=document.createElement('option');
        optionCity.innerHTML=city;
        cityList[i]=city;
        i++;
        document.getElementById('city-select').appendChild(optionCity);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    document.getElementById('city-select').selectedIndex=0;
    chartData['城市']='北京';
    citySelected='北京';
    document.getElementById('city-select').onchange=citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    renderChart();
    // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
    initCitySelector();
    initGraTimeForm();
    initAqiChartData();
}

init();
