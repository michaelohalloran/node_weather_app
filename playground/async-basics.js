console.log('start app');

setTimeout(()=>{
    console.log('Inside callback');
}, 2000);

setTimeout(()=>{
    console.log('checking setTimeout');
}, 0);

console.log('finishing app');