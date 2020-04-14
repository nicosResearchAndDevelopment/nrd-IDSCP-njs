/*********************************************************
 description    : idscp-server
 version        : 0.1.3
 see also       : https://industrial-data-space.github.io/trusted-connector-documentation/
 see also       : https://github.com/International-Data-Spaces-Association/IDS-G/tree/master/core/Technologies/idscp
 author         : jlangkau@nicos-rd.com
 *********************************************************/

module.exports = ({'net': net, 'hrt': hrt, 'enum': _enum_}) => {

    //region fn

    function _verbose(instance, level, mode = "log", message) {
        if (instance['verbose'] >= level)
            console[mode](`${(new Date).toISOString()} : ${message}`);
    } // verbose()

    //endregion fn

    class Server {

        //region private

        #server;
        #name;
        #port        = 80;
        #listening   = false;
        #startedAt   = -1;
        #connections = new Map();
        #verbose     = 0 //REM: silent

        //endregion private

        constructor({
                        'name':    name = "idscp server",
                        'port':    port = 80,
                        'verbose': verbose = 9
                    }) {

            this.#name    = name;
            this.#port    = port;
            this.#verbose = verbose;

            this.#server = net.createServer((connection) => {

                let message = `${this.#name} : client connected to address <>, family`
                _verbose(this, 1, "log", message);

                connection.on('end', () => {
                    let message = `${this.#name} : on.end() : client disconnected`
                    _verbose(this, 5, "log", message);
                });
                connection.write('Hello Universe!');
                connection.pipe(connection);
            }); // net.createServer()

        } // constructor

        //region server functions

        listen() {

            return new Promise((resolve, reject) => {
                try {
                    this.#server.listen(this.#port, () => {

                        this.#startedAt = hrt();
                        this.#listening = true;

                        let message = `${this.#name} : start listening at <${(new Date).toISOString()}> on port <${this.#port}> : <${this.#listening}>`
                        _verbose(this, 1, "log", message);

                        resolve({'message': message});
                    });
                } catch (jex) {
                    reject(jex);
                } // try
            }); // return P

        } // listen ()

        //endregion server functions

        //region server properties

        get name() {
            return this.#name;
        }

        get connections() {
            return this.#connections;
        }

        get listening() {
            return this.#listening;
        }

        get startedAt() {
            return this.#startedAt;
        }

        get port() {
            return this.#port;
        }

        get verbose() {
            return this.#verbose;
        }

        set verbose(value) {
            if ((value >= Server['verbose']['0']) && (value <= Server['verbose']['ß'])) {
                _verbose({'verbose': 9}, 1, "warn",
                    `${this.#name} : verbose <${this.#verbose}> set to <${value}>`
                );
                this.#verbose = value;
            } // if ()
        } // set verbose

        //endregion server properties

    } // class Server

    Object.defineProperties(Server, {
        'verbose': {
            'value': {
                0: 0, // REM: silent
                9: 9  // REM: full verbose
            }
        }
    });
    Object.seal(Server);

    return Server;

};