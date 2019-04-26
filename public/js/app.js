console.log("hello world")

$(document).on("click", "#scrape", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    });
});

$(document).on("click", ".article-notes", function () {
    var id = $(this).attr("data-id");
    $("#modal-title").text("Notes for article " + id);
    $(".save-note").attr("data-id", id);

    $.ajax({
        method: "GET",
        url: "/article/" + id
    }).then(function (data) {
        console.log(data);
        $("#note-display").text(data.note.text);
    });
});

$(document).on("click", ".save-note", function () {
    var note = $("#text-box").val();
    $("#text-box").val("");
    var newNote = {
        text: note
    };
    var id = $(this).attr("data-id");

    $.post("/article/" + id, newNote, function (response) {
        $("#note-display").text(response.note.text);
    });
});