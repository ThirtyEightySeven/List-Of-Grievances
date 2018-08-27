const grievances = [
    'Midnight Oil closes at 5pm on weekdays.',
    'Orientation lines start an hour before event starts.',
    'The Quarter Mile isn\'t well lit at night.',
    'Tech Crew blasts music at night around dorms.',
    'Half of Gracies is always blocked off due to spills.',
    'Gracies lacks silverware and cups during rushes.',
];

const grievance_images = [
    'null',
    'http://www.rit.edu/news/lib/filelib/200708/new_students.jpg',
    'null',
    'null',
    'null',
    'null',
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
    for (let i = 0; i < grievances.length; i++) {
        $('#containers').prepend('<div class="container-fluid content-pane grievance-container" style="' + 'background-image: url(' + grievance_images[i] + ');">' + grievances[i] + '</div>')
    }

}

function addGrievance(title, grievance, img, isNew) {
    grievances.unshift(grievance);
    if (!img) findImage(title, isNew);
}

function findImage(title, isNew) {
    $.getJSON('http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?', {
            tags: title,
            tagmode: 'any',
            format: 'json'
        },
        function (data) {
            addImage(data.items[Math.floor(Math.random() * data.items.length)]['media']['m'].replace("_m", "_b"));
            if (isNew) createContainer();
        });
}

function addImage(img) {
    grievance_images.unshift(img);
}

$(document).ready(function () {
    displayGrievances();
    $('#submitButton').click(function () {
        addGrievance($('#formTitle').val(), $('#formDesc').val(), null, true);
        $('#formTitle').val('');
        $('#formDesc').val('');
    });
});

function createContainer() {
   $('#containers').prepend('<div class="container-fluid content-pane grievance-container" style="' + 'background-image: url(' + grievance_images[0] + ');">' + grievances[0] + '</div>')
}