const grievances = [{
        description: 'Midnight Oil closes at 5pm in the summer.',
        image: 'https://www.rit.edu/fa/diningservices/sites/rit.edu.fa.diningservices/files/styles/juicebox_large/public/Midnight_0620.jpg?itok=rmsF2S4p'
     },
    {
        description: 'Orientation lines start an hour before event starts.',
        image: 'https://www.rit.edu/news/lib/filelib/200708/new_students.jpg'
    },
    {
        description: 'The Quarter Mile isn\'t well lit at night.',
        image: 'https://www.ntid.rit.edu/cmmsdb/sites/www.ntid.rit.edu.cmmsdb/files/photos/big-shot_rit0024_900.jpg'
    },
    {
        description: 'Tech Crew blasts music at night around dorms.',
        image: 'https://www.b-metro.co.zw/wp-content/uploads/2018/08/loud-music.jpg'
    },
    {
        description: 'Half of Gracies is always blocked off due to spills.',
        image: 'https://igx.4sqi.net/img/general/699x268/11977479_bNWnzBZppBoEj_bz0sbVQYE1_QJgmCvFY8ISKGBqmlQ.jpg'
    },
    {
        description: 'Gracies lacks silverware and cups during rushes.',
        image: 'https://www.rit.edu/fa/diningservices/sites/rit.edu.fa.diningservices/files/styles/juicebox_large/public/Gracies_7965.jpg?itok=CntFkdxe'
    },
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
    for (let i = 0; i < grievances.length; i++) {
        $('#containers').prepend('<div class="content-pane-wrapper"><div class="container-fluid content-pane content-pane-grievance " style="background-image: url(' + grievances[i].image + ');"></div> <div class="text-wrapper"><p class="text-title  ">' + grievances[i].description + '</p></div></div>');
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
    displayGrievances();
    $('#submitButton').click(function () {
        addGrievance($('#formTitle').val(), $('#formDesc').val(), null, true);
        $('#formTitle').val('');
        $('#formDesc').val('');
    });
});

function createContainer() {
    $('#containers').prepend('<div class="content-pane-wrapper"><div class="container-fluid content-pane content-pane-grievance " style="background-image: url(' + grievances[0].image + ');"></div> <div class="text-wrapper"><p class="text-title  ">' + grievances[0].description + '</p></div></div>');
}