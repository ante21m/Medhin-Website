import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../auth/user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Ensure new columns exist and seed the default admin user on startup
  async onModuleInit() {
    try {
      // Fallback in case the users table was never created manually
      await this.userRepository.query(
        `CREATE TABLE IF NOT EXISTS "users" (
          "id" SERIAL PRIMARY KEY,
          "name" varchar NULL,
          "email" varchar NULL,
          "phone" varchar NULL,
          "username" varchar NOT NULL,
          "password" varchar NOT NULL,
          "role" varchar NOT NULL DEFAULT 'admin',
          "createdAt" timestamp NOT NULL DEFAULT now(),
          "updatedAt" timestamp NOT NULL DEFAULT now()
        )`,
      );
      await this.userRepository.query(
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS "name" varchar NULL`,
      );
      await this.userRepository.query(
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS "email" varchar NULL`,
      );
      await this.userRepository.query(
        `ALTER TABLE users ADD COLUMN IF NOT EXISTS "phone" varchar NULL`,
      );
      await this.seedDefaultUser();
    } catch (error) {
      this.logger.error(
        'Failed to initialize users table / default user',
        error as any,
      );
    }
  }

  // Default user seeded from .env: DEFAULT_ADMIN_USERNAME / DEFAULT_ADMIN_PASSWORD
  private async seedDefaultUser() {
    const username = (process.env.DEFAULT_ADMIN_USERNAME || 'admin').toLowerCase();
    const password = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';

    const existing = await this.userRepository.findOne({
      where: { username: ILike(username) },
    });
    if (existing) return;

    const name = username.charAt(0).toUpperCase() + username.slice(1);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      email: `${username}@medhinhospital.com`,
      phone: '+251000000000',
      username,
      password: hashedPassword,
      role: 'admin',
    });
    await this.userRepository.save(user);
    this.logger.log(`Default admin user seeded (${username} / ${password})`);
  }

  private sanitize(user: User) {
    const { password, ...rest } = user;
    return rest;
  }

  async findAll() {
    const users = await this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
    return users.map((u) => this.sanitize(u));
  }

  // The users table id is numeric; fall back to the raw string for uuid ids
  private idWhere(id: string) {
    const asNumber = Number(id);
    return Number.isNaN(asNumber) ? { id } : { id: asNumber as any as string };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: this.idWhere(id),
    });
    if (!user) throw new NotFoundException('User not found');
    return this.sanitize(user);
  }

  async create(dto: CreateUserDto) {
    const existingUsername = await this.userRepository.findOne({
      where: { username: ILike(dto.username.trim()) },
    });
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }
    const existingEmail = await this.userRepository.findOne({
      where: { email: ILike(dto.email.trim()) },
    });
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email.trim().toLowerCase(),
      phone: dto.phone,
      username: dto.username.trim(),
      password: hashedPassword,
      role: dto.role || 'admin',
    });
    const saved = await this.userRepository.save(user);
    return this.sanitize(saved);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: this.idWhere(id),
    });
    if (!user) throw new NotFoundException('User not found');

    if (dto.username && dto.username !== user.username) {
      const existing = await this.userRepository.findOne({
        where: { username: dto.username },
      });
      if (existing) throw new ConflictException('Username already exists');
    }
    if (dto.email && dto.email !== user.email) {
      const existing = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (existing) throw new ConflictException('Email already exists');
    }

    if (dto.name !== undefined) user.name = dto.name;
    if (dto.email !== undefined) user.email = dto.email;
    if (dto.phone !== undefined) user.phone = dto.phone;
    if (dto.username !== undefined) user.username = dto.username;
    if (dto.role !== undefined) user.role = dto.role;
    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    const saved = await this.userRepository.save(user);
    return this.sanitize(saved);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: this.idWhere(id),
    });
    if (!user) throw new NotFoundException('User not found');

    // Prevent removing the last remaining admin account
    if (user.role === 'admin') {
      const adminCount = await this.userRepository.count({
        where: { role: 'admin' },
      });
      if (adminCount <= 1) {
        throw new BadRequestException(
          'Cannot delete the last remaining admin user',
        );
      }
    }

    await this.userRepository.remove(user);
    return { deleted: true };
  }
}
