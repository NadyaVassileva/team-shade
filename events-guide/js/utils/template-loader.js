import { get as getRequest } from 'requester';
import Handlebars from 'handlebars';
const cacheObj = {};

export function load(templateName) {

    if (cacheObj.hasOwnProperty(templateName)) {
        return Promise.resolve(cacheObj[templateName]);
    }
    else {
        return getRequest(`templates/${templateName}.handlebars`)
            .then(template => {
                const compiledTemplate = Handlebars.compile(template);
                cacheObj[templateName] = compiledTemplate;
                return Promise.resolve(compiledTemplate); //returns a FUNCTION
            }); //vrushta ni PROMISE t.e. tuk shte imame gotov template function!
    }
}

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

// export default {
//     load: function (name) {
//         let url = '/templates/' + name +'.handlebars';

//         return new Promise(function(resolve, reject) {
//             $.ajax({
//                 url:url,
//                 success: function(data) {
//                     resolve(data);
//                 },
//                 error: function(err) {
//                     reject(err);
//                 }
//             })
//         })
//     }
// }