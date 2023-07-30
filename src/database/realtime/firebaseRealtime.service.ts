import { Injectable } from '@nestjs/common';
import { getDatabase, Database, Reference } from 'firebase-admin/database';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Injectable()
export class FirebaseRealtimeService {
  database: Database;

  codigosValidaEmail: Reference;

  constructor(private readonly firebaseService: FirebaseService) {
    this.database = getDatabase(this.firebaseService.app);

    this.codigosValidaEmail = this.database.ref('codigosValidaEmail');
  }
}
