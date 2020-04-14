/*********************************************************
 description    : idscp-client
 version        : 0.1.4
 see also       : https://industrial-data-space.github.io/trusted-connector-documentation/
 see also       : https://github.com/International-Data-Spaces-Association/IDS-G/tree/master/core/Technologies/idscp
 author         : jlangkau@nicos-rd.com
 **********************************************************/

module.exports = ({
                      'net':  net,
                      'hrt':  hrt,
                      'enum': _enum_
                  }) => {

    //region fn

    function _verbose(instance, level, mode = "log", message) {
        if (instance['verbose'] >= level)
            console[mode](`${(new Date).toISOString()} : ${message}`);
    } // verbose()

    //endregion fn

    class Client {

        //region private

        #client = null;

        #name        = "idscp client";
        #host        = "localhost";
        #port        = 80;
        #connectedAt = -1;
        #verbose     = 0 //REM: silent

        //endregion private

        constructor({
                        'name':    name = "idscp client",
                        'host':    host = "localhost",
                        'port':    port = 80,
                        'verbose': verbose = 9
                    }) {

            this.#name    = name;
            this.#host    = host;
            this.#port    = port;
            this.#verbose = verbose;

        } // constructor

        //region server functions

        connect() {
            return new Promise((resolve, reject) => {
                try {

                    this.#client = net.connect(
                        {
                            'host': this.#host,
                            'port': this.#port
                        },
                        () => {
                            this.#connectedAt = hrt();
                            let message       = `${this.#name} : connected to server <${this.#host}:${this.#port}>`
                            _verbose(this, 1, "log", message);
                            resolve(true);
                        } // cb
                    ); // net.connect()

                    this.#client.on('data', (data) => {
                        _verbose(this, 8, "log", `${this.#name} : on.data() reached : data <![CDATA[${data.toString()}]]>`);
                    });

                    this.#client.on('end', () => {
                        _verbose(this, 8, "log", `${this.#name} : on.end() reached`);
                    });

                } catch (jex) {
                    reject(jex);
                } // try
            }); // return P

        } // listen ()

        //endregion server functions

        //region server properties

        get host() {
            return this.#host;
        }

        get port() {
            return this.#port;
        }

        get connectedAt() {
            return this.#connectedAt;
        }

        get verbose() {
            return this.#verbose;
        }

        set verbose(value) {
            if ((value >= Client['verbose']['0']) && (value <= Client['verbose']['ß'])) {
                _verbose({'verbose': 9}, 1, "warn",
                    `${this.#name} : verbose <${this.#verbose}> set to <${value}>`
                );
                this.#verbose = value;
            } // if ()
        }

        //endregion server properties

    } // class Client

    Object.defineProperties(Client, {
        'verbose': {
            'value': {
                0: 0, // REM: silent
                9: 9  // REM: full verbose
            }
        }
    });
    Object.seal(Client);

    return Client;

};