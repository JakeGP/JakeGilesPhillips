function refreshClickHandlers() {
    $(".gallery__thumbs div").bind("click tap", function () {
        var newSrc = $(this).find("img").attr("src");
        $(".gallery__hero img").attr("src", newSrc);
        $(".gallery__thumbs div").removeClass("is-active");
        $(this).addClass("is-active");
    });

    $(".gallery__hero").bind("click tap", function () {
        var newSrc = $(this).find("img").attr("src");
        $("#popup-image").find("img").attr("src", newSrc);
        $("#popup-image").fadeIn("fast");
    });

    $("#popup-image .next, #popup-image .previous").bind("click tap", function (e) {
        if ($(e.target).is(".next") === true) {
            nextImage();
        }
        if ($(e.target).is(".previous") === true) {
            prevImage();
        }
    });

    $(document).bind("click tap", function (e) {
        if ($(e.target).is("img, .previous, .next") === false) {
            if ($("#popup-image").is(":visible")) {
                $("#popup-image").fadeOut("fast");
            }
        }
    });

    $(".tile-link").bind("click tap", function () {
        var _name = $(this).data("title");
        var _category = $(this).data("category");
        $("#loading").addClass("show");

        closeMenu();
        getWorkItem(_name, _category);
    });
}

function nextImage() {
    var first = $("#js-gallery .gallery__thumbs div:first-child");
    var firstSrc = $("#js-gallery .gallery__thumbs div:first-child img").attr("src");
    var next = $(".gallery__thumbs div.is-active").next();
    var nextSrc = $(".gallery__thumbs div.is-active").next().find("img").attr("src");

    if (nextSrc != null) {
        $("#popup-image img").attr("src", nextSrc);
        $(".gallery__hero img").attr("src", nextSrc);
        $(".gallery__thumbs div").removeClass("is-active");
        $(next).addClass("is-active");
    }
    else {
        $("#popup-image img").attr("src", firstSrc);
        $(".gallery__hero img").attr("src", firstSrc);
        $(".gallery__thumbs div").removeClass("is-active");
        $(first).addClass("is-active");
    }
}

function prevImage() {
    var last = $("#js-gallery .gallery__thumbs div:last-child");
    var lastSrc = $("#js-gallery .gallery__thumbs div:last-child img").attr("src");
    var prev = $(".gallery__thumbs div.is-active").prev();
    var prevSrc = $(".gallery__thumbs div.is-active").prev().find("img").attr("src");

    if (prevSrc != null) {
        $("#popup-image img").attr("src", prevSrc);
        $(".gallery__hero img").attr("src", prevSrc);
        $(".gallery__thumbs div").removeClass("is-active");
        $(prev).addClass("is-active");
    }
    else {
        $("#popup-image img").attr("src", lastSrc);
        $(".gallery__hero img").attr("src", lastSrc);
        $(".gallery__thumbs div").removeClass("is-active");
        $(last).addClass("is-active");
    }
}