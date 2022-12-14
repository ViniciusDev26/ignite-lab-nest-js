import { UUIDGenerator } from 'src/domain/contracts/gateways/uuid';

export class UUIDGeneratorMock implements UUIDGenerator {
  uuid() {
    return 'generatedUUID';
  }
}
