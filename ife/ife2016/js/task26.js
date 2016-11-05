/**
 * Created by Administrator on 2016/11/4.
 */
//跨浏览器绑定
var EventUtil={
    addHandler:function(element,type,handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    getEvent:function(event){
        return event?event:window.event;
    }
};
var time;
var time1;
var btns=document.getElementsByTagName('BUTTON');
var body=window.body;
function AirShip(obj){
    this.shipEnergy=obj.shipEnergy;//能量（0-100）
    this.condition=obj.condition;//状态（飞行，停止）
    this.track=obj.track;
    this.angle=obj.angle;
    this.selfElement=obj.selfElement;
    this.selfElement.AirShip=this;
}
AirShip.prototype={
    constructor:AirShip,
    fly:function(){
        this.selfElement.style.display='block';
        //获取飞船现在的位置
        clearInterval(time1);
        var track=this.track;
        var r=getLength(track,'border-radius');
        var that=this;
        console.log(getLength(that.shipEnergy,'height'));
        that.condition=true;
        time = setInterval(function(){
            if(getLength(that.shipEnergy,'height')===0){
                that.condition=false;
                that.stopFly();
            }
            that.angle += 0.2 / r;
            console.log(getLength(that.shipEnergy,'height'));
            var leftMove = r - r * Math.cos(that.angle);
            var topMove = r * Math.sin(that.angle);
            $(that.selfElement).css('transform',('rotate('+that.angle*(180/Math.PI)+'deg)'));
            //改变飞船的形态
            $(that.selfElement).css('top',(130- topMove) + 'px');
            $(that.selfElement).css('left',(-10+ leftMove) + 'px');
            //改变飞船在图上的位置
            $(that.shipEnergy).css('height',(getLength(that.shipEnergy,'height')-40*0.03*0.01)+'px');
            //飞船的能量减少
        }, 10);
    },
    stopFly:function(){
        //飞船能量减少为0，停止
        //点击按钮二，飞船停止
        clearInterval(time);
        var that=this;
        var energyNew=getLength(that.shipEnergy,'height');
        console.log(getLength(that.shipEnergy,'height'));
        time1=setInterval(function(){
            if(getLength(that.shipEnergy,'height')<40){
                energyNew+=40*0.02*0.01;
                $(that.shipEnergy).css('height',energyNew+'px');
            }
        },10);
    },
    destroy:function(){
        this.selfElement.style.display='none';
    },
    createShip:function(){

    }
};
var planet1=new AirShip({shipEnergy:document.getElementsByClassName('energy')[0],condition:false,track:document.getElementsByClassName('track-1')[0],angle:0,selfElement:document.getElementById('airship-1')});
btns[0].onclick=function(){
    planet1.condition=true;
    planet1.fly();
};
btns[1].onclick=function(){
    planet1.condition=false;
    planet1.stopFly();
};
btns[2].onclick=function(){
    planet1.destroy();
};
//获取css中带有px的数值
function getLength(element,attribute) {
    return Number(getDefaultStyle(element,attribute).slice(0,-2));
}
//获取外部属性值
function  getDefaultStyle(obj,attribute){
    return obj.currentStyle?obj.currentStyle[attribute]:document.defaultView.getComputedStyle(obj,false)[attribute];
}

