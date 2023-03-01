import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33060,
      username: 'root',
      password: '12qwaszx',
      database: 'nest-tut',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
})
export class AppModule {}
