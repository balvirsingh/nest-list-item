import { Module } from '@nestjs/common';
import { ListItemController } from './list-item.controller';
import { ListItemService } from './list-item.service';
import { List } from './entities/list.entity';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([List, User])],
  controllers: [ListItemController],
  providers: [ListItemService],
})
export class ListItemModule {}
