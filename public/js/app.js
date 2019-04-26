console.log("hello world")

$(document).on("click", "#scrape", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    });
    console.log("Scraping Data...")
});

$(document).on("click", ".article-notes", function () {
    var id = $(this).attr("data-id");
    $("#modal-title").text("Notes for article " + id);
});