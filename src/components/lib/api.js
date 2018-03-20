import { createClient } from 'contentful';

let clientConfig = {
    space: process.env.REACT_APP_BD_SPACE,
    accessToken: process.env.REACT_APP_BD_AT,
}
if (process.env.REACT_APP_BD_ENV !== 'production') {
    clientConfig.host = 'preview.contentful.com';
}
const client = createClient(clientConfig);

export function fetchModels(contentType, id) {
    let query = {
        'content_type': 'post',
        'include': 10,
    };
    if (id) {
        query['sys.id'] = id;
    }
    return client.getEntries(query);
}