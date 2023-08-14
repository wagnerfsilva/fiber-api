import { Injectable } from '@nestjs/common';
import firebaseAdmin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  app: firebaseAdmin.app.App;

  constructor() {
    this.app = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        clientEmail: process.env.FIREBASE_EMAIL,
        privateKey: process.env.FIREBASE_KEY?.replace(/\\n/g, '\n'),
        projectId: process.env.FIREBASE_ID,
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
}
