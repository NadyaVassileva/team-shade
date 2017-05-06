const handlebars = window.handlebars || window.Handlebars,
    cache = {};

// function get(templateName) {
//     let promise = new Promise(function(resolve, reject) {
//         if (cache[templateName]) {
//             resolve(cache[templateName]);
//             return;
//         }

//         let url = `/scripts/templates/${templateName}.handlebars`;

//         $.get(url, function(html) {
            
//             let template = handlebars.compile(html);
//             cache[templateName] = template;
//             resolve(template);
//         });
//     });

//     return promise;
// }


// export { get };

export default {
    load: function (name) {
        let url = '/scripts/templates/' + name +'.handlebars';

        return new Promise(function(resolve, reject) {
            $.ajax({
                url:url,
                success: function(data) {
                    resolve(data);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }
}