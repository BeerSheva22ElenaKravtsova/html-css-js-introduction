const arr = [1,2,3,'four','five',true];
console.log(typeof arr);

function printArray(arr){
    for (let index = 0; index < arr.length; index++) {
       console.log(arr[index]);
    }
}

printArray(arr);
arr[10]=100500;
console.log(arr);
printArray(arr);
