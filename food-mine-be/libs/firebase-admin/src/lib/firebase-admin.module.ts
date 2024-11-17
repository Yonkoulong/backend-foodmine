import { Global, Module } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';


const serviceAccount: ServiceAccount = {
  projectId: process.env["FIREBASE_PROJECT_ID"] || '',
  privateKey: process.env["FIREBASE_PRIVATE_KEY"]?.replace(/\\n/g, '\n') || '', // Handle newline characters
  clientEmail: process.env["FIREBASE_CLIENT_EMAIL"] || '',
}

@Global()
@Module({
  controllers: [],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const firebaseApp = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: process.env["FIREBASE_DATABASE_URL"] || ''
        })
        return firebaseApp
      }
    },
    {
      provide: 'FIREBASE_DATABASE',
      useFactory: () => {
        const firebaseApp = admin.app();
        return firebaseApp.database(); //Realtime Database
      }
    }
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseAdminModule {}
