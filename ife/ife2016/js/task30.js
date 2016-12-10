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
        tip.style.visibility='visible';
    }
    var wrap=document.getElementsByClassName('wrap')[0];
    wrap.onfocus=function(event){
        var target=EventUtil.getTarget(event);
        switch(target.className){
            case 'textbox':
                showTip(target);
                break;
        }
    };

};
