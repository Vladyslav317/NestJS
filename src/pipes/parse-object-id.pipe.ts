import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, ObjectId> {
  transform(value: string): ObjectId {
    const validObjectId: boolean = ObjectId.isValid(value);

    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const objectId: ObjectId = ObjectId.createFromHexString(value);

    return objectId;
  }
}
