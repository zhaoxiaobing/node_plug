"use strict";


//let����������������������÷�������var�������������ı�����ֻ��let�������ڵĴ��������Ч��let�����ڱ�������
{
    let a = 10;
    var b = 1;
}

console.log(b);

//forѭ���ļ��������ͺܺ���ʹ��let���
var arr = [1,2,3];
for(let i = 0; i < arr.length; i++){}
//*** console.log(i); //i is not defined

var tmp = 123;
console.log(tmp);
if (true) {
    //tmp = 'abc'; // ReferenceError
    let tmp; //��ת��Ϊif�ڲ��ı�����let��������ǰ����tmp��ֵ�ᱨ��
}
//*** console.log(tmp); //tmp is not defined


if (true) {
    // TDZ��ʼ
    //tmp = 'abc'; // ReferenceError   tmp is not defined
    //console.log(tmp); // ReferenceError   tmp is not defined

    let tmp; // TDZ����
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}

function func(arg) {
    //let arg; // ����
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

