let grievances;

// Shuffle using Fisher-Yates algorithm
function shuffleGrievances() {
    for (let i = grievances.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [grievances[i], grievances[j]] = [grievances[j], grievances[i]];
    }
}

function displayGrievances() {
    shuffleGrievances();
    for (let i = 0; i < grievances.length; i++) {
        $('#containers').prepend('<div class="content-pane-wrapper"><div class="container-fluid content-pane content-pane-grievance" style="background-image: url(' + grievances[i].image + ');"></div> <div class="text-wrapper"><p class="text-title  ">' + grievances[i].description + '</p></div></div>');
    }
}

function addGrievance(title, grievance, img, isNew) {
    grievances.unshift({
        description: grievance,
        image: img || null
    });
    if (!img) findImage(title, isNew);
}

function findImage(title, isNew) {
    $.getJSON('https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?', {
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
    grievances[0].image = img;
}

$(document).ready(function () {
    $.ajax({
        url: 'https://thirtyeightyseven.firebaseio.com/grievances.json',
        success: function (result) {
            grievances = result;
            displayGrievances();
        }
    });
    $('#submitButton').click(function () {
        addGrievance($('#formTitle').val(), $('#formDesc').val(), null, true);
        $('#formTitle').val('');
        $('#formDesc').val('');
    });
});

function createContainer() {
    $('#containers').prepend('<div class="content-pane-wrapper"><div class="container-fluid content-pane content-pane-grievance" style="background-image: url(' + grievances[0].image + ');"></div> <div class="text-wrapper"><p class="text-title  ">' + grievances[0].description + '</p></div></div>');
}