import {MigrationInterface, QueryRunner, Table} from "typeorm";


export class AddUserTable1562222612033 implements MigrationInterface {
  public tableName = "test.user";

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("test.user");
    await queryRunner.query("DROP TYPE test.user_role_enum;");
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TYPE test.user_role_enum AS ENUM (
        'admin',
        'user'
      );
    `);

    const table = new Table({
      name: "test.user",
      columns: [
        {
          name: "id",
          type: "serial",
          isPrimary: true,
        },
        {
          name: "email",
          type: "varchar",
        },
        {
          name: "password",
          type: "varchar",
        },
        {
          name: "biometric_public_key",
          type: "varchar",
          isNullable: true,
        },
        {
          name: "roles",
          type: "test.user_role_enum",
          isArray: true,
        },
      ],
    });

    await queryRunner.createTable(table, true);
  }
}
