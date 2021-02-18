class Calculator{
    constructor(display=0.0, firstOperand=null, isSecond=false, secondOperand=null){
        this.display = display;
        this.firstOperand = firstOperand;
        this.isSecond = isSecond;
        this.secondOperand = secondOperand;
    }

    updateDisplay(value){
        this.display = value;
    }

    updateFirst(value){
        this.firstOperand = value;
        this.isSecond = false;
    }

    updateSecond(value){
        if(!this.isSecond){
            this.secondOperand = value;
            this.isSecond = true;
        }
    }


}

let calC = new Calculator();
console.log(x)
