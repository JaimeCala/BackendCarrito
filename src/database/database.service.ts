import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from 'src/config/config.keys';



export const databaseProviders = [
   TypeOrmModule.forRootAsync({
       imports:[ConfigModule],
       inject: [ConfigService],
       async useFactory(config: ConfigService){
           return {
               //ssl: true,
               type: 'postgres',
               //type: 'postgres' as 'postgres',
               host: config.get(Configuration.HOST),
               superuser: config.get(Configuration.SUPERUSER),
               username: config.get(Configuration.USERNAME),
               password: config.get(Configuration.PASSWORD),
               port: 5432,
               database: config.get(Configuration.DATABASE),

               //los directorios funcionan en localhost sin haberlos habilitado

               //entities: [__dirname + '/../../dist/**/*.entity{.ts,.js}'],
               //migrations: [__dirname + '/../../dist/migration/*{.ts,.js}'],
               entities: [__dirname + '/../**/*.entity{.ts,.js}'],
               migrations: [__dirname + '/migration/*{.ts,.js}'],
               synchronize: true
               
           } as ConnectionOptions;
           
       },

   }),
];