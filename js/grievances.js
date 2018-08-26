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

function addGrievance(title, grievance, img) {
    grievances.unshift(grievance);
    img = img || findImage(title);
    grievance_images.unshift(img);
}

function findImage(title) {
    google.load('search', '1');
    google.setOnLoadCallback(OnLoad());
    let search;

    function OnLoad() {
        search = new google.search.ImageSearch();
        search.setSearchCompleteCallBack(this, searchComplete, null);
        search.execute(title);
    }

    function searchComplete() {
        if (search.results && search.results.length > 0) {
            console.log(search.results[Math.floor(Math.random() * 20)]['url'])
            //document.body.style.backgroundImage = "url('" + search.results[rnd]['url'] + "')";
        }
    }
}

