$(document).foundation();

$(document).ready( function() {
    fillLink()

});

var imgTShirt = [
    "https://heroku-adfinitas-campaign.s3.amazonaws.com/SPA-droitsdanslesyeux/t-shirt-dog.png",
    "https://heroku-adfinitas-campaign.s3.amazonaws.com/SPA-droitsdanslesyeux/t-shirt-cat.png"
]

preload(imgTShirt)

$('input[type=radio][name=choice]').change(function() {
    console.log(this.value)
    if (this.value === 'chien') {
        $('#t-shirt').attr('src', imgTShirt[0])
    }
    else if (this.value === 'chat') {
        $('#t-shirt').attr('src', imgTShirt[1])
    }
});



$(document).on('closed', '.remodal', function (e) {

    var video = $("#modalVideo iframe");
    var src = video.attr("src");

    video.attr("src","");
    video.attr("src",src);

});
function preload(arguments) {
    var images = [];
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = arguments[i];
    }
}

function changeAmountDon(donateur) {
    if (donateur) {
        console.log($('#don1 .euro .nb').eq(0).val())
        $('#don1 .euro .nb').eq(0).val('90')
        $('#don1 .euro .nb').eq(1).html('27<span>,20</span>')

        $('#don2 .euro .nb').eq(0).val('120')
        $('#don2 .euro .nb').eq(1).html('27<span>,20</span>')

        $('#don3 .euro .nb').eq(0).val('170')
        $('#don3 .euro .nb').eq(1).html('27<span>,20</span>')
    }
}

function fillLink() {
    let p = extractUrlParams();

    let string = "";
    let donateur = true;

    if (p['reserved_code_media'] && p['reserved_code_media'] !== "undefined") {
        if (p['reserved_code_media'].indexOf("W19P") !== -1 || p['reserved_code_media'] === "") //PROSPECT
            donateur = false;
    }

    if (donateur)
        string += "?cid=" + 228;
    else
        string += "?cid=" + 229;

    changeAmountDon(donateur)

    if (p['email'] && p['email'] !== "undefined")
        string += ("&email=" + p['email']);
    if (p['wv_email'] && p['wv_email'] !== "undefined")
        string += ("&email=" + p['wv_email']);
    if (p['wv_firstname'] && p['wv_firstname'] !== "undefined")
        string += ("&firstname=" + p['wv_firstname']);
    if (p['firstname'] && p['firstname'] !== "undefined")
        string += ("&firstname=" + p['firstname']);
    if (p['wv_lastname'] && p['wv_lastname'] !== "undefined")
        string += ("&lastname=" + p['wv_lastname']);
    if (p['lastname'] && p['lastname'] !== "undefined")
        string += ("&lastname=" + p['lastname']);
    if (p['reserved_code_media'] && p['reserved_code_media'] !== "undefined")
        string += ("&reserved_code_media=" + p['reserved_code_media']);

    string += "&lang=fr_FR"
    $('.link-don').each(function() {
        let src = $(this).attr('href');
        $(this).attr('href', src + string);
    });

    // lvl link 1, 2, 3

    $('.link-don.un').each(function() {
        let src = $(this).attr('href');
        if (donateur) $(this).attr('href', src + "&amount=9000");
        else $(this).attr('href', src + "&amount=6000");
    });
    $('.link-don.deux').each(function() {
        let src = $(this).attr('href');
        if (donateur) $(this).attr('href', src + "&amount=12000");
        else $(this).attr('href', src + "&amount=9000");
    });
    $('.link-don.trois').each(function() {
        let src = $(this).attr('href');
        if (donateur) $(this).attr('href', src + "&amount=17000");
        else $(this).attr('href', src + "&amount=16000");
    });
}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
};
