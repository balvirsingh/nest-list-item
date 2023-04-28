import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ListItemService } from './list-item.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { ApiBearerAuth, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('list-item')
@Controller('list-item')
@UseGuards(JwtAuthGuard)
export class ListItemController {
  constructor(private readonly listItemService: ListItemService) {}

  @Public()
  @Get('public')
  publicMethod(@Res() response) {
    //response.status(200).send('This is public route');
    //response.status(200).json(['This is public route']);
    response.status(HttpStatus.OK).json(['This is public route']);
  }

  @Get()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  findAll(@Query() paginationQuery) {
    //const { limit, offset } = paginationQuery;
    return this.listItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.listItemService.findOne(id);
  }

  @Post()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBearerAuth()
  create(@Body() body: CreateListDto, @Request() req) {
    console.log(req.user);
    return true;
    return this.listItemService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateListDto) {
    return this.listItemService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listItemService.remove(id);
  }
}
