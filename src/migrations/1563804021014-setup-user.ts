import {MigrationInterface, QueryRunner} from "typeorm";

export class SetupUser1563804021014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const passwordHash = "6c9311b5a0c96b76e6535d5c57a96d67a405779d2284aaf154148cdcbefc5af6"; // My5up3r5tr0ngP@55w0rd
    const biometricPublicKey =
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyiLoIn" +
      "CN1qeo1k3JeEjpMKpbpZhiwSOMFQ9PgA0xFNK1EHh5sGdfwiVc" +
      "Xc5JV8ciXJLjbXO+4W5WWlKz26K3Cl3zLn92kQCkEnxhO2aqS9" +
      "OZ4AIwo0/ww7+QD6q57/UJFsqaTHAdetb2E3jrDDFZX5kegAV+" +
      "xXh38+nP8Zopx/A8DXI6P9FKBwpZredRqd3gw3j6bNiEmGW9wZ" +
      "CU3kghi7u3bWbjkmrN35Sg8CGnx2r0krAskx4I5JMKeYetr4fK" +
      "xxoArF9XJHl5gi/2aUk342iFTbZtRKIRbgFkeeUqTw7e5QsSFl" +
      "AFGIWkIq1QSveH0PnFe2nidZHpGKWeiSsqGQIDAQAB";

    await queryRunner.query("TRUNCATE TABLE test.user RESTART IDENTITY CASCADE;");

    await queryRunner.query(`
      INSERT INTO test.user (
        email,
        password,
        biometric_public_key,
        roles
      ) VALUES (
        'trejgun@gmail.com',
        '${passwordHash}',
        '${biometricPublicKey}',
        '{admin}'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("TRUNCATE TABLE test.user RESTART IDENTITY CASCADE;");
  }
}
