import $ from 'jquery';
import { curry } from 'ramda';

const requestResource = curry((callback, url) => $.getJSON(url, callback));

const host = 'api.flickr.com';
const path = '/services/feeds/photos_public.gne';
const query = t => `?tags=${t}&format=json&jsoncallback=?`;
const url = t => `https://${host}${path}${query(t)}`;

export { url, requestResource };
