// version 0.1.2

module.exports = ({'net': net, 'hrt': hrt, 'enum': _enum_}) => {

    class Client {

        //region private
        
        #client = null;
        #host	= "localhost";
        #port   = 80;

        //endregion private

        constructor({'host': host = "localhost", 'port': port = 80}) {
        	this.#host = host;
            this.#port = port;
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
	                        console.log('connected to server!');
	                    } // cb
                    ); // net.connect()

                    this.#client.on('data', (data) => {
                        console.log(data.toString());
                    });

                    this.#client.on('end', () => {
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