$(document).ready(function () {
    addClickHandlers();
    arrangeTiles();
    checkIfFirstVisit();
});

var workItems = {
    GameAsset:      ['Container', 'Tree'],
    GameDesign:     ['Asteroids', 'BlockRunner', 'HarryPotterVR', 'PixelTanks', 'SpaceScroller', 'WSYG'],
    GamesJam:       ['FecalObject', 'FlowRider'],
    //GraphicDesign:  ['BaconSandwiches', 'Fokus', 'Hawx'],
    LevelDesign:    ['FuturisticCity', 'GryffindorCommonRoom', 'NewBerlin', 'Paradise'],
    Modelling:      ['DesertEagle', 'DwarvenSoldier', 'Horse', 'Reaper', 'Tank', 'Xenomorph'],
    WebDesign:      ['BusinessCard', 'MailButton']
};

function addClickHandlers() {
    $("#CV-download").bind("click tap", function () {
        downloadCV();
    });

    $(".contact-input").bind("focusin focusout ", function () {
        toggleHeader();
    });

    $("#contact_submit").bind("click tap", function () {
        sendEmail();
    });

    $(".menu-toggle").bind("click tap", function () {
        toggleMenu();
    });

    $("#contact-button").bind("click tap", function () {
        window.location.href = "/Contact";
    });

    $(".sorting-item, .column-title").bind("click tap", function () {
        closeMenu();
        changeSortingCategory(this);
    });


    $("div[data-action='home'], #close-popup").bind("click tap", function () {
        closePopupWindows();
    });

    $("div[data-action='random']").bind("click tap", function () {
        randomWorkItem();
    });

    $("div[data-action='share']").bind("click tap", function () {
        openSharePopup();
    });

    $("div[data-action='closeshare']").bind("click tap", function () {
        closeSharePopup();
    });

    $(document).bind("click tap", function (e) {
        if ($(e.target).is("#main-header-search, #main-header-search input, #search-button") === false) {
            $("#main-header-search").removeClass("show");
        }
    });
}

function changeSortingCategory(clickedElement) {
    $("#popup-content").removeClass("show");
    $("#secondary-header").removeClass("hide");
    $("#main-header").removeClass("popup-open");
    $("body").removeClass("small");
    $(".sorting-item").removeClass("selected");

    var sortingName = $(clickedElement).attr('class').split(' ')[1];

    if (sortingName.includes('all')) {
        $(clickedElement).addClass("selected");
        $("#card-wrapper .card").addClass('hide');
        if (sortingName.includes('new')) {
            $("#card-wrapper .card.new").removeClass('hide');
        }
        else if (sortingName.includes('favourite')) {
            $("#card-wrapper .card.favourite").removeClass('hide');
        }
        else {
            $("#card-wrapper .card").removeClass('hide');
        }
    }
    else {
        $(".sorting-item.sorting-" + sortingName.split('-')[1]).addClass("selected");
        $("#card-wrapper .card").addClass('hide');
        $("#card-wrapper ." + sortingName).removeClass('hide');
    }
}

function randomWorkItem() {
    var rand1 = Math.floor(Math.random() * Object.keys(workItems).length);
    var sorted = Object.keys(workItems).sort();
    var rand2 = Math.floor(Math.random() * workItems[sorted[rand1]].length);

    var category1 = sorted[rand1];
    var category2 = workItems[sorted[rand1]][rand2];

    $("#loading").addClass("show");

    getWorkItem(category2, category1);
}

function toggleMenu() {
    if ($("#popup-menu").hasClass("show")) {
        closeMenu();
    }
    else {
        openMenu();
    }
}
function openMenu() {
    $("#popup-menu").addClass("show");
    $("#bars").addClass("clicked");
}
function closeMenu() {
    $("#popup-menu").removeClass("show");
    $("#bars").removeClass("clicked");
}

function closePopupWindows() {
    $("#popup-content").removeClass("show");
    $("#main-header").removeClass("popup-open");
    $("#secondary-header").removeClass("hide");
    $("body").removeClass("small");
    if (lastCategory != null) {
        $(".sorting-item[data-category='" + lastCategory + "']").click();
    }
}

function openSharePopup() {
    $("#popup-share").addClass("show");
}
function closeSharePopup() {
    $("#popup-share").removeClass("show");
}

function arrangeTiles() {
    var tiles = $(".card:not(.new, .favourite)");
    var length = tiles.length;
    var newTiles = $(".card.new");
    var faveTiles = $(".card.favourite");
    
    $("#card-wrapper").html("");
    $("#card-wrapper").prepend(newTiles);
    $("#card-wrapper").append(faveTiles);

    for (var i = 0; i < length; i++) {
        var rand = Math.floor(Math.random() * tiles.length) + 0;
        $("#card-wrapper").append(tiles[rand]);
        tiles.splice(rand, 1);
    }
}

function toggleHeader() {
    if ($(".contact-input").is(":focus") && $(window).width() < 400) {
        $("#main-header").hide();
    }
    else {
        $("#main-header").show();
    }
}

function sendEmail() {
    var _from = $("#contact_email").val();
    var _name = $("#contact_name").val();
    var _body = $("#contact_message").val();
    $(".contact-row").removeClass("error");
    var validated = true;

    if (_from == "" || _name == "" || _body == "") {
        validated = false;
        $(".contact-input").filter(function () {
            return !this.value;
        }).closest(".contact-row").addClass("error");
    }

    if (validated) {
        $.post("/Contact/SendEmail", { from: _from, name: _name, body: _body }, function (data) {
            if (data.includes("Sent")) {
                emailAnimation();
            }
        });
    }
}
function emailAnimation() {
    $(".letter-image").removeClass("open").addClass("send");
    setTimeout(function () { resetEmail(); }, 4000);
}
function resetEmail() {
    $("#contact_email").val("");
    $("#contact_name").val("");
    $("#contact_message").val("");
    $(".letter-image").removeClass("send");
    setTimeout(function () {
        $(".letter-image").addClass("open");
    }, 1000);
}

function downloadCV() {
    $.post("/GetCV", function (data) {
        window.open("data:application/pdf;base64, " + data, '', 'height=650,width=840');
    });
}

function checkIfFirstVisit() {
    if (getCookie("instructions") == null) {
        if ($(window).width() <= 1024) {
            var destination = $("#main-header-sorting");
            $("#instructions .fixer").css(destination.offset());
            $("#instructions .fixer").css("width", destination.width());
        }
        $("#instructions").delay(500).fadeIn(800).delay(2200).fadeOut(500);
        setCookie("instructions", "shown", 1);
    }
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}