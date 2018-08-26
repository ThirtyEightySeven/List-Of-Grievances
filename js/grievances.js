const grievances = [
    'test 1',
    'test 2',
    'test 3',
];

// Shuffle using Fisher-Yates algorithm
function shuffleGrievances() {
    for (let i = grievances.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [grievances[i], grievances[j]] = [grievances[j], grievances[i]];
    }
}

function displayGrievances() {
    shuffleGrievances();
    grievances.forEach(function (grievance) {
        document.write('<div class="container-fluid content-pane">' + grievance + '</div>')
    });
}
