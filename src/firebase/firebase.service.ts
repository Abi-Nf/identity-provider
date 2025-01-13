import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  verifyIdToken(idToken: string): Promise<auth.DecodedIdToken> {
    return auth().verifyIdToken(idToken);
  }
}
