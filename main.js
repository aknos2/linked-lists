#!/usr/bin/env node

class Node {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    appendValue(value) {
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.nextNode = newNode;
            this.tail = newNode;
        }
    }

    prependValue(value) {
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.nextNode = this.head;
            this.head = newNode;
        }
    }

    size() {
        let count = 0;
        let current = this.head;
        while (current !== null) {
            count++;
            current = current.nextNode;
        }
        return count;
    }

    printList() {
        let current = this.head;
        let result = [];
        while (current !== null) {
            result.push(current.value);
            current = current.nextNode;
        }
        console.log(result.join(", "));
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    at(index) {
       if (index < 0) return null;

       let current = this.head;
       let count = 0;

       while (current !== null) {
           if (count === index) {
            return current.value;
           }
           count++
           current = current.nextNode;
       }

       return null;
    }

    pop() {
        if (this.head === null) return null;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return this.head.value;
        }

        let current = this.head;
        while (current.nextNode !== this.tail) {
            current = current.nextNode;
        }

        this.tail = current;
        this.tail.nextNode = null;

        return this.tail.value;
    }

    contains(value) {
        if (this.head === null) return false;
    
        let current = this.head; 
    
        while (current !== null) {
            if (value == current.value) {
                return true;
            }
            current = current.nextNode; 
        }
        return false;
    }
    

    find(value) {
        if (this.head == null) return -1;
    
        let index = 0;
        let current = this.head;
    
        while (current !== null) {
            console.log(`Checking node at index ${index}: ${current.value}`);
            if (current.value === value) {
                return index;
            }
            index++;
            current = current.nextNode;
        }
        return -1;
    }

    toString() {
        if (this.head === null) return "";
        let current = this.head;
        let result = "";

        while (current !== null) {
            result += `( ${current.value} ) ${current.nextNode ? "-> " : ""}`;
            current = current.nextNode;
        }

        return console.log(result);
    }
    
    insertAt(value, index) {
        if (index < 0) return null;
        const newNode = new Node(value);

        if (index === 0) {
            newNode.nextNode = this.head;
            this.head = newNode;
            if (this.tail === null) this.tail = newNode;
            return;
        }

        let current = this.head;
        let currentIndex = 0;

        while (current !== null && currentIndex < index - 1) {
            current = current.nextNode;
            currentIndex++
        }

        newNode.nextNode = current.nextNode;
        current.nextNode = newNode;

        if (newNode.nextNode === null) {
            this.tail = newNode;
        }
    }

    removeAt(index) {
        if (index < 0 || this.head === null) return null;

        if (index === 0) {
            const removedValue = this.head.value;
            this.head = this.head.nextNode;
            if (this.head === null) this.tail = null;
            return removedValue;
        }

        let current = this.head;
        let currentIndex = 0;

        while (current !== null && currentIndex < index - 1) {
            current = current.nextNode;
            currentIndex++;
        }

        if (current === null || current.nextNode === null) return null;

        const removedValue = current.nextNode.value;
        current.nextNode = current.nextNode.nextNode;

        // Update the tail if the removed node was the tail
        if (current.nextNode === null) {
            this.tail = current;
        }
        return removedValue;
    }
}

const list = new LinkedList();

list.appendValue("dog");
list.appendValue(2);
list.prependValue("first");
list.appendValue("poop");

list.printList(); 

console.log(`Total nodes: ${list.size()}`);
console.log(`First head: ${list.getHead().value}`);
console.log(`Last node: ${list.getTail().value}`);
console.log(`Index 0 is: ${list.at(0)}`);
console.log(list.contains("dog"));
console.log(`"first" is index: ${list.find("first")}`);

list.pop();
list.printList();
list.toString();
list.insertAt("cat", 1);
list.toString();
list.removeAt(3);
list.toString();
