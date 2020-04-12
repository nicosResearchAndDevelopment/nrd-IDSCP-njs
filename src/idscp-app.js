const idscp = require(`./nrd-idscp-njs.js`);

function main({'idscp': idscp, 'config': config}) {
    let client = null;
    return new Promise((resolve, reject) => {
        try {
            const
                server = new idscp.Server(config.server)
            ;
            server.listen().then((result) => {
                client = new idscp.Client(config.client);
                client.connect()
                    .then((connect_result) => {
                        connect_result;
                    })
                    .catch((connect_error) => {
                        connect_error;
                    });
                resolve(result);
            }).catch(reject);
            //resolve(true);
        } catch (jex) {
            reject(jex);
        } // try
    }); // return P
} // function main()

main({
    'idscp':  idscp,
    'config': {
        'server': {'port': 8080},
        'client': {'port': 8080}
    } // config
})
    .then((result) => {
        result;
    })
    .catch((err) => {
        err;
    })
; // call main