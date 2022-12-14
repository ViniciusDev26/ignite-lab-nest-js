import { Module } from '@nestjs/common';
import { UUIDGenerator } from 'src/domain/contracts/gateways/uuid';
import { CryptoAdapter } from './CryptoAdapter';

@Module({
  providers: [
    {
      provide: UUIDGenerator,
      useClass: CryptoAdapter,
    },
  ],
  exports: [UUIDGenerator],
})
export class CryptographModule {}
