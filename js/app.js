$(function () {
    console.log('DOM');

    const form = $("form");
    const button = form.find("button");


    // const photos = $(".photos");
    // const gallery = $(".gallery");
    // gallery.removeChild(photos);

    button.on("click", function (e) {
        e.preventDefault();
        const input = form.find("input");
        const value = input.val();

        $.ajax({
            url : 'https://images-api.nasa.gov/search?q=' + value,
            method: 'GET',
            dataType: "json"
        }).done(function(result) {
            showPhotos( result.collection.items );
            input.val('');
        });
    });

    function showPhotos (photos) {

        for(let i = 0; i < 10; i++){
            let imageLinks = photos[i].links[0].href;
            if(imageLinks.indexOf('jpeg') > -1 || imageLinks.indexOf('jpg') > -1) {
                console.log(imageLinks)

                const photos = $(".photos");
                const newDiv = $("<div class='single-photo'>");
                photos.append(newDiv);
                const newImg = $('<img alt="photos">');
                newDiv.append(newImg);
                newImg.attr('src', imageLinks)
            }
        }
    }
});