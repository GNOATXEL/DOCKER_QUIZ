import mqConnection from "../notification/Connection";

export type INotification = {
    // notre notification elle à un titre et un contenu
    titre: string;
    contenu: string;
};

export const sendNotification = async (notification: INotification) => {
    await mqConnection.sendToQueue(process.env.RABBITMQ_QUEUE, notification);

    console.log(`notification sent`);
};