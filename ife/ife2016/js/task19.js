
var EventUtil={
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else {
            element['on' + type] = handler;
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
var wrap= document.getElementById('content');
var textBox=document.getElementsByClassName('textBox')[0];
var value;
var newDiv;
var count;
EventUtil.addHandler(body,'click',function(event){
    var evt=EventUtil.getEvent(event);
    var target=EventUtil.getTarget(event);
    switch(target.className){
        case 'insertLeft':
            count=document.getElementsByClassName('item').length;
            if(count>=60){
                alert('超过限制');
            }else {
                value = textBox.value;
                if (value >= 10 && value <= 100) {
                    newDiv = document.createElement('div');
                    newDiv.style.marginTop = (100 - value) + 'px';
                    newDiv.name=value;
                    newDiv.style.height = value + 'px';
                    newDiv.className = 'item';
                    wrap.insertBefore(newDiv, wrap.firstChild);
                    textBox.value = '';
                } else {
                    alert('输入数字限制在10~100！');
                    textBox.value='';
                }
                textBox.focus();
            }
            break;
        case 'insertRight':
            count=document.getElementsByClassName('item').length;
            if(count>=60){
                alert('超过限制');
            }else {
                value = textBox.value;
                if (value >= 10 && value <= 100) {
                    newDiv = document.createElement('div');
                    newDiv.style.marginTop = (100 - value) + 'px';
                    newDiv.style.height = value + 'px';
                    newDiv.name=value;
                    newDiv.className = 'item';
                    wrap.appendChild(newDiv);
                    textBox.value = '';
                } else {
                    alert('输入数字限制在10~100！');
                    textBox.value='';
                }
                textBox.focus();
            }
            break;
        case 'pushLeft':
            wrap.removeChild(wrap.firstChild);
            break;
        case 'pushRight':
            wrap.removeChild(wrap.lastChild);
            break;
        case 'item':
            wrap.removeChild(target);
            break;
        case 'range':
            var arr=document.getElementsByClassName('item');
            var realArray=[];
            for(var j=0;j<arr.length;j++){
                realArray.push(arr[j]);
            }
            realArray.sort(function(a,b){
                var numA=Number(a.name);
                var numB=Number(b.name);
                return numA-numB;
            });
            wrap.innerHTML=null;
            for(var i=0;i<realArray.length;i++){
                wrap.appendChild(realArray[i]);
            }
            break;

    }
});