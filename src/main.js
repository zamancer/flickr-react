import { compose, curry, map, prop } from 'ramda';
import { url, requestResource } from './flickrApiClient';
import React from 'react';
import ReactDOM from 'react-dom';

// -- Utils ----------------------------------------------------------
const Impure = {
    trace: curry((tag, x) => {
        console.log(tag, x);
        return x;
    }),
    setHtml: curry((sel, component) =>
        ReactDOM.render(component, document.getElementById(sel))
    ),
};

// -- Pure -----------------------------------------------------------
const Img = src => <img key={src} src={src} />;
const mediaUrl = compose(prop('m'), prop('media'));
const mediaUrls = compose(map(mediaUrl), prop('items'));
const images = compose(map(Img), mediaUrls);

// -- Impure ---------------------------------------------------------
const render = compose(Impure.setHtml('js-main'), images);
const app = compose(requestResource(render), url);

app('cats');
