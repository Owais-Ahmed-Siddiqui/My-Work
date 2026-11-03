setTimeout(() => {
    console.log("Task-1 is completed");

    setTimeout(() => {
        console.log("Task-2 is completed");

        setTimeout(() => {
            console.log("Task-3 is completed");

            setTimeout(() => {
                console.log("Task-4 is completed");
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);

function task1(callback) {
    setTimeout(() => {
        console.log("Task-1 Completed");
        callback();
    }, 1000);
}

function task2(callback) {
    setTimeout(() => {
        console.log("Task-2 Completed");
        callback();
    }, 1000);
}

function task3(callback) {
    setTimeout(() => {
        console.log("Task-3 Completed");
        callback();
    }, 1000);
}

function task4() {
    setTimeout(() => {
        console.log("Task-4 Completed");
    }, 1000);
}

// Callback Hell implementation shown on screen
task1(function () {
    task2(function () {
        task3(function () {
            task4(function () {
                console.log("All the task are completed");
            });
        });
    });
});
