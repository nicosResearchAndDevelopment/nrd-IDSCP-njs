//REM: this const substitutes app patrameter, nothing more
const
	app_config_path = "./config/config.json",
	idscp_server_config_path = "./config/idscp/server/config.json",
	idscp_client_localhost_config_path = "./config/idscp/client/localhost/config.json"
; // comst (app-parameter)

// REM: top level const
const
	fs = require('fs'),
	idscp = require('../src/nrd-idscp-njs.js'),
	app_config = JSON.parse(fs.readFileSync(app_config_path)),
	app_name = app_config.name,
	idscp_server_config = JSON.parse(fs.readFileSync(idscp_server_config_path)),
	idscp_client_localhost_config = JSON.parse(fs.readFileSync(idscp_client_localhost_config_path)),
; // const

function main({'idscp': idscp, 'config': config}) {
    let client = null;
    return new Promise((resolve, reject) => {
        try {
            const
                server = new idscp.Server(config.server)
            ;
            server.listen().then((result) => {
            
            	if(config.client) {
	                client = new idscp.Client(config.client);
	                client.connect()
	                    .then((connect_result) => {
	                        connect_result;
	                    })
	                    .catch((connect_error) => {
	                        connect_error;
	                    });
                } // if(config.client)
                
                resolve(result);
                
            }).catch(reject);
        } catch (jex) {
            reject(jex);
        } // try
    }); // return P
} // function main()

main({
    'idscp':  idscp,
    'config': {
    	'app': app_config,
        'server': { "port": 8080 }, /** idscp_server_config */
        'client': { "host": "localhost", "port": 8080 }. /** idscp_client_localhost_config */
    } // config
})
    .then((result) => {
        result;
    })
    .catch((err) => {
        err;
    })
; // call main