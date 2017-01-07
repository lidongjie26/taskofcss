/**
 * Created by 李冬杰 on 2016/12/10.
 */
window.onload=function(){
    var EventUtil={
        addHandler:function(element,type,handler){
            if(element.addEventListener){
                element.addEventListener(type,handler,false);
            }
            else if(element.attachEvent){
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
    function showTip(element){
        var tip=element.nextElementSibling;
        $(tip).css('visibility','visible');
    }
    function Trim(str){
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
    var checkResult={
        tip:'',
        right:false
    };
    var inputEles = [$('#name'), $('#password'), $('#comfirm'), $('#email'), $('#tel')];
    function checkValue(ele){
        var value=ele.value;
        value=Trim(value);
        var len=value.length+cal(value);
        if(value==''){
            checkResult.tip='不能为空';
            checkResult.right=false;
            return;
        }
        if(ele==inputEles[0][0]){
            if(len>=4&&len<=16){
               checkResult.tip='验证通过';
                checkResult.right = true;
            }else{
                checkResult.tip='长度为4~16个字符';
                checkResult.right=false;
            }
        }
        if(ele==inputEles[1][0]){
            if(len>=4&&len<=16){
                checkResult.tip='密码可用';
                checkResult.right = true;
            }else{
                checkResult.tip='长度为4~16个字符';
                checkResult.right=false;
            }
        }
        if(ele==inputEles[2][0]){
            if(value===inputEles[1][0].value.trim()&&value!==''){
                checkResult.right = true;
                checkResult.tip = '密码正确';
            } else {
                checkResult.right = false;
                checkResult.tip = '两次密码输入要相同';
            }
        }
        if(ele==inputEles[3][0]){
            var szReg=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
            var bChk=szReg.test(value);
            if(bChk){
                checkResult.tip='正确';
                checkResult.right=true;
            }else{
                checkResult.tip='邮箱格式错误';
                checkResult.right=false;
            }
        }
        if(ele==inputEles[4][0]){
            var szReg=/^1[34578]\d{9}$/;
            var bChk=szReg.test(value);
            if(bChk){
                checkResult.tip='正确';
                checkResult.right=true;
            }else{
                checkResult.tip='手机号码有误';
                checkResult.right=false;
            }
        }
    }
    $('.textbox').blur(function(e){
        var target=EventUtil.getTarget(e);
        checkValue(target);
        console.log(inputEles[0]);
        var span=target.nextElementSibling;
        span.innerHTML=checkResult.tip;
        if(checkResult.right){
            $(span).css('color','#008000');
        }else {
            $(span).css('color','#FF0000');
        }
        showTip(target);
    });
    $('.textbox').focus(function(e){
        var target=EventUtil.getTarget(e);
        showTip(target);
    });
    var right=true;
    $('#submit').click(function(){
        var len=inputEles.length;
        for(var i=0;i<len;i++){
            var input=inputEles[i][0];
            showTip(input);
            checkValue(input);
            var span=input.nextElementSibling;
            console.log(span);
            span.innerHTML=checkResult.tip;
            if (checkResult.right) {
                $(input).css('border','2px solid green');
                $(span).css('color','green');
            } else {
                $(input).css('border','2px solid red');
                $(span).css('color','red');
                right = false;
            }

        }
        if(right){
            alert('提交成功');
        }else {
            alert('提交失败，请检查输入');
        }
    });

};


