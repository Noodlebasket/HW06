$(document).ready(function () {


    var gifList = ["hamster", "puppy", "kitten", "dolphin"];

    function renderButtons() {

        $(".gif-buttons").empty();
        $(".gif-view").empty();

        for (var i = 0; i < gifList.length; i++) {

            var a = $("<button>");

            a.addClass("gif");

            a.attr("data-name", gifList[i]);

            a.text(gifList[i]);

            $(".gif-buttons").append(a);
        }
    }

    $(".add-gif").on("click", function (event) {
        event.preventDefault();

        var gifAdd = $(".gif-input").val().trim();

        var exist = gifList.indexOf(gifAdd.toLowerCase());
        if (exist >= 0) {
            alert("That button already exists.");
            return;
        }

        if (gifAdd === "" || gifAdd === null) return;

        gifList.push(gifAdd);

        renderButtons();
    });

    $(document).on("click", ".gif", function () {

        console.log("You clicked a gif button");

        var search = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            search + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;

                console.log(queryURL);

                console.log(results);

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $("<div>");

                    var p = $("<p>").text("Rating: " + results[i].rating);

                    var animalImage = $("<img src='" + results[i].images.fixed_height_still.url + "'>");
                    animalImage.addClass("gif-image")
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);
                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    $(".gif-view").prepend(animalDiv);
                }
            });
            renderButtons();
    });

    $(document.body).on("click", ".gif-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        renderButtons();
    });
    renderButtons();
});
