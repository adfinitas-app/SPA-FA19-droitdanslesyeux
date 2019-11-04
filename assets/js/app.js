var imgTShirt = [
    "https://heroku-adfinitas-campaign.s3.amazonaws.com/SPA-droitsdanslesyeux/t-shirt-dog.png",
    "https://heroku-adfinitas-campaign.s3.amazonaws.com/SPA-droitsdanslesyeux/t-shirt-cat.png"
]

preload(imgTShirt)

$(document).foundation();

$(document).ready( function() {
    fillLink()
    handleAnimate()
    changeLinkTShirt(0)

    setTimeout(function(){
        $('.header .content').fadeIn('slow')
    }, 12000);

    setTimeout(function(){
        $('#cutVideo').fadeOut()
    }, 22000);

    handleNavBar()

});

$('#cutVideo').click( function () {
    var video = document.getElementById("videoBg");
    video.currentTime = video.duration;
    $('.header .content').fadeIn('slow')

    $(this).fadeOut()
})


var checkBandeauOrange = false;
var checkBandeauWhite = false;
var checkSlide1 = false;
var checkSlide2 = false;
var checkSlide3 = false;

$(window).scroll(function() {
    handleAnimate()
    handleNavBar()
});

function handleNavBar() {
    var height = $(window).scrollTop();

    if ($(window).width() <= 640) {
        if (height > 100) {
            $('.header .nav').css('background-color', 'white')
        }
        else {
            $('.header .nav').css('background-color', 'transparent')
        }
    }
}

function handleAnimate() {
    var height = $(window).scrollTop();
    var heightShare = $('#header').height()
    var heightHistoires = $('#slide1').offset().top
    var heightBandeauOrange = $('#bandeau-orange').offset().top  - ($('#bandeau-orange').height())
    var heightBandeauWhite = $('#bandeau-white-first').offset().top / 4 - ($('#bandeau-white-first').height())
    var don1 = $('#bandeau-don').offset().top
    var heightslide1 = $('#slide1').offset().top - ($('#slide1').height())
    var heightslide2 = $('#slide2').offset().top - ($('#slide2').height())
    var heightslide3 = $('#slide3').offset().top - ($('#slide3').height())

    if (height > heightShare / 2) {
        $('#share').fadeIn()
    }
    else {
        $('#share').fadeOut()
    }

    if (height < heightHistoires) {
        $('.header .nav').css({'background-color':'transparent','display':'block'})
    }
    if (height > heightHistoires) {
        $('.header .nav').css({'background-color':'white','display':'block'})
    }
    if (height > don1) {
        $('.header .nav').hide()
    }

    if(height  > heightBandeauOrange && !checkBandeauOrange) {
        animateNumber()
        checkBandeauOrange = true
    }
    if(height > heightBandeauWhite && !checkBandeauWhite) {
        $('.bandeau p').slideDown('slow')

        checkBandeauWhite = true
    }
    if(height  > heightslide1 && !checkSlide1) {
        textAppear(0)
        checkSlide1 = true
    }
    if(height  > heightslide2 && !checkSlide2) {
        textAppear(1)
        checkSlide2 = true
    }
    if(height  > heightslide3 && !checkSlide3) {
        textAppear(2)
        checkSlide3 = true
    }
}

function textAppear(nb) {
    var el = $('.slide').eq(nb).find('.text')
    var height = $('.slide').eq(nb).height()

    el.css('top', -(height + 100))

    el.fadeIn('slow').animate({
        top:0
    }, 1000, 'swing', function() {
    });



}


var imgCheck = [
    "https://heroku-adfinitas-campaign.s3.amazonaws.com/SPA-droitsdanslesyeux/check.png",
    "https://heroku-adfinitas-campaign.s3.amazonaws.com/SPA-droitsdanslesyeux/check-not.png"
]

function changeLinkTShirt(mode) {
    let string = 'https://soutenir.la-spa.fr/b'

    if (mode === 0) { //CHIEN
        string += '?cid=231'
        string += getUserInUrl()

        $('#check1').attr('src', imgCheck[0])
        $('#check2').attr('src', imgCheck[1])
        $('#t-shirt').attr('src', imgTShirt[0])

        $('#don-tshirt').attr('href', string)
    }
    else { //CHAT
        string += '?cid=232'
        string += getUserInUrl()

        $('#check1').attr('src', imgCheck[1])
        $('#check2').attr('src', imgCheck[0])
        $('#t-shirt').attr('src', imgTShirt[1])

        $('#don-tshirt').attr('href', string)
    }
}

$('input[type=radio][name=choice]').change(function() {

    if (this.value === 'chien') {
        changeLinkTShirt(0)
    }
    else if (this.value === 'chat') {
        changeLinkTShirt(1)
    }
});



function animateNumber() {
    var nb = [
        44147,
        102585,
        12182,
    ]

    $('.numberAnimate').each(function () {
        var $this = $(this);
        var index = $('.numberAnimate').index($(this))

        $({ Counter: 0 }).animate({
            Counter: nb[index] }, {
            duration: 1500,
            easing: 'swing',
            step: function () {
                $this.text(
                    getDisplayNumber(Math.ceil(this.Counter))

                );
            }
        });
    });
}

function getDisplayNumber(i) {
    var nb = i.toString()

    if (nb.length === 4) {
        return nb.slice(0, 1) + " " + nb.slice(1, nb.length)
    }
    else if (nb.length === 5) {
        return nb.slice(0, 2) + " " + nb.slice(2, nb.length)
    }
    else if (nb.length === 6) {
        return nb.slice(0, 3) + " " + nb.slice(3, nb.length)
    }
    else if (nb.length === 7) {
        return nb.slice(0, 4) + " " + nb.slice(4, nb.length)
    }
    return nb
}


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

function scrollNext(next) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: next.offset().top
    }, 800, function(){

    });
}

function changeAmountDon(donateur) {
    if (donateur) {
        $('#nb1').text('90')
        $('#small-nb1').text('31')

        $('#nb2').text('120')
        $('#small-nb2').text('41')

        $('#nb3').text('170')
        $('#small-nb3').text('54')
    }
}

function getUserInUrl() {
    let p = extractUrlParams();

    let string = ''

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

    return string
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

    string += getUserInUrl()
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
