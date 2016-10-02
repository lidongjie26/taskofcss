/**
 * Created by Administrator on 2016/10/2.
 */
var EventUtil={
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on'+type]=handler;
        }
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    }
};

var body=document.body;
var wrap=document.getElementById('content');
var textBox=document.getElementsByClassName('textBox')[0];
var item;
var output;
var arr;
var i;
function getArray(textBox){
    var str=textBox.value.toString();
    arr=str.split(/[,，、\n\r\t]/);
    return arr;
}
function testArray(arr){
    for(var i=0;i<arr.length;i++){
        var reg=/^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
        var test=reg.test(arr[i]);
        if(test===false){
            break;
        }
    }
    return test;
}
EventUtil.addHandler(body,'click',function(event){
    var target=EventUtil.getTarget(event);
    switch(target.className){
        case 'insertLeft':
            arr=getArray(textBox);
            if(testArray(arr)){
                for(i=0;i<arr.length;i++){
                    item=document.createElement('div');
                    item.className='item';
                    item.innerHTML='<p>'+arr[i]+'</p>';
                    wrap.insertBefore(item,wrap.firstChild);
                }
            }else{
                alert('输入内容不是中文数字或者字母！');
            }
            textBox.value='';
            textBox.focus();
         break;
        case 'insertRight':
            arr=getArray(textBox);
            if(testArray(arr)){
                for(i=0;i<arr.length;i++){
                    item=document.createElement('div');
                    item.className='item';
                    item.innerHTML='<p>'+arr[i]+'</p>';
                    wrap.appendChild(item);
                }
            }else{
                alert('输入内容不是中文数字或者字母！');
            }
            textBox.value='';
            textBox.focus();
            break;
        case 'pushLeft':
            var firstChild=wrap.firstChild;
            output=firstChild.firstChild.innerHTML;
            console.log(firstChild.firstChild.innerHTML);
            wrap.removeChild(wrap.firstChild);
            alert(output);
            break;
        case 'pushRight':
            var lastChild=wrap.lastElementChild;
            output=lastChild.firstChild.innerHTML;
            wrap.removeChild(wrap.lastChild);
            alert(output);
            break;
        case 'item':
            wrap.removeChild(target);
            break;
        case 'searchBtn':
            var searchText=document.getElementsByClassName('searchText')[0].value.toString();
            var items=document.getElementsByClassName('item');
            var str='';
            for(i=0;i<items.length;i++){
                str=items[i].firstChild.innerHTML;
                if(str.indexOf(searchText)>=0){
                    items[i].style.color='#000';
                }
            }
            document.getElementsByClassName('searchText')[0].value='';
            document.getElementsByClassName('searchText')[0].focus();
            break;
    }
});