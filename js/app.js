$(function () {
    console.log('DOM');

    const form = $("form");
    const button = form.find("button");

    $('.loader').hide()
    button.on("click", function (e) {
        const photos = $(".photos");
        const single = photos.find('.single-photo');
        const empty = photos.find('.empty');
        single.remove();
        empty.remove();

        e.preventDefault();
        const input = form.find("input");
        const value = input.val();

        $.ajax({
            url : 'https://images-api.nasa.gov/search?q=' + value,
            method: 'GET',
            dataType: "json",
            beforeSend: function(){
                $('.loader').show();
            },
        }).done(function(result) {
            window.setTimeout(function () {
                if(result.collection.items.length === 0) {
                    $('.loader').hide();
                    showEmpty();
                    input.val('');
                } else {
                    $('.loader').hide();
                    input.val('');
                    showPhotos( result.collection.items );
                }
            }, 1000);
        })
    });

    function showPhotos (photos) {

        const button = $('.load-more-button').find('button');
        button.remove();

        const photo = $(".photos");
        const single = photo.find('.single-photo');
        const photosNumber = single.length;
        for(let i = photosNumber; i < photosNumber + 12; i++){
            let imageLinks = photos[i].links[0].href;
            if(imageLinks.indexOf('jpeg') > -1 || imageLinks.indexOf('jpg') > -1) {
                const newDiv = $("<div class='single-photo'>");
                photo.append(newDiv)
                const newImg = $('<img alt="photos">');
                newDiv.append(newImg);
                newImg.attr('src', imageLinks)
                newDiv.hide().fadeIn(2000);
            }
        }

        const newDiv = $('<div class="load-more-button">');
        const newButton = $('<button>Load more</button>');
        const gallery = $(".gallery");
        gallery.append(newDiv);
        newDiv.append(newButton);

        $(".load-more-button").on('click',  function (e) {
            const button = $('.load-more-button');
            button.remove();
            e.preventDefault();
            showPhotos(photos);
        });
    }

    function showEmpty () {
        const photos = $(".photos");
        const newDiv = $("<div class='empty'> no photos </div>");
        photos.append(newDiv);
    }

    const buttonScroll = $('.scroll');
    if($(window).scrollTop() < 1499){
        buttonScroll.hide();
    }

    window.onscroll = function () {
        const scrollTop = $(window).scrollTop();
        if ( scrollTop > 1500 ) {
            buttonScroll.fadeIn();
        } else {
            buttonScroll.fadeOut();
        }
    };

    buttonScroll.on("click", function () {
        $('html').animate({scrollTop : 0},1000);
        return false;
    })
});