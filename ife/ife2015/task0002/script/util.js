function isArr(src) {
    return Object.prototype.call(src)==='[object Array]';
}
function  isFunction(src) {
    return Object.prototype.call(src)==='[object Function]';
}
function cloneObject(src){
   var copy=src;
     var  key;
    if(src instanceof Date){
        copy=new Date(src.getTime());
        return copy;
    }
   if(src instanceof Array){
        copy=[];
        for ( key in src){
            copy[key]=cloneObject(src[key]);
        }
        return copy;
    }
     if(src instanceof Object){
        copy={};
        for( key in src){
            copy[key]=cloneObject(src[key]);
        }
        return copy;
    }else {
         return src;
     }
}

var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);
console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);

//对数据进行去重操作，只考虑数组中的元素为数字或者字符串，返回去重后的数组
function uniqArray(arr){
    var newArr=[];
    newArr.push(arr[0]);
    for(var i=1;i<arr.length;i++){
        var result=arr.slice(0,i).every(function(item ,index,array){
            return(item!=arr[i]);
            });
        if(result){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
var a=[1,3,5,6,7,5,3,3,4,5,6,7,8,9,3,2,2,3,4,5,6,7,8,9,1,0];
var b=uniqArray(a);
console.log(b);

//完成一个简单的trim函数，去除一个字符串的头部和尾部的空白字符。
/*function simpleTrim(str){
    function isEmpty(c){
     return /\s/.test(c);
    }
    var len=str.length;
    for(var i = 0;i < len && isEmpty(str.charAt(i));i++);
    if(i===len){
        return '';
    }
    for(var j=len;j && isEmpty(str.charAt(j-1);j--));
    return str.substring(i,j);
}
var str='   afdssfsd    ';
console.log(simpleTrim(str));*/



function simpleTrim(str){
    function isEmpty(c){
        return /\s/.test(c);
    }
    var len=str.length;
    for( var i = 0;i < len && isEmpty(str.charAt(i));i++);
    if(i===len){
        return '';
    }
    for (var j = len; j && isEmpty(str.charAt(j-1)); j--);
    return str.substring(i,j);
}
var str='   afds   sfsd    ';
console.log(simpleTrim(str));


function trim(str){
    return str.replace(/^\s+|\s$/g,'');
}
console.log(trim(str));


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for(var i = 0,len = arr.length;i < len; i++){
        fn(arr[i],i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
/*var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item);
}
each(arr, output);  // java, c, php, html*/
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var num = 0;
    for(x in obj){
        if(obj.hasOwnProperty(x)){
            num++;
        }
    }
    return num;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3


// 判断是否为邮箱地址
function isEmail(emailStr) {
    // return (/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i).test(emsilStr);
    return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
}

console.log(isEmail('860692354@qq.com'))
// 判断是否为手机号
function isMobilePhone(phone) {
    phone = phone + '';
    // return (/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/).test(phone);
    return phone.search(/^1[3|4|5|7|8][0-9]{9}$/) !== -1;
}

console.log(isMobilePhone(18101361830));