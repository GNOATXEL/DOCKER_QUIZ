import * as amqp from "amqplib";
const { connect, Connection, Channel, ConsumeMessage } = amqp;

class RabbitMQConnectClass {
    connection_RABBIT!: amqp.Connection;
    channel!: amqp.Channel;
    private connected!: boolean;

    constructor() {
        this.connected = false;

    }

    async connect() {
        console.log("on rentre dans la connect")
        if (this.connected && this.channel) return;
        else this.connected = true;

        try {
            this.connection_RABBIT = await connect(
                "amqp://" + process.env.RABBITMQ_USER + ':' + process.env.RABBITMQ_PASS + '@' + process.env.RABBITMQ_HOST + ":" + process.env.RABBITMQ_PORT + "/"
            );
            // on creer un chanel sur la nouvelle connexion
            this.channel = await this.connection_RABBIT.createChannel();
            //on creer une Queue sur notre chanel
            await this.channel.assertQueue(process.env.RABBITMQ_QUEUE, {durable:true})

        } catch (error) {
            console.error(error);
            console.error(`Not connected`);
        }
    }

    async sendToQueue(queue: string, message: any) {
        // on essaye de se connecter au chanel, si on y arrive on ajoute le message à la queue
        try {
            if (!this.channel) {
                await this.connect();
            }

            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        } catch (error) {
            throw error;
        }
    }
}
// on appelle notre objet pour l'utiliser
const notificationConnexion = new RabbitMQConnectClass();

export default notificationConnexion;
