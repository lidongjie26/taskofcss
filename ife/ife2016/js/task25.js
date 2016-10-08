/**
 * Created by Administrator on 2016/10/8.
 */
var imageX=true,
     i,
    target,
    textBox=document.getElementsByClassName('textBox')[0],
    textAdd,
    divAdd,
    selectedDiv;
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
    getTarget:function(event){
        return event.target||event.srcElement;
    }
};
var body=document.body;
EventUtil.addHandler(body,'click',function(event){
    target=EventUtil.getTarget(event);
    switch(target.className){
        case 'image':
            var selectCatalog=target.parentNode.parentNode;
            var divSelected=selectCatalog.children;
            if(imageX){
                //改为减号，打开
                target.src='image/minus.ico';
                imageX=false;
                console.log(divSelected.length);
                for(i=0;i<divSelected.length;i++){
                    if(divSelected[i].tagName=='DIV'){
                        if(divSelected[i].style.display=='none'){
                            divSelected[i].style.display='block';
                        }
                    }
                }
            }else{
                //改为加号，关闭
                target.src='image/plus.ico';
                imageX=true;
                for(i=0;i<divSelected.length;i++){
                    if(divSelected[i].tagName=='DIV'){
                        divSelected[i].style.display='none';
                    }
                }
            }
            break;
        case 'listName':
            clearAll();
            target.style.backgroundColor='#4169E1';
            selectedDiv=target;
            break;
        case 'btnAdd':
            textAdd=textBox.value;
            textAdd=trim(textAdd);
            if(textAdd!==''){
                divAdd=document.createElement('div');
                divAdd.innerHTML='<p class="listName">        <img class="image" src="image/plus.ico">'+textAdd+'</p>';
                selectedDiv.appendChild(divAdd);
                divAdd.className='three';
                console.log(divAdd.parentNode);
                textBox.value='';
                textBox.focus();
            }else{
                alert('输入为空，请重新输入！');
                textBox.value='';
                textBox.focus();
            }
    }
});
function clearAll(){
    var items=document.getElementsByClassName('listName');
    for(i=0;i<items.length;i++){
        items[i].style.backgroundColor='#fff';
    }
}
function trim(str){
    return str.replace(/^\s+|\s$/g,'');
}