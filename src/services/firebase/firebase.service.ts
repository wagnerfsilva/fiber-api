import { Injectable } from '@nestjs/common';
import firebaseAdmin from 'firebase-admin';
import * as serviceAccount from 'firebase-keys/fiber-d1860-firebase-adminsdk-tzfwa-859108ba29.json';

@Injectable()
export class FirebaseService {
  app: firebaseAdmin.app.App;

  constructor() {
    this.app = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
        projectId: serviceAccount.project_id,
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
}
