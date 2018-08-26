const grievances = [
    'Midnight Oil closes at 5pm on weekdays.',
    'Orientation lines start an hour before event starts.',
    'The Quarter Mile isn\'t well lit at night.',
    'Tech Crew blasts music at night around dorms.',
];

const grievance_images = [
    'path',
    'path',
    'path',
    'path,'
];

// Shuffle using Fisher-Yates algorithm
function shuffleGrievances() {
    for (let i = grievances.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [grievances[i], grievances[j]] = [grievances[j], grievances[i]];
        [grievance_images[i], grievance_images[j]] = [grievance_images[j], grievance_images[i]];
    }
}

function displayGrievances() {
    shuffleGrievances();
    grievances.forEach(function (grievance) {
        document.write('<div class="container-fluid content-pane">' + grievance + '</div>')
    });
}

function addGrievance(grievance, img) {
    grievances.unshift(grieviance);
    img = img || 'default-path';
    grievance_images.unshift(img);
}
