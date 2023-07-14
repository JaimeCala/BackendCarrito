import {MigrationInterface, QueryRunner} from "typeorm";

export class primerami1637633852444 implements MigrationInterface {
    name = 'primerami1637633852444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login" ("idlogin" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "fecha" date NOT NULL, "hora" TIME NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idusuario" integer, CONSTRAINT "UQ_c9db456a9dca0e6e45d16669e9a" UNIQUE ("username"), CONSTRAINT "PK_50ba318012b060e609beead047a" PRIMARY KEY ("idlogin"))`);
        await queryRunner.query(`CREATE TABLE "unidadproducto" ("idunidadproducto" SERIAL NOT NULL, "valor" character varying(20), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idproducto" integer, CONSTRAINT "PK_ee8891a0ffdfa74511d01919638" PRIMARY KEY ("idunidadproducto"))`);
        await queryRunner.query(`CREATE TABLE "imgproducto" ("idimgproducto" SERIAL NOT NULL, "nombreimgprodu" character varying(50) NOT NULL, "linkimgprodu" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idproducto" integer, CONSTRAINT "PK_057d7146a0707a9f9d6a78d923f" PRIMARY KEY ("idimgproducto"))`);
        await queryRunner.query(`CREATE TABLE "imgcategoria" ("idimgcategoria" SERIAL NOT NULL, "nombreimgcategoria" character varying(50) NOT NULL, "linkimgcategoria" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idcategoria" integer, CONSTRAINT "PK_96bf4e9a7d54fe02b2d22a6d282" PRIMARY KEY ("idimgcategoria"))`);
        await queryRunner.query(`CREATE TABLE "categoria" ("idcategoria" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9d3cc004e86fc94714b2bca1d86" PRIMARY KEY ("idcategoria"))`);
        await queryRunner.query(`CREATE TABLE "proveedor" ("idproveedor" SERIAL NOT NULL, "nombre" character varying(25) NOT NULL, "ci_nit" character varying(20) NOT NULL, "telefono" character varying(10) NOT NULL, "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "email" character varying(50) NOT NULL, "direccion" character varying(100) NOT NULL, "fecha" date NOT NULL, "hora" TIME NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c8d091af76c3bf4f4bacd17569a" PRIMARY KEY ("idproveedor"))`);
        await queryRunner.query(`CREATE TABLE "compra" ("idcompra" SERIAL NOT NULL, "precio_compra_uni" double precision NOT NULL, "precio_compra_total" double precision NOT NULL, "tipo_comprobante" character varying(20) NOT NULL, "num_comprobante" character varying(20) NOT NULL, "cantidad_ingreso" integer NOT NULL, "observacion" character varying(150), "fecha" date NOT NULL, "hora" TIME NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idproveedor" integer, "idproducto" integer, CONSTRAINT "PK_754f1ce4c972617d36462439969" PRIMARY KEY ("idcompra"))`);
        await queryRunner.query(`CREATE TABLE "producto" ("idproducto" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "descripcion" character varying(100) NOT NULL, "stock" integer NOT NULL, "minimo" integer NOT NULL, "maximo" integer NOT NULL, "vencimiento" character varying, "precio" double precision NOT NULL, "disponible" character varying(15), "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "peso" double precision, "fecha" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idcategoria" integer, CONSTRAINT "UQ_d86d179360134b4b74bda750664" UNIQUE ("nombre"), CONSTRAINT "PK_9a87a8b8af75084e6b5a6a8d7da" PRIMARY KEY ("idproducto"))`);
        await queryRunner.query(`CREATE TABLE "pedidoproducto" ("idpedidoproducto" SERIAL NOT NULL, "cantidad" integer NOT NULL, "precio_uni" double precision, "precio_total" double precision, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idpedido" integer, "idproducto" integer, CONSTRAINT "PK_3c6e641f613f6ba51ced39c4409" PRIMARY KEY ("idpedidoproducto"))`);
        await queryRunner.query(`CREATE TABLE "cliente" ("idcliente" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idusuario" integer, CONSTRAINT "REL_3f0136ca48eeebd3feee686564" UNIQUE ("idusuario"), CONSTRAINT "PK_9f6fbdd4ab4aa4431fa02539a46" PRIMARY KEY ("idcliente"))`);
        await queryRunner.query(`CREATE TABLE "repartidor" ("idrepartidor" SERIAL NOT NULL, "fecha" date NOT NULL, "hora" TIME NOT NULL, "estado" character varying(10) NOT NULL DEFAULT 'CAMINO', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idusuario" integer, "idpedido" integer, CONSTRAINT "PK_ee1d0680acbae18e558893ac3f3" PRIMARY KEY ("idrepartidor"))`);
        await queryRunner.query(`CREATE TABLE "pedido" ("idpedido" SERIAL NOT NULL, "comentario" character varying(250), "direccion" character varying(250), "precio" double precision, "latitud" character varying(100) NOT NULL, "longitud" character varying(100) NOT NULL, "fecha" date NOT NULL, "hora" TIME NOT NULL, "estado" character varying(10) NOT NULL DEFAULT 'ESPERA', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idcliente" integer, CONSTRAINT "PK_70726b8cb4f3ce27a06bd47b93c" PRIMARY KEY ("idpedido"))`);
        await queryRunner.query(`CREATE TABLE "venta" ("idventa" SERIAL NOT NULL, "estadopedido" character varying(15) NOT NULL, "observacion" character varying(200), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idvendedor" integer, "idpedido" integer, CONSTRAINT "PK_34a4a8091275c8bb662095f3e46" PRIMARY KEY ("idventa"))`);
        await queryRunner.query(`CREATE TABLE "vendedor" ("idvendedor" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idusuario" integer, CONSTRAINT "REL_e63f3d56265f80f6edde3e8b37" UNIQUE ("idusuario"), CONSTRAINT "PK_53a1e999e2b539fd05539a9172d" PRIMARY KEY ("idvendedor"))`);
        await queryRunner.query(`CREATE TABLE "modulo" ("idmodulo" SERIAL NOT NULL, "nombremodulo" character varying(25) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1d92ac39f5441c03f1a64d10422" PRIMARY KEY ("idmodulo"))`);
        await queryRunner.query(`CREATE TABLE "operacion" ("idoperacion" SERIAL NOT NULL, "nombreoperacion" character varying(25) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idmodulo" integer, CONSTRAINT "PK_b0d92e11ff9835f5e98d2a8fbbb" PRIMARY KEY ("idoperacion"))`);
        await queryRunner.query(`CREATE TABLE "roloperacion" ("idroloperacion" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idoperacion" integer, "idrol" integer, CONSTRAINT "PK_94a3b5ff4a3649243f2b1985130" PRIMARY KEY ("idroloperacion"))`);
        await queryRunner.query(`CREATE TABLE "rol" ("idrol" SERIAL NOT NULL, "nombre" character varying(25) NOT NULL, "fecha" date NOT NULL, "hora" TIME NOT NULL, "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_654858cf0914fbd65b6f01e22a2" PRIMARY KEY ("idrol"))`);
        await queryRunner.query(`CREATE TABLE "users" ("idusuario" SERIAL NOT NULL, "ci" character varying(10) NOT NULL, "expedido" character varying(5) NOT NULL, "nombre" character varying(25) NOT NULL, "paterno" character varying(25) NOT NULL, "materno" character varying(25), "email" character varying NOT NULL, "celular" character varying(10) NOT NULL, "direccion" character varying(100) NOT NULL, "sexo" character varying(10) NOT NULL, "ciudad" character varying(50) NOT NULL, "estado" character varying(8) NOT NULL DEFAULT 'ACTIVO', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idrol" integer, CONSTRAINT "UQ_eff3cf686729ac337fe991de64f" UNIQUE ("ci"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_3814f9195aa2c392b21567d1dd0" PRIMARY KEY ("idusuario"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("idadmin" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idusuario" integer, CONSTRAINT "REL_87615ac80024790342ea99c514" UNIQUE ("idusuario"), CONSTRAINT "PK_6aa1c71c1e17f29974bfbffe7cf" PRIMARY KEY ("idadmin"))`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "FK_5b112e983b18a721c138efb35c1" FOREIGN KEY ("idusuario") REFERENCES "users"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unidadproducto" ADD CONSTRAINT "FK_922d3f2f204d46b67822fcc6a82" FOREIGN KEY ("idproducto") REFERENCES "producto"("idproducto") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "imgproducto" ADD CONSTRAINT "FK_f6be2ef9ca491155cbf689ee5fa" FOREIGN KEY ("idproducto") REFERENCES "producto"("idproducto") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "imgcategoria" ADD CONSTRAINT "FK_a26713a717533d3566acdb50924" FOREIGN KEY ("idcategoria") REFERENCES "categoria"("idcategoria") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "FK_86823f9bccdcf720e35ea9aa692" FOREIGN KEY ("idproveedor") REFERENCES "proveedor"("idproveedor") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "FK_d99cf064d7b89a937a20baf9afb" FOREIGN KEY ("idproducto") REFERENCES "producto"("idproducto") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_e96a2e6d1ac1a8dee7d7e062b07" FOREIGN KEY ("idcategoria") REFERENCES "categoria"("idcategoria") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidoproducto" ADD CONSTRAINT "FK_8da3b50705140cc28e824ab2be0" FOREIGN KEY ("idpedido") REFERENCES "pedido"("idpedido") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedidoproducto" ADD CONSTRAINT "FK_237f146932115fcc4aacf99b6f0" FOREIGN KEY ("idproducto") REFERENCES "producto"("idproducto") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD CONSTRAINT "FK_3f0136ca48eeebd3feee6865645" FOREIGN KEY ("idusuario") REFERENCES "users"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repartidor" ADD CONSTRAINT "FK_6c16d9086ea48b4e8ee6af80c11" FOREIGN KEY ("idusuario") REFERENCES "users"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repartidor" ADD CONSTRAINT "FK_418867b89200edd309a0f8265c1" FOREIGN KEY ("idpedido") REFERENCES "pedido"("idpedido") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_fccc3928c03ba03ad25f6558706" FOREIGN KEY ("idcliente") REFERENCES "cliente"("idcliente") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venta" ADD CONSTRAINT "FK_35e58338f79d84e25e3aaf49ab0" FOREIGN KEY ("idvendedor") REFERENCES "vendedor"("idvendedor") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venta" ADD CONSTRAINT "FK_9df5da2d3f05e4c979d33c7fcad" FOREIGN KEY ("idpedido") REFERENCES "pedido"("idpedido") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendedor" ADD CONSTRAINT "FK_e63f3d56265f80f6edde3e8b378" FOREIGN KEY ("idusuario") REFERENCES "users"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operacion" ADD CONSTRAINT "FK_27926a32fdb37f6bf59fcf7978b" FOREIGN KEY ("idmodulo") REFERENCES "modulo"("idmodulo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roloperacion" ADD CONSTRAINT "FK_45866033d6532aa3d4774ca63b8" FOREIGN KEY ("idoperacion") REFERENCES "operacion"("idoperacion") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roloperacion" ADD CONSTRAINT "FK_706a66dcb612887d0584f0b2f62" FOREIGN KEY ("idrol") REFERENCES "rol"("idrol") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ec88e574f91424645a7b2744c78" FOREIGN KEY ("idrol") REFERENCES "rol"("idrol") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_87615ac80024790342ea99c514c" FOREIGN KEY ("idusuario") REFERENCES "users"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_87615ac80024790342ea99c514c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ec88e574f91424645a7b2744c78"`);
        await queryRunner.query(`ALTER TABLE "roloperacion" DROP CONSTRAINT "FK_706a66dcb612887d0584f0b2f62"`);
        await queryRunner.query(`ALTER TABLE "roloperacion" DROP CONSTRAINT "FK_45866033d6532aa3d4774ca63b8"`);
        await queryRunner.query(`ALTER TABLE "operacion" DROP CONSTRAINT "FK_27926a32fdb37f6bf59fcf7978b"`);
        await queryRunner.query(`ALTER TABLE "vendedor" DROP CONSTRAINT "FK_e63f3d56265f80f6edde3e8b378"`);
        await queryRunner.query(`ALTER TABLE "venta" DROP CONSTRAINT "FK_9df5da2d3f05e4c979d33c7fcad"`);
        await queryRunner.query(`ALTER TABLE "venta" DROP CONSTRAINT "FK_35e58338f79d84e25e3aaf49ab0"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_fccc3928c03ba03ad25f6558706"`);
        await queryRunner.query(`ALTER TABLE "repartidor" DROP CONSTRAINT "FK_418867b89200edd309a0f8265c1"`);
        await queryRunner.query(`ALTER TABLE "repartidor" DROP CONSTRAINT "FK_6c16d9086ea48b4e8ee6af80c11"`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP CONSTRAINT "FK_3f0136ca48eeebd3feee6865645"`);
        await queryRunner.query(`ALTER TABLE "pedidoproducto" DROP CONSTRAINT "FK_237f146932115fcc4aacf99b6f0"`);
        await queryRunner.query(`ALTER TABLE "pedidoproducto" DROP CONSTRAINT "FK_8da3b50705140cc28e824ab2be0"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_e96a2e6d1ac1a8dee7d7e062b07"`);
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "FK_d99cf064d7b89a937a20baf9afb"`);
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "FK_86823f9bccdcf720e35ea9aa692"`);
        await queryRunner.query(`ALTER TABLE "imgcategoria" DROP CONSTRAINT "FK_a26713a717533d3566acdb50924"`);
        await queryRunner.query(`ALTER TABLE "imgproducto" DROP CONSTRAINT "FK_f6be2ef9ca491155cbf689ee5fa"`);
        await queryRunner.query(`ALTER TABLE "unidadproducto" DROP CONSTRAINT "FK_922d3f2f204d46b67822fcc6a82"`);
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "FK_5b112e983b18a721c138efb35c1"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TABLE "roloperacion"`);
        await queryRunner.query(`DROP TABLE "operacion"`);
        await queryRunner.query(`DROP TABLE "modulo"`);
        await queryRunner.query(`DROP TABLE "vendedor"`);
        await queryRunner.query(`DROP TABLE "venta"`);
        await queryRunner.query(`DROP TABLE "pedido"`);
        await queryRunner.query(`DROP TABLE "repartidor"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TABLE "pedidoproducto"`);
        await queryRunner.query(`DROP TABLE "producto"`);
        await queryRunner.query(`DROP TABLE "compra"`);
        await queryRunner.query(`DROP TABLE "proveedor"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
        await queryRunner.query(`DROP TABLE "imgcategoria"`);
        await queryRunner.query(`DROP TABLE "imgproducto"`);
        await queryRunner.query(`DROP TABLE "unidadproducto"`);
        await queryRunner.query(`DROP TABLE "login"`);
    }

}
