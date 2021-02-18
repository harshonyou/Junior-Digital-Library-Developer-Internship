/*
quick revision to the syntax of NodeJs with
very overly complicated, simple Hello, World! Program
*/
class print{
    constructor(toPrint){
        this.toPrint = toPrint;
    }
    log(){
        console.log(this.toPrint);
    }
}

let hello = new print("Hello, World!");
hello.log();