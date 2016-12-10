/**
 * Created by 李冬杰 on 2016/12/10.
 */
var textBox=document.getElementsByClassName('textbox')[0];
var submit=document.getElementsByClassName('submit')[0];
var tip=document.getElementsByClassName('tip')[0];
function check() {
    var name=trim(textBox.value);
    if(name===''){
        tip.innerHTML='姓名不能为空';
        tip.style.color='#bc1717';
        textBox.style.border='1px solid #bc1717';
        return false;
    }
    else{
        var num=cal(name);
        var count=num+name.length;
        if(count>=4&&count<=16){
            tip.innerHTML='验证通过';
            tip.style.color='#008000';
            textBox.style.border='1px solid #008000';
            return true;
        }else{
            tip.innerHTML='必填，长度为4~16个字符';
            tip.style.color='#bc1717';
            textBox.style.border='1px solid #bc1717';
            return false;
        }
    }
}

function trim(str){
    return str.replace(/^\s+|\s$/g,'');
}
function cal(str){
    var re=/[\u4E00-\u9FA5]/g;
    if(re.test(str)){
        return str.match(re).length;
    }
    else{
        return 0;
    }
}