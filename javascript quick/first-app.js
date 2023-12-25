
const name = 'hiten'

age = 20

let hash = true

age = 21

const fun = (name,age,hash) => {
    var ans = ('name is : ' + name + ' age is : ' + age + ' hash : ' + hash ) ;
    
    return ans;
}

const add = (a,b) => a*b;


console.log(add(2,7));
console.log(fun(name,age,hash));