import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leadership } from '../entities/leadership.entity';
import { CreateLeadershipDto, UpdateLeadershipDto } from '../dtos/leadership.dto';

const seedData = [
  {
    name: 'Dr. Kassaw Alemayehu',
    nameAm: 'ዶ/ር ቃሳው አለማየሁ',
    role: 'CEO & Medical Director',
    roleAm: 'ስልጣኔ ኃላፊ እና የሕክምና መሪ',
    bio: 'Dr. Kassaw brings over 20 years of leadership experience in healthcare administration and clinical practice.',
    image: '/leadership/dr-kassaw.jpg',
    experience: '20+ Years',
    certificates: ['MD - Addis Ababa University', 'MBA in Healthcare Management'],
    awards: ['Healthcare Leadership Award 2023'],
    order: 1,
  },
  {
    name: 'Dr. Hana Tesfaye',
    nameAm: 'ዶ/ር ሀና ተስፋዬ',
    role: 'Chief of Medical Services',
    roleAm: 'የሕክምና አገልግሎት ዋና ኃላፊ',
    bio: 'Dr. Hana oversees all clinical operations and ensures the highest standards of patient care.',
    image: '/leadership/dr-hana.jpg',
    experience: '15+ Years',
    certificates: ['MD - Jimma University', 'Specialty in Internal Medicine'],
    awards: ['Excellence in Patient Care 2022'],
    order: 2,
  },
  {
    name: 'Samuel Bekele',
    nameAm: 'ሳሙኤል በቀለ',
    role: 'Chief Operations Officer',
    roleAm: 'የስራ ኃላፊ',
    bio: 'Samuel manages hospital operations, ensuring efficient service delivery and resource management.',
    image: '/leadership/samuel-bekele.jpg',
    experience: '12+ Years',
    certificates: ['BSc in Health Administration', 'MPH - Ethiopian Civil Service University'],
    awards: [],
    order: 3,
  },
];

@Injectable()
export class LeadershipService {
  constructor(
    @InjectRepository(Leadership)
    private repo: Repository<Leadership>,
  ) {}

  findAll(): Promise<Leadership[]> {
    return this.repo.find({ where: { isActive: true }, order: { order: 'ASC' } });
  }

  findAllAdmin(): Promise<Leadership[]> {
    return this.repo.find({ order: { order: 'ASC' } });
  }

  async findOne(id: number): Promise<Leadership> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Leadership not found');
    return item;
  }

  create(dto: CreateLeadershipDto): Promise<Leadership> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateLeadershipDto): Promise<Leadership> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }

  async seed(): Promise<Leadership[]> {
    const count = await this.repo.count();
    if (count > 0) return this.repo.find();
    return this.repo.save(this.repo.create(seedData));
  }
}
