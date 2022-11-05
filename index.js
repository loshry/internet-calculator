class calculator {
    constructor (previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear }
    
   clear () {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    
    chooseOperation(operation) {
        if(this.currentOperand === "") return
        if(this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }
    compute () {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case "&#43;":
                computation = prev + current
                break
            case "&#8722;":
                computation = prev - current
                break
            case "&#215;":
                computation = prev * current
                break
            case "&#247;":
                computation = prev / current
                break
            default:
                return
    

        }
        this,currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
}
getDisplayNumber(number) {
    const stringNUmber =number.toString()
    const integerDigits = parseFloat(stringNumber.split(",")[0])
    const decimalDigits = stringNUmber.split(".")[1]
    let integerDiplay 
    if (isNaN(integerDigits)) {
        integerDiplay = ""
    }
    else {
        integerDiplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
        return `${integerDiplay}.${decimalDigits}`
    }
    else {
        return integerDiplay
    }
    }

    updateDisplay () {
        this.currentOperandTextElement.innerHTML =
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerHTML =
         `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerHTML = ""
        }
    }
}







const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click" , () => {
        calculator.appendNumber(button.innerHTML)

        calculator.updateDisplay()
    });
    
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    });
});





equalsButton.addEventListener("click", button => {
   
       calculator.compute()
       calculator.updateDisplay ()
    });
    

allClearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
});




deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})