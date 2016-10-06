/**
 * Created by Administrator on 2016/10/6.
 */
var btn=document.getElementsByClassName('btn')[0],
    btn02=document.getElementsByClassName('btn')[1],
    btnSelect=document.getElementsByClassName('btn')[2],
    btnSelect02=document.getElementsByClassName('btn')[3],
    content=document.getElementById('content'),
    text,
    list=[],
    timer=null,
    bfIndex=0
    ;
btn.onclick=function(){
    reset();
    front(content);
    changeColor();
};
btn02.onclick=function(){
    reset();
    guang(content);
    changeColor();
};
btnSelect.onclick=function(){
    reset();
    front(content);
    find(0);
};
btnSelect02.onclick=function(){
  reset();
    guang(content);
    find(1);
};
function front(content){
    if(!(content==null)){
        list.push(content);
        for(var i=0;i<content.children.length;i++){
            front(content.children[i]);
        }
    }
}
function guang(content){
    if(content){
        list.push(content);
        console.log(list[list.length-1]);
        guang(content.nextElementSibling);
        content=list[bfIndex];
        bfIndex++;
        guang(content.firstElementChild);
    }
}
function changeColor(){
    var i=0;
    content.style.backgroundColor='blue';
    var timer=setInterval(function(argument){
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
function reset(){
    list=[];
    clearInterval(timer);
    var divs=document.getElementsByTagName('div');
    for(var i=0;i<divs.length;i++){
        divs[i].style.backgroundColor='#fff';
    }
}
function find(x){
    var i=0;
    text=document.getElementsByClassName('textBox')[x].value;
    content.style.backgroundColor='blue';
    if(content.firstChild.nodeType==3&&content.firstChild.nodeValue==text){
        content.style.backgroundColor='red';
    }else{
        var timer=setInterval(function(argument){
            i++;
            if(i<list.length){
                if(list[i-1].style.backgroundColor!='red'){
                    list[i-1].style.backgroundColor='#fff';
                }
                list[i].style.backgroundColor='blue';
                if(list[i].firstChild.nodeType==3&&list[i].firstChild.nodeValue==text){
                    list[i].style.backgroundColor='red';
                }
            }else{
                clearInterval(timer);
                list[list.length-1].style.backgroundColor='#fff';
            }
        },500);
    }

}