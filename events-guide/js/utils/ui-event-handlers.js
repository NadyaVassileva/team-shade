import 'jquery';

function bootStrapActiveChange() {
    console.log("BOOTSTRAP");

    $(".nav a").on("click", function () {
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });
}

export function loadAll(){
    bootStrapActiveChange();
}