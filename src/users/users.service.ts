import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findByUsername(name: string) {
    return this.usersRepository.findByUsername(name);
  }

  async findById(id: ObjectId) {
    return this.usersRepository.findById(id);
  }

  async create(userDto: CreateUserDto) {
    return this.usersRepository.create(userDto);
  }

  async update(id: string, userDto: UpdateUserDto) {
    return this.usersRepository.update(id, userDto);
  }

  async remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
