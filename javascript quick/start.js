const person = {
    name : 'shubham' ,
    age : 24 ,

    greet : () =>
    {
        console.log('hello guys my name is : ' + this.name);
    }
}

const printname = (pers) => {
    console.log(pers.name);
}

printname(person);

const {name,age} = person; // object destructring 

console.log(name,age);


// const coperson = {...person};

// console.log(coperson);

const array = ['sports' , 'cookies',true,1]

console.log(array.map(arr => '123: ' + arr));
for ( let arr of array)
{
    console.log(arr);
}


// array.push('Programming');


// const copy = [...array]  // spread operator 

// console.log(copy);

// const restop = (...arg) =>{
//     return arg;
// }

// console.log(restop(1,2,3,4,5));