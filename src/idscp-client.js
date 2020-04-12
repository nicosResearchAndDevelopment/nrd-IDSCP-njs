module.exports = ({'net': net, 'enum': _enum_}) => {



    class Client {

        //region private
        #client = null;
        #port   = 80;

        //endregion private

        constructor({'port': port = 80}) {
            this.#port = port;
        } // constructor

        //region server functions

        connect() {
            return new Promise((resolve, reject) => {
                try {
                    this.#client = net.connect({'port': this.#port}, function () {
                        console.log('connected to server!');
                    });

                    this.#client.on('data', function (data) {
                        console.log(data.toString());
                        //client.end();
                    });

                    this.#client.on('end', function () {
                        console.log('disconnected from server');
                    });

                } catch (jex) {
                    reject(jex);
                } // try
            }); // return P

        } // listen ()

        //endregion server functions

        //region server properties

        get port() {
            return this.#port;
        }

        //endregion server properties

    } // class Client

    return Client;

};