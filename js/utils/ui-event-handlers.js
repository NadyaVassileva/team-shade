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

function logOutEvent() {
    $('#logout-button').on('click', function (event) {
        event.preventDefault();
        Kinvey.User.logout()
            .then(response => {

                helper.removeUserButtons();

                sessionStorage.clear();
                window.location.hash = "#/login";
            });
    });
}

export function loadAll() {
    logOutEvent();
    bootStrapActiveChange();
    ensureLogOutLogInWithPageRefresh();
}