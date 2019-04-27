$(document).on("click", "#scrape", function (cb) {
    $.ajax({
        method: "GET",
        url: "/scrape"
    });
    cb(location.reload());
});

$(document).on("click", ".article-notes", function () {
    $("#note-display").text("");
    var id = $(this).attr("data-id");
    $("#modal-title").text("Notes for article " + id);
    $(".save-note").attr("data-id", id);

    $.ajax({
        method: "GET",
        url: "/article/" + id
    }).then(function (data) {
        if (data.note.text !== undefined) {
            $("#note-display").text(data.note.text).append("<i class='fas fa-times delete-note' data-id=" + id + "></i>");
        }
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
        $("#note-display").text(response.note.text).append("<i class='fas fa-times delete-note' data-id=" + id + "></i>");
    });
});

$(document).on("click", ".delete-note", function () {
    var id = $(this).attr("data-id");
    console.log(id);
    $.ajax({
        method: "DELETE",
        url: "/article/" + id
    });
});