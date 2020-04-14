/*********************************************************
 description    : IDS enumerations and constats
 version        : 0.1.3
 see also       :
 author         : jlangkau@nicos-rd.com
 *********************************************************/
let _enum_ = {};

Object.defineProperties(_enum_, {
	'securityProfile': {'value': require('./securityProfile/enum.js')}
});

Object.seal(_enum_);
module.exports = _enum_;