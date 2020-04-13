/*******************

 description    :
 version        : 0.1.1
 see also       : https://industrial-data-space.github.io/trusted-connector-documentation/
 author         : jlangkau@nicos-rd.com

 ********************/

let
    net    = require('net'),
    _enum_ = {}
;

module.exports = {
    'enum':   _enum_,
    'Server': require(`./idscp-server.js`)({'net': net, 'enum': _enum_}),
    'Client': require(`./idscp-client.js`)({'net': net, 'enum': _enum_})
};