const readline = require('readline');

interface Item {
    id: number;
    description: string;
}

const todoStack: Item[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let lastId = 0
const addItem = (description: string) => {
    const newItem: Item = {
        id: lastId + 1,
        description: description
    };
    todoStack.push(newItem);
    console.log(`Added item: ${newItem.description}`);
    lastId ++;
};

const displayItems = () => {
    console.log('Current To-Do List:');
    todoStack.forEach(item => {
        console.log(`ID: ${item.id}, Description: ${item.description}`);
    });
};

const editItem = (id: number, message: string) => {
    const item = todoStack.find(item => item.id === id);
    if (item) {
        item.description = message;
        console.log(`Edited item ID: ${id}, new description: ${message}`);
    } else {
        console.log(`Item with ID: ${id} not found.`);
    }
};

const removeItem = (id: number) => {
    const index = todoStack.findIndex(item => item.id === id);
    if (index !== -1) {
        const removedItem = todoStack.splice(index, 1)[0];
        console.log(`Removed item ID: ${removedItem.id}, description: ${removedItem.description}`);
    } else {
        console.log(`Item with ID: ${id} not found.`);
    }
};

const promptUser = () => {
    rl.question('Enter 1 to add task, 2 to display, 3 to edit, 4 to remove: ', (response) => {
        if (response === '1') {
            rl.question('Enter a to-do item: ', (answer) => {
                addItem(answer);
                promptUser();
            });
        } else if (response === '2') {
            displayItems();
            promptUser();
        } else if (response === '3') {
            rl.question('Enter the ID of the task that you want to edit: ', (id) => {
                rl.question('Enter new to-do item: ', (message) => {
                    editItem(parseInt(id), message);
                    promptUser();
                });
            });
        } else if (response === '4') {
            rl.question('Enter the ID of the task that you want to remove: ', (id) => {
                removeItem(parseInt(id));
                promptUser();
            });
        } else {
            console.log('Invalid option. Please enter 1, 2, 3, or 4.');
            promptUser();
        }
    });
};

promptUser();
