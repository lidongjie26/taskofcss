/**
 * Created by Administrator on 2016/10/3.
 * 基于任务20，将任务20的代码进行抽象、封装，然后在此基础上实现如图中的两个需求：Tag输入和兴趣爱好输入
 如示例图上方，实现一个tag输入框
 要求遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
 Tag不能有重复的，遇到重复输入的Tag，自动忽视。
 每个Tag请做trim处理
 最多允许10个Tag，多于10个时，按照录入的先后顺序，把最前面的删掉
 当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
 如示例图下方，实现一个兴趣爱好输入的功能
 通过一个Textarea进行兴趣爱好的输入，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔。
 当点击“确认兴趣爱好”的按钮时，将textarea中的输入按照你设定的间隔符，拆解成一个个的爱好，显示在textarea下方
 爱好不能重复，所以在下方呈现前，需要做一个去重
 每个爱好内容需要做trim处理
 最多允许10个兴趣爱好，多于10个时，按照录入的先后顺序，把最前面的删掉
 */
var EventHandler={
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
    getTarget:function(event) {
        return event.target||event.srcElement;
    }
};
//trim处理
function trim(str){
    return str.replace(/^[\s,，、\r\t]+|[\s,，、\r\t]$/g,'');
}
//不能超过10个，超过10个，去掉开头第一个，新的加到最后
function deleteMore(content,className){
    var length=document.getElementsByClassName(className).length;
    if(length==10){
        content.removeChild(content.firstChild);
    }
}
//不能重复，重复去重
function test(value,className){
    var bool=false;
    var items=document.getElementsByClassName(className);
    for(var i=0;i<items.length;i++){
        if(value==items[i].firstChild.innerHTML){
            bool=true;
            break;
        }
    }
    return bool;
}

var wrap=document.getElementsByClassName('content')[0];
var wrapHobby=document.getElementsByClassName('content')[1];
var body=document.body;
var textBox=document.getElementsByClassName('textBox')[0];
var textHobby=document.getElementsByClassName('textBox')[1];
var item;
var tip;
var reg=/[\s,，、\r\t]/;
EventHandler.addHandler(wrap,'mouseover',function(event){
    var target=EventHandler.getTarget(event);
    switch(target.className){
        case 'item':
            tip=document.createElement('div');
            tip.innerHTML='<p >删除</p>';
            tip.className='tip';
            target.appendChild(tip);
            break;
        case 'text':
            tip=document.createElement('div');
            tip.innerHTML='<p >删除</p>';
            tip.className='tip';
            target.parentNode.appendChild(tip);
            break;

    }
});
EventHandler.addHandler(wrap,'mouseout',function(event){
    var target=EventHandler.getTarget(event);
    switch(target.className){
        case 'item':
            target.removeChild(target.lastElementChild);
            break;
        case 'text':
            target.parentNode.removeChild(document.getElementsByClassName('tip')[0]);
            break;
    }
});
function change(target){
    if(reg.test(target.value)){
        var value=textBox.value;
        value=trim(value);
        if(value===''){
            alert('输入为空，请重新输入');
            textBox.focus();
        }else if(test(value,'item')){
            textBox.value='';
            textBox.focus();
        }
        else{
            item=document.createElement('div');
            item.className='item';
            item.innerHTML='<p class="text">'+value+'</p>';
            deleteMore(wrap,'item');
            wrap.appendChild(item);
            textBox.value='';
            textBox.focus();
        }

    }
}
EventHandler.addHandler(textBox,'input',function(event){
    var target=EventHandler.getTarget(event);
    change(target);
});
EventHandler.addHandler(textBox,'propertychange',function(event){
    var target=EventHandler.getTarget(event);
    change(target);
});
EventHandler.addHandler(body,'click',function (event) {
    var target=EventHandler.getTarget(event);
    switch(target.className){
        case 'item':
            wrap.removeChild(target);
            break;
        case 'inputBtn':
            var str=textHobby.value.toString();
            var arr=str.split(reg);
            for(var i=0;i<arr.length;i++){
                arr[i]=trim(arr[i]);
                if(!test(arr[i],'hobby')){
                    if(arr[i]!==''){
                        var hobby=document.createElement('div');
                        hobby.className='hobby';
                        hobby.innerHTML='<p class="text">'+arr[i]+'</p>';
                        console.log(hobby.innerHTML);
                        deleteMore(wrapHobby,'hobby');
                        wrapHobby.appendChild(hobby);
                        textHobby.value='';
                        textHobby.focus();
                    }
                }
            }
            break;
    }
});