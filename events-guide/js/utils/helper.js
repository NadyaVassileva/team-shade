class Helper {

   addUserButtons() {
        console.log("User is logged!!!");
        $('#logout-button').removeClass('hidden');
        $('#login-button').addClass('hidden');
        $('#search-form').removeClass('hidden');
    }

   removeUserButtons() {
        $('#logout-button').addClass('hidden');
        $('#login-button').removeClass('hidden');
        $('#search-form').addClass('hidden');
        
        console.log("User is logged out!!!");
   }

    toggleUserButtons() {
        $('#logout-button').toggleClass('hidden');
        $('#login-button').toggleClass('hidden');
        $('#search-form').toggleClass('hidden');
   }
}

let helper = new Helper();
export { helper as helper };