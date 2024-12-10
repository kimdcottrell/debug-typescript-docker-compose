interface Person {
    firstName: string;
    lastName: string;
}

class Student {
    fullName: string;
    constructor( 
        public firstName: string,
        public middleInitial: string,
        public lastName: string
    ) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }

}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student( "Kim", "D", "Cottrell" );

console.log(greeter(user));

// define a const of an array of strings
export const COLORS: string[] = ["black", "COLORSbrown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"] as const
// define the exact typehinting of the func param
type Color = typeof COLORS[number]

// ARROW FUNCTION: shorthand the function, the arguments, and the one line operation that is the return statement
export const colorCode = (color: Color) : number => COLORS.indexOf(color)

// the above could also be written
type FetchColor = (color: Color) => number
let get_color: FetchColor = (color: Color) => COLORS.indexOf(color)

// types, yay
let username: string = "kimdcottrell"
let age: number = 33
let isAdmin: boolean = true

// overloading functions
function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(param1: number, param2?: number, param3?: number): Date {
    if (param2 !== undefined && param3 !== undefined) {
        return new Date(param3, param1 - 1, param2);
    }
    return new Date(param1);
}
let date1: Date = createDate(1627845270000); // Using timestamp
let date2: Date = createDate(8, 1, 2021);    // Using month, day, year

enum Status {
    Pending = 1,
    InProgress,
    Completed,
    Failed
}

let currentStatus: Status = Status.Failed
console.log(currentStatus)