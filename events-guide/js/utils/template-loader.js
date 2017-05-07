import * as requester from 'requester';
import Handlebars from 'handlebars';

const cacheObj = {};

export function load(templateName) {
    return requester.get(`templates/${templateName}.handlebars`);
}

export function generate(templateName) {
    if (cacheObj.hasOwnProperty(templateName)) {
        return Promise.resolve(cacheObj[templateName]);
    }
    else {
        return load(templateName)
            .then(template => {
                const compiledTemplate = Handlebars.compile(template);
                cacheObj[templateName] = compiledTemplate;
                return Promise.resolve(compiledTemplate); //returns a FUNCTION
            }); //vrushta ni PROMISE t.e. tuk shte imame gotov template function!
    }
}