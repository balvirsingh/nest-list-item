import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(List)
    private readonly listItemRepository: Repository<List>,
  ) {}

  findAll() {
    return this.listItemRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: string) {
    const listItem = await this.listItemRepository.findOne({
      where: { id: +id },
      relations: {
        user: true,
      },
    });
    if (!listItem) {
      throw new NotFoundException(`ListItem #${id} not found`);
    }
    return listItem;
  }

  create(createListDto: CreateListDto) {
    const listItem = this.listItemRepository.create(createListDto);
    return this.listItemRepository.save(listItem);
  }

  async update(id: string, updateListDto: UpdateListDto) {
    const listItem = await this.listItemRepository.preload({
      id: +id,
      ...updateListDto,
    });
    if (!listItem) {
      throw new NotFoundException(`ListItem #${id} not found`);
    }
    return this.listItemRepository.save(listItem);
  }

  async remove(id: string) {
    const listItem = await this.findOne(id);
    return this.listItemRepository.remove(listItem);
  }
}
