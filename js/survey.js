console.log($('label', '#group1')[0]);
$(document).ready(function () {
    $("checked").change(function () {
        var checkedStatus = $(this).children("lable:selected").val();
        alert(" You have selected  " + this.checkedStatus);
    });
});