import 'jquery';
import { helper } from 'helper';


function bootStrapActiveChange() {
    $(".nav a").on("click", function () {
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

    $('.navbar-brand').on("click", () => {
        $(".nav").find(".active").removeClass("active");        
        $('#home').parent().addClass("active");
    });
}

function ensureLogOutLogInWithPageRefresh() {
    $(document).ready(function () {
        if (sessionStorage.length !== 0) {

            helper.addUserButtons();

        }
    });
}

export function loadAll() {
    ensureLogOutLogInWithPageRefresh();
    bootStrapActiveChange();
}