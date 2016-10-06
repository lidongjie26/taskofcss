/**
 * Created by Administrator on 2016/10/5.
 */
/*var EventUtil={
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on'+type]=handler;
        }
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    getEvent:function(event){
        return event?event:window.event;
    }
};*/

/*EventUtil.addHandler(body,'click',function(event){
    var target=EventUtil.getTarget(event);
    switch(target.id){
        case 'btnFront':
            var content=document.getElementById('content');
            front(content);
            break;
    }
});
*/
var list=[],
    timer=null,
    content=document.getElementById('content');
document.getElementById('btnFront').onclick=function(){
    reset();
    front(content);
    changeColor();
};
document.getElementById('btnCenter').onclick=function(){
    reset();
    center(content);
    changeColor();

};
document.getElementById('btnBack').onclick=function(){
    reset();
    back(content);
    changeColor();
};
document.getElementById('btnFloor').onclick=function(){
    reset();
    floor();
    changeColor();
};
function floor(){
    list.push(content);
    var first=document.getElementsByClassName('first');
    var second=document.getElementsByClassName('second');
    var three=document.getElementsByClassName('three');
    pushOwn(first,list);
    pushOwn(second,list);
    pushOwn(three,list);
    console.log(list);
}
function pushOwn(jihe,list){
    for(var i=0;i<jihe.length;i++){
        list.push(jihe[i]);
    }
}
function front(content){
    if(!(content==null)){
        list.push(content);
        front(content.firstElementChild);
        front(content.lastElementChild);
    }
}
function center(content){
    if(!(content==null)){
        center(content.firstElementChild);
        list.push(content);
        center(content.lastElementChild);
    }
}
function back(content){
    if(!(content==null)){
        back(content.firstElementChild);
        back(content.lastElementChild);
        list.push(content);
    }
}
function reset(){
    list=[];
    clearInterval(timer);
    var divs=document.getElementsByTagName('div');
    for(var i=0;i<divs.length;i++){
        divs[i].style.backgroundColor='#fff';
    }
}
function changeColor(){
    var i=0;
    list[i].style.backgroundColor='blue';
    timer=setInterval(function(argument){
        i++;
        if(i<list.length){
            list[i-1].style.backgroundColor='#fff';
            list[i].style.backgroundColor='blue';
        }else{
            clearInterval(timer);
            list[list.length-1].style.backgroundColor='#fff';
        }
    },500);
}