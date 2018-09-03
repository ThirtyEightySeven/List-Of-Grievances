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
        $('#entry').prepend('<li class="cards__item"><div class="card"><img class="card__image" src="' + grievances[i].image + '"></img><div class="card__content"><div class="card__title">' + grievances[i].title + '</div><p class="card__text">' + grievances[i].description + '</p><button class="btn btn--block">Button</button></div></div></li>');
    }
}

function addGrievance(title, grievance, img, isNew) {
    grievances.unshift({
        title: title,
        description: grievance,
        image: img || null,
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
    $('#entry').prepend('<li class="cards__item"><div class="card"><img class="card__image" src="' + grievances[0].image + '"></img><div class="card__content"><div class="card__title">' + grievances[0].title + '</div><p class="card__text">' + grievances[0].description + '</p><button class="btn btn--block card__btn">Button</button></div></div></li>');
}