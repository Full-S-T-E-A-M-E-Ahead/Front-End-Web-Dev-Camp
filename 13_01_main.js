const arr = [1, 2, 3, 4, 5, 6];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

const printItemPlusOne = (item) => {
  console.log(item + 1);
};

for (let i = 0; i < arr.length; i++) {
  printItemPlusOne(arr[i]);
}

class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  printAge = () => {
    console.log(this.age);
  };
  printName = () => {
    console.log(this.name);
  };
  setName = (name) => {
    this.name = name;
  };
}

const myDog = new Dog("Spike", 4);
myDog.printAge();
myDog.printName();
myDog.setName("Lee");
myDog.printName();
