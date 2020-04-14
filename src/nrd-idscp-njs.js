/*******************

 description    :
 version        : 0.1.1
 see also       : https://industrial-data-space.github.io/trusted-connector-documentation/
 author         : jlangkau@nicos-rd.com

 ********************/

let
    net    	= require('net'),
    hrt 	= () => ((new Date).valueOf() / 1000)
    _enum_ 	= {}
; // let

module.exports = {
    'enum':   _enum_,
    'Server': require(`./server/idscp-server.js`)({'net': net, 'hrt': hrt, 'enum': _enum_}),
    'Client': require(`./client/idscp-client.js`)({'net': net, 'hrt': hrt, 'enum': _enum_})
};