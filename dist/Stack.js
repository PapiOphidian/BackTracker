"use strict";
class Stack extends Array {
    constructor() {
        super(...arguments);
    }
    
    first(amount) {
        if (!Number.isInteger(amount) || amount === 0) return this[0];
        if (amount < 0) return this.last(amount * -1);
        
        return this.slice(0, amount);
    }
    
    last(amount) {
        if (!Number.isInteger(amount) || amount === 0) return this[this.length - 1];
        if (amount < 0) return this.first(amount * -1);
        
        return this.slice(-amount);
    }
}

module.exports = Stack;
