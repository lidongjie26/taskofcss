/**
 * Created by Administrator on 2016/10/8.
 * 需求1：点击加号，子目录打开，变为减号，再点击减号，子目录关闭，变为加号
 * 需求2：点击选中某个目录，删除按钮删除，增加按钮则textbox中的文本作为子目录增加到中间去。
 * 需求3：查询，查询结果换一种效果显示，查询后打开其路径。
 * 问题1：子节点如何做到缩进比父节点多？
 * 问题2：点击两次才能打开子节点
 */
var i=0;
var body=document.body;
var root=document.getElementById('root');
var nodes=document.getElementsByTagName('div');
var oA=document.getElementsByTagName('a');
for(i=0;i<nodes.length;i++){
    nodes[i].aFlag=true;
}
root.firstElementChild.aFlag=false;
var EventUtil={
    addEvent:function(element,type,handler){
            element['on'+type]=handler;
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    }
};
EventUtil.addEvent(body,'click',function(event){
    var target=EventUtil.getTarget(event);
    var nodeTarget=target.parentNode;
    switch(target.className){
        case 'display':
            display(target,nodeTarget.aFlag);
            //aFlag为true，表示是折叠状态，现在需要打开，
            if(nodeTarget.aFlag){
                target.innerHTML='-';
                nodeTarget.aFlag=false;
            }
            else{
                target.innerHTML='+';
                nodeTarget.aFlag=true;
            }
            break;
    }
});
function display(node,flag){
    var nodeList=[];
    nextSiblings(node,nodeList);
    if(flag){
        for( i=0;i<nodeList.length;i++){
            nodeList[i].style.display='block';
            nodeList[i].aFlag=false;
        }
    }
    var nodes=node.parentNode.getElementsByTagName('div');
    for(i=0;i<nodes.length;i++) {
            if (nodes[i].aFlag) {
                nodes[i].style.display='none';
                nodes[i].aFlag=false;
            } else {
                nodes[i].style.display = 'block';
                nodes[i].aFlag=true;
            }
    }
    nodeList=[];
}
function nextSiblings(node,list){
    if(node){
        list.push(node);
        nextSiblings(node.nextElementSibling,list);
    }
}