import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'
import { knex, Knex } from "knex"
import Expo, { ExpoPushMessage } from "expo-server-sdk";
import * as dotenv from 'dotenv'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp()
// Verify JWT token and return user ID
const verifyUser = async (token?: string) => {
    if (token) {
        const decoded = await admin.auth().verifyIdToken(token)
        return decoded.uid
    }
    throw new Error('Invalid token, unauthorized');
}

type NotificationData = {
    userID: string,
    message: string,
    imageURL?: string
}
if (!process.env.PG_USER) {
    dotenv.config()
}

const expo = new Expo({accessToken: process.env.EXPO_ACCESS_TOKEN})

export const sendNotifications = functions.https.onRequest(async (req, res) => {
    try {
        await verifyUser(req.body.JWTToken)
        const notifications = req.body.notifications as NotificationData[]
        // Function has been authorized, send res at this point
        const createCloudPool = (config?: Knex.Config) => {
            const dbSocketPath = process.env.PG_SOCKET_PATH || '/cloudsql';
            // Establish a connection to the database
            return knex({
                client: 'pg',
                connection: {
                    user : process.env.PG_USER,
                    password : process.env.PG_PASS,
                    database : process.env.PG_DATABASE,
                    host: `${dbSocketPath}/${process.env.PG_INSTANCE}`
                },
                // ... Specify additional properties here.
                ...config,
            });
        };
        const POOL = createCloudPool()
        // Convert notification object to push messages
        let pushMessages = (await Promise.all(notifications.map(async (notif) => {
            const token = (await POOL('User').where({userID: notif.userID}).select('expoPushToken'))[0]['expoPushToken'] as string
            if (!token) {
                return;
            }
            const pushMessage: ExpoPushMessage = {
                to: token,
                body: notif.message,
                data: {
                    imageURL: notif.imageURL
                }
            }
            return pushMessage
        }))).filter((message) => (message !== undefined)) as ExpoPushMessage[]
        const chunks = expo.chunkPushNotifications(pushMessages);
        // Send notifications and get their tickets
        await Promise.all(chunks.map(async (chunk) => {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
            for (const ticket of ticketChunk) {
                if (ticket.status === 'error') {
                    console.error('A notification failed to send.')
                    console.log(ticket)
                }
            }
        }))
        res.status(200).send()
    } catch (e) {
        console.error(e)
        res.status(500).json({
        error: e
        })
    }
})