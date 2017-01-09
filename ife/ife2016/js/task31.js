/**
 * Created by 李冬杰 on 2017/1/7.
 */
var schoolArr={
    北京:['北京大学','清华大学','中国地质大学','北京师范大学'],
    上海:['上海交通大学','复旦大学','同济大学','华东师范大学'],
    武汉:['武汉大学','华中科技大学','华中农业大学','武汉理工大学','华中师范大学','中国地质大学'],
    广州:['中山大学','华南农业大学','华南理工大学','华南师范大学']
};
/*
*功能划分
* 1、radio点击功能
* 2、更换内容功能
* 3、select选择功能
* 4、初始化功能
* */
//浏览器兼容性事件绑定函数
var EventUtil={
    addHandle:function(element,type,handle){
        if(element.addEventListener){
            element.addEventListener(type,handle,false);
        }else if(element.attachEvent()){
            element.attachEvent('on'+type,handle);
        }else{
            element['on'+type]=handle;
        }
    },
    getTarget:function(e){
        return e.target||e.srcElement;
    }
};
var message={
    type:'',
    city:''
};
var school=document.getElementById("school");
var company=document.getElementById("company");
//单选按钮函数
function radioChange(){
    var radios=document.getElementsByName('profession');
    var radioLength=radios.length;
    for(var i=0;i<radioLength;i++){
        if(radios[i].checked==true){
            message.type=radios[i].value;
            selectionChange();
            return;
        }
    }
}
//城市学校选择函数
function selectionChange(){
    if(message.type=='school'){
        school.className='show';
        company.className='hidden';
    }else{
        school.className='hidden';
        company.className='show';
    }
}
var colloge=document.getElementById('colloge');
function cityChange(element){
    colloge.innerHTML='';
    var city=element.value;
    var collogeArray=schoolArr[city];
    var len=collogeArray.length;
    for(var i=0;i<len;i++){
        colloge.innerHTML+='<option value="'+collogeArray[i]+'">'+collogeArray[i]+'</option>';
    }
}
var form=document.forms[0];
//事件绑定函数
EventUtil.addHandle(form,'click',function(e){
    var target=EventUtil.getTarget(e);
    switch(target.className){
        case 'selectType':
            target.onclick=radioChange;
            break;
        case 'city':
            target.onclick=function(){
                cityChange(target);
            };
            break;
    }
});
