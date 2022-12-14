import * as crypto from 'node:crypto';
import { UUIDGenerator } from 'src/domain/contracts/gateways/uuid';

export class CryptoAdapter implements UUIDGenerator {
  uuid() {
    return crypto.randomUUID();
  }
}
