import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      throw new BadRequestException('Authorization header missing');
    }

    const idToken = authorization.split('Bearer ')[1];
    if (!idToken) {
      throw new BadRequestException('Token missing in Authorization header');
    }

    try {
      req['user'] = await this.firebaseService.verifyIdToken(idToken);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Unauthorized: Invalid token');
    }
  }
}
