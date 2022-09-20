import { Controller, Get, Param, Redirect, Render } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Controller('')
export class AppController {
  constructor() {}
  
  @Get()
  @Redirect(`/${uuidv4()}`, 302)
  getHello(): string {
    return ;
  }

  @Get('/:room')
  @Render('room.ejs')
  getRoomId(@Param('room') roomId): any {
    return {
      roomId: roomId
    }
  }

}