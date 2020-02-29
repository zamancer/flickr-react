import { compose, curry, map, prop } from 'ramda';
import $ from 'jquery';
import { url, requestResource } from './flickrApiClient';

// -- Utils ----------------------------------------------------------
const Impure = {
    trace: curry((tag, x) => {
        console.log(tag, x);
        return x;
    }),
    setHtml: curry((sel, html) => $(sel).html(html)),
};

// -- Pure -----------------------------------------------------------
const img = src => $('<img />', { src });
const mediaUrl = compose(prop('m'), prop('media'));
const mediaUrls = compose(map(mediaUrl), prop('items'));
const images = compose(map(img), mediaUrls);

// -- Impure ---------------------------------------------------------
const render = compose(Impure.setHtml('#js-main'), images);
const app = compose(requestResource(render), url);

app('cats');
