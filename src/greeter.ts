interface Persona {
  firstName: string;
  lastName: string;
}

class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string,
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

function greeter(person: Persona) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

const user = new Student("Kim", "D", "Cottrell");

console.log(greeter(user));

// define a const of an array of strings
export const COLORS: string[] = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
] as const;
// define the exact typehinting of the func param
type Color = (typeof COLORS)[number];
// ARROW FUNCTION: shorthand the function, the arguments, and the one line operation that is the return statement
export const colorCode = (color: Color): number => COLORS.indexOf(color);

// the above could also be written
type FetchColor = (color: Color) => number;
const get_color: FetchColor = (color: Color) => COLORS.indexOf(color);

// types, yay
const username = "kimdcottrell";
const age = 33;
const isAdmin = true;

// overloading functions
function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(param1: number, param2?: number, param3?: number): Date {
  if (param2 !== undefined && param3 !== undefined) {
    return new Date(param3, param1 - 1, param2);
  }
  return new Date(param1);
}
const date1: Date = createDate(1627845270000); // Using timestamp
const date2: Date = createDate(8, 1, 2021); // Using month, day, year

enum Status {
  Pending = 1,
  InProgress,
  Completed,
  Failed,
}

const currentStatus: Status = Status.Failed;
console.log(currentStatus);

// you can extend a normal class too
abstract class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  abstract greet(): string; // Abstract method
  getDetails(): string {
    return `${this.name}, ${this.age} years old`;
  }
}

class Employee extends Person {
  employeeId: number;
  constructor(name: string, age: number, employeeId: number) {
    super(name, age);
    this.employeeId = employeeId;
  }
  greet(): string {
    return `Hello, I am ${this.name}, and my employee ID is ${this.employeeId}.`;
  }
  getDetails(): string {
    return `${this.name}, ${this.age} years old and I love working here.`;
  }
}

const employee = new Employee("Bob", 25, 1234);
console.log(employee.greet()); // Outputs: Hello, my name is Bob. My employee ID is 1234.
console.log(employee.getDetails());

interface Drivable {
  start(): void;
  stop(): void;
}

class Car implements Drivable {
  start(): void {
    console.log("Car started.");
  }
  stop(): void {
    console.log("Car stopped.");
  }
}

const car = new Car();
car.start(); // Outputs: Car started.
car.stop(); // Outputs: Car stopped.

class Doggo {
  // paramter properties lets you shorthand code
  constructor(public name: string) { }
  public sayHi(): string {
    return `hi ${this.name}`;
  }
}

const oreo = new Doggo("Oreo");
console.log(oreo.sayHi());

class MathUtils {
  static PI = 3.14159;
  static calculateCircumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }
}

console.log(MathUtils.PI); // Outputs: 3.14159
console.log(MathUtils.calculateCircumference(10)); // Outputs: 62.8318

// async function doStuff():{
//     const [err,data] ?= await func(codingbeautyde.com)
// }

const coolProgrammer = (test: string | number): string | number => {
  if (typeof test == "string") {
    return "Kim";
  } else {
    return "ZeroCool";
  }
};

console.log(coolProgrammer("anyone!"));
console.log(coolProgrammer(0));

// 👇 We define a generic value called T with <T>
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const numberArray: number[] = [1, 2, 3, 4, 5];
const stringArray: string[] = ["apple", "banana", "orange"];

// 👇 Note the generic values being passed in <number> & <string>
const firstNumber = getFirstElement<number>(numberArray);
const firstString = getFirstElement<string>(stringArray);
