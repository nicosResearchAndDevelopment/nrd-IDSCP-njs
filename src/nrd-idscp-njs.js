/**********************************************************
description    :
 version        : 0.1.3
 see also       : https://industrial-data-space.github.io/trusted-connector-documentation/
 see also       : https://github.com/International-Data-Spaces-Association/IDS-G/tree/master/core/Technologies/idscp
 author         : jlangkau@nicos-rd.com
 **********************************************************/

let
    net    	= require('net'),
    hrt 	= () => ((new Date).valueOf() / 1000)
    _enum_ 	= require(`./enum/enum.js`)
; // let

module.exports = {
    'enum':   _enum_,
    'Server': require(`./server/idscp-server.js`)({'net': net, 'hrt': hrt, 'enum': _enum_}),
    'Client': require(`./client/idscp-client.js`)({'net': net, 'hrt': hrt, 'enum': _enum_})
};