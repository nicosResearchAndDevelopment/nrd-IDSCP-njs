//REM: this const substitutes app patrameter, nothing more
const
    app_config_path                    = "./config/config.json",
    idscp_server_config_path           = "./config/idscp/server/config.json",
    idscp_client_localhost_config_path = "./config/idscp/client/localhost/config.json"
; // comst (app-parameter)

// REM: top level const
const
    fs                            = require('fs'),
    idscp                         = require('../src/nrd-idscp-njs.js'),
    app_config                    = JSON.parse(fs.readFileSync(app_config_path)),
    app_name                      = app_config.name,
    idscp_server_config           = JSON.parse(fs.readFileSync(idscp_server_config_path)),
    idscp_client_localhost_config = JSON.parse(fs.readFileSync(idscp_client_localhost_config_path))
; // const

//region fn

function _verbose(instance, level, mode = "log", message) {
    if (instance['verbose'] >= level)
        console[mode](`${(new Date).toISOString()} : ${message}`);
} // verbose()

function main({'idscp': idscp, 'config': config}) {
    let client = null;
    return new Promise((resolve, reject) => {
        try {
            const
                server = new idscp.Server(config.server)
            ;
            server.listen().then((result) => {

                if (config.client) {
                    client = new idscp.Client(config.client);
                    client.connect()
                        .then((client_connect_result) => {
                            _verbose(app_config, 1, "log", `${app_name} : main : idscp client : connected <${client_connect_result.toString()}>`);
                        })
                        .catch((connect_error) => {
                            _verbose(app_config, 1, "warn", `${app_name} : main : idscp client : error <${connect_error.toString()}>`);
                        });
                } // if(config.client)

                resolve(result);

            }).catch(reject);
        } catch (jex) {
            reject(jex);
        } // try
    }); // return P
} // function main()

//endregion fn

main({
    'idscp':  idscp,
    'config': {
        'app':    app_config,
        'server': idscp_server_config,
        'client': idscp_client_localhost_config
    } // config
}).then((result) => {
    _verbose(app_config, 1, "log", `${app_name} : app : then reached : result <${result.message}>`);
}).catch((err) => {
    _verbose(app_config, 1, "warn", `${app_name} : app : catch <${err.toString()}>`);
}); // call main