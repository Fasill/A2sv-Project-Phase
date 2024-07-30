var readline = require('readline');
var todoStack = [];
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var lastId = 0;
var addItem = function (description) {
    var newItem = {
        id: lastId + 1,
        description: description
    };
    todoStack.push(newItem);
    console.log("Added item: ".concat(newItem.description));
    lastId++;
};
var displayItems = function () {
    console.log('Current To-Do List:');
    todoStack.forEach(function (item) {
        console.log("ID: ".concat(item.id, ", Description: ").concat(item.description));
    });
};
var editItem = function (id, message) {
    var item = todoStack.find(function (item) { return item.id === id; });
    if (item) {
        item.description = message;
        console.log("Edited item ID: ".concat(id, ", new description: ").concat(message));
    }
    else {
        console.log("Item with ID: ".concat(id, " not found."));
    }
};
var removeItem = function (id) {
    var index = todoStack.findIndex(function (item) { return item.id === id; });
    if (index !== -1) {
        var removedItem = todoStack.splice(index, 1)[0];
        console.log("Removed item ID: ".concat(removedItem.id, ", description: ").concat(removedItem.description));
    }
    else {
        console.log("Item with ID: ".concat(id, " not found."));
    }
};
var promptUser = function () {
    rl.question('Enter 1 to add task, 2 to display, 3 to edit, 4 to remove: ', function (response) {
        if (response === '1') {
            rl.question('Enter a to-do item: ', function (answer) {
                addItem(answer);
                promptUser();
            });
        }
        else if (response === '2') {
            displayItems();
            promptUser();
        }
        else if (response === '3') {
            rl.question('Enter the ID of the task that you want to edit: ', function (id) {
                rl.question('Enter new to-do item: ', function (message) {
                    editItem(parseInt(id), message);
                    promptUser();
                });
            });
        }
        else if (response === '4') {
            rl.question('Enter the ID of the task that you want to remove: ', function (id) {
                removeItem(parseInt(id));
                promptUser();
            });
        }
        else {
            console.log('Invalid option. Please enter 1, 2, 3, or 4.');
            promptUser();
        }
    });
};
promptUser();
