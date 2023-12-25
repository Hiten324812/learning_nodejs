// const callMyCallbackLater = (callback, duration) => {
//     setTimeout(() => {
//         callback()
//     }, duration)
// }
 
// const sayHello1 = () => console.log('Hello, World! 1234');
// const sayHello2 = () => console.log('Hello World! 5678');
 
// callMyCallbackLater(sayHello1, 1000);
// callMyCallbackLater(sayHello2, 2000);

const fetchdata = call1 =>{
    setTimeout(() => {
       call1('done!');
    }, 1500);
}


setTimeout(() => {
    console.log('hello world !');
    fetchdata(text => {
        console.log(text);
    })
},2000);

console.log('1');
console.log('2');