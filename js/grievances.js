let grievances;
let topWindow;
let windowHeight;
let position;

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
        $('#entry').prepend('<div class="cards"><img src="' + grievances[i].image + '"></img><div class="card-bot"><h2 class="card-title">' + grievances[i].title + '</h2><div class="card-separator"></div><p class="card-comments">' + grievances[i].description + '</p><button class="btn btn--block card__btn">Button</button></div></div>');
    }
    sizeWindow();
    }

function addGrievance(title, grievance, img, isNew) {
    grievances.unshift({
        title: title,
        description: grievance,
        image: img || null,
        stats: {
            upvotes: 0,
            downvotes: 0
        }
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
    $('#entry').prepend('<div class="cards"><img src="' + grievances[0].image + '"></img><div class="card-bot"><h2 class="card-title">' + grievances[0].title + '</h2><div class="card-separator"></div><p class="card-comments">' + grievances[0].description + '</p><button class="btn btn--block card__btn">Button</button></div></div>');
}

function upvote(id) {
    grievances[id].stats.upvotes++;
}

function downvote(id) {
    grievances[id].stats.downvotes++;
}

$(window).scroll(function () {
    topWindow = $(window).scrollTop();
    topWindow = topWindow * 1.5;
    windowHeight = $(window).height();
    position = topWindow / windowHeight;
    position = 1 - position;
    $('.arrow-wrap').css('opacity', position);
});
