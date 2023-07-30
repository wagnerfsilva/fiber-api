import { Module } from '@nestjs/common';
import { FirebaseRealtimeService } from './firebaseRealtime.service';
import { FirebaseModule } from 'src/services/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [FirebaseRealtimeService],
  exports: [FirebaseRealtimeService],
})
export class FirebaseRealtimeModule {}
