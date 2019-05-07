$.getJSON("data/user_data.json", function (user) {
    $('.student-name').contents().replaceWith("Hi " + user.user_info.userFirst + "!");
}); 