"use strict";


//let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。let不存在变量提升
{
    let a = 10;
    var b = 1;
}

console.log(b);

//for循环的计数器，就很合适使用let命令。
var arr = [1,2,3];
for(let i = 0; i < arr.length; i++){}
//*** console.log(i); //i is not defined

var tmp = 123;
console.log(tmp);
if (true) {
    //tmp = 'abc'; // ReferenceError
    let tmp; //被转化为if内部的变量，let声明变量前，对tmp赋值会报错。
}
//*** console.log(tmp); //tmp is not defined


if (true) {
    // TDZ开始
    //tmp = 'abc'; // ReferenceError   tmp is not defined
    //console.log(tmp); // ReferenceError   tmp is not defined

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}

function func(arg) {
    //let arg; // 报错
    console.log(arg);
}
func('1');


function setTime(){
    setTimeout(function(){
        console.log(2);
        resolve(value);
    });
}

var promise = new Promise(function(resolve, reject) {
    // ... some code
    setTimeout(function(){
        console.log(11112);
        resolve();
    },2000);
    /*if (true){
     resolve(value);
     } else {
     reject(error);
     }*/
});

promise.then(function(){
    console.log(1);
});

