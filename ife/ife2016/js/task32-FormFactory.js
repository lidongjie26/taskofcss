/**
 * Created by 李冬杰 on 2017/1/9.
 */
/*
* 功能
* 1.focus时显示提示功能
* 2.验证功能
* 3.验证结果的显示处理
* 4.通过json数据创建html,将函数绑定
* 5.
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
            table.innerHTML+="<tr><th><label for="+key+" value="+obj[key].label+">"+obj[key].label+"</label></th><td><input type="+obj[key].type+"id=+"+obj[key].id+"name="+key+"class="+key+"></td></tr>";
        }else if(key=='submit'){
            table.innerHTML+="<tr><td colspan='2'><input type="+key+" name='submit' id="+obj[key].id+" class='submit' /></td></tr>";
        }
        //每一个对象都是一个标签，一般为input
    }

}
//创建表单
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
//focus事件的处理
EventUtil.addHandler(wrap,'focus',function(e){
    var target=EventUtil.getTarget(e);
    console.log(target);
    switch(target.className){
        case 'name':
            break;
    }
});

/**
 * 表单工厂
 * 作用是根据要求1.建立表单元素2.加载到html中3.返回建立的元素以便绑定事件。
 */
var FormFactory=function(wapperId){
    this.wapper=document.getElementById(wapperId);
};
/**
 * 创建Input
 * @param config
 * 示例：
 * {
        id : "name",
        label : "姓名",
        type:"input",
        validators: ['isNotEmpty', 'isValidName'], //验证器
        rule : "必填，长度为4~16个字符",
        success : "姓名格式输入正确"
    }
 * @returns {ValControl}
 */
FormFactory.prototype.createForm=function(config){

    if(config.type==='button'){
        return this.createBtn(config);
    }else if(config.type==='input'){
        return this.createInput(config);
    }
};
FormFactory.prototype.createInput=function(config){
    //创建label，和input，加上id和class。
    var divWrap=document.createElement('div');
    divWrap.className='form-group';

    var label=document.createElement('label');
    label.value=config.label;
    label.for=config.id;
    divWrap.appendChild(label);

    var input=document.createElement('input');
    input.type='text';
    input.name=config.id;
    input.id=config.id;
    input.dataset.rule=config.rule;
    input.dataset.success=config.success;

    var p=document.createElement('p');
    p.className='info';

    var inputGroup=document.createElement('div');
    inputGroup.className='input-group';
    inputGroup.appendChild(input);
    inputGroup.appendChild(p);

    divWrap.appendChild(inputGroup);
    this.wapper.appendChild(divWrap);

    var valCtl=new valControl(config.id);
    valCtl.validators=config.validators;
    return valCtl;
};

/**
 * 创建Button
 * @param config
 * submit:{
        id:"validate",
        value : "验证",
        type:"button",
        fail:'提交失败',
        success:'提交成功'
    }
 */
FormFactory.prototype.createBtn=function(config){
    var divWrap=document.createElement('div');
    divWrap.className='form-group';

    var btn=document.createElement('input');
    btn.id=config.id;
    btn.value=config.value;
    btn.type=config.type;
    btn.dataset.fail=config.fail;
    btn.dataset.success=config.success;

    divWrap.appendChild(btn);
    this.wapper.appendChild(divWrap);
    return btn;
};



/**
 * 封装需要验证的控件
 * @param id
 * @param validators
 * @constructor
 */




