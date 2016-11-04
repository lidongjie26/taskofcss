/**
 * Created by Administrator on 2016/11/4.
 */
var btns=document.getElementsByTagName('BUTTON');
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
        //改变飞船在图上的位置
        var r=this.track.style.
        //改变飞船的形态
    },
    stopFly:function(){

    },
    destroy:function(){
        this.selfElement.style.display='none';
    },
    createShip:function(){

    }
};