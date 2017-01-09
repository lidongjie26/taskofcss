/**
 * Created by 李冬杰 on 2017/1/9.
 */
/*
* 功能
* 1.focus时显示提示功能
* 2.验证功能
* 3.验证结果的显示处理
* 4.通过json数据创建html,将函数绑定
* */


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
    getTarget:function(e){
        return e.target||e.srcElement;
    }
};
function getMessage(element){
    var value=element.value.trim();
    var obj=eval("("+value+")");
    return obj;
}
function createForm(obj,form){
    form.innerHTML='';
    var fieldset=document.createElement('fieldset');
    fieldset.className='fieldset';
    form.appendChild(fieldset);
    var table=document.createElement('table');
    table.className='table';
    fieldset.appendChild(table);
    for(var key in obj){
        if(obj[key].label){
            table.innerHTML+="<tr><th><label for="+key+" value="+obj[key].label+">"+obj[key].label+"</label></th><td><input type="+obj[key].type+"id=+"+obj[key].id+"name="+key+"></td></tr>";
        }else if(key='submit'){
            table.innerHTML+="<tr><td colspan='2'><input type="+key+" name='submit' id="+obj[key].id+" class='submit' /></td></tr>";
        }
        //每一个对象都是一个标签，一般为input
    }

}
var wrap=document.getElementsByClassName('wrap')[0];
EventUtil.addHandler(wrap,'click',function(e){
    var target=EventUtil.getTarget(e);
    switch(target.className){
        case 'btnAdd':
            var text=target.previousElementSibling;
            var form=target.parentNode.nextElementSibling;
            var obj=getMessage(text);
            createForm(obj,form);
            break;
    }
});

//创建表单

