const person = {
  name2: "Abdul rehman",
  age: 21,
  greet() {
    console.log("Hi, " + this.name2);
  },
};
// person.greet();

const sports = ["Cricket", "football", "hockey"];
// for (const item of sports) {
//     console.log(item)
// }
// console.log(sports.map((hobby) => "Hobby: " + hobby));
const copiedArr = [...sports];
// console.log(copiedArr);

const RestObj = (...args)=>{
    return args
}
// console.log(RestObj(1,2,3,4,5))
