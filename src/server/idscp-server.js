// version 0.1.2

module.exports = ({'net': net, 'hrt': hrt, 'enum': _enum_}) => {

    class Server {

        //region private

        #server;
        #port        = 80;
        #listening   = false;
        #startedAt   = -1;
        #connections = new Map();

        //endregion private

        constructor({'port': port = 80}) {

            this.#port   = port;
            this.#server = net.createServer((connection) => {

                console.log('client connected');
                //TODO: key
                //this.#connections.set(connection, connection);

                connection.on('end', () => {
                    console.log('client disconnected');
                });

                connection.write('Hello World!\r\n');
                connection.pipe(connection);

            });

        } // constructor

        //region server functions

        listen() {
            return new Promise((resolve, reject) => {
                try {
                    this.#server.listen(this.#port, () => {
                        console.log('server is listening');
                        this.#startedAt = hrt();
                        this.#listening = true;
                        resolve({'message': `idscp server : listening on port <${this.#port}> : <${this.#listening}>`});
                    });
                } catch (jex) {
                    reject(jex);
                } // try
            }); // return P

        } // listen ()

        //endregion server functions

        //region server properties

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

        //endregion server properties

    } // class Server

    return Server;

};