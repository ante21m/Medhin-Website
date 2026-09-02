import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSetting } from '../entities/site-settings.entity';
import { CreateSiteSettingDto, UpdateSiteSettingDto } from '../dtos/site-settings.dto';

const defaultSettings = [
  { key: 'home_stats_experience', value: '25', group: 'home' },
  { key: 'home_stats_experience_suffix', value: '+', group: 'home' },
  { key: 'home_stats_doctors', value: '50', group: 'home' },
  { key: 'home_stats_doctors_suffix', value: '+', group: 'home' },
  { key: 'home_stats_patients', value: '100', group: 'home' },
  { key: 'home_stats_patients_suffix', value: 'K+', group: 'home' },
  { key: 'home_stats_departments', value: '12', group: 'home' },
  { key: 'home_stats_departments_suffix', value: '+', group: 'home' },
  { key: 'hero_slides', value: JSON.stringify([
    { src: '/images/hospital-hero.jpg', title: 'Medhin Primary Hospital', titleAm: 'መድህን ፕራይማሪ ሆስፒታል', subtitle: 'Quality healthcare in Woldia — expert doctors, modern diagnostics, and compassionate care.', subtitleAm: 'በወልዲያ የላቀ የጤና አገልግሎት — ባለሙያ ሐኪሞች፣ ዘመናዊ ምርምር እና ልቡና ያለው እንክብካቤ።' },
    { src: '/images/hospital-1.jpg', title: 'Your Health, Our Priority', titleAm: 'ጤናዎ ቅድሚያችን ነው', subtitle: 'Expert Care, Compassionate Hearts', subtitleAm: 'ባለሙያ እንክብካቤ፣ አዛኝ ልቦች' },
    { src: '/images/hospital-2.jpg', title: 'Advanced Medical Technology', titleAm: 'ዘመናዊ የሕክምና ቴክኖሎጂ', subtitle: '24/7 Emergency Services', subtitleAm: 'የ24/7 የአደጋ ጊዜ አገልግሎት' },
  ]), group: 'home' },
  { key: 'home_partners', value: JSON.stringify(['Woldia University', 'North Wollo Health Bureau', 'Ethiopian Medical Association', 'WHO Ethiopia', 'UNICEF Ethiopia']), group: 'home' },
  { key: 'home_departments', value: JSON.stringify([
    { id: 'emergency', icon: 'FaAmbulance', color: '#ef4444' },
    { id: 'laboratory', icon: 'FaFlask', color: '#8b5cf6' },
    { id: 'xray', icon: 'FaXRay', color: '#f97316' },
    { id: 'surgical', icon: 'FaCut', color: 'var(--primary)' },
    { id: 'ecg', icon: 'FaHeartbeat', color: '#7FD9C4' },
    { id: 'delivery', icon: 'FaBaby', color: '#ec4899' },
    { id: 'ultrasound', icon: 'FaDesktop', color: '#06b6d4' },
    { id: 'ct-scan', icon: 'FaBrain', color: '#14b8a6' },
  ]), group: 'home' },
  { key: 'search_items', value: JSON.stringify([
    { label: 'Cardiology', href: '/departments', category: 'Departments' },
    { label: 'Neurology', href: '/departments', category: 'Departments' },
    { label: 'Orthopedics', href: '/departments', category: 'Departments' },
    { label: 'Pediatrics', href: '/departments', category: 'Departments' },
    { label: 'All Departments', href: '/departments', category: 'Departments' },
    { label: 'Emergency Care', href: '/services', category: 'Services' },
    { label: 'Delivery Service', href: '/services', category: 'Services' },
    { label: 'Laboratory', href: '/services', category: 'Services' },
    { label: 'Surgical Service', href: '/services', category: 'Services' },
    { label: 'X-Ray', href: '/services', category: 'Services' },
    { label: 'Ultrasound', href: '/services', category: 'Services' },
    { label: 'CT Scan', href: '/services', category: 'Services' },
    { label: 'ECG', href: '/services', category: 'Services' },
    { label: 'Book Appointment', href: '/appointment', category: 'Pages' },
    { label: 'Contact Us', href: '/contact', category: 'Pages' },
    { label: 'About Our Clinic', href: '/about-us/company', category: 'Pages' },
    { label: 'Our Physicians', href: '/about-us/physicians', category: 'Pages' },
    { label: 'Vision & Mission', href: '/about-us/vision-mission', category: 'Pages' },
    { label: 'Careers / Vacancy', href: '/vacancy', category: 'Pages' },
    { label: 'News & Updates', href: '/news', category: 'Pages' },
    { label: 'FAQs', href: '/about-us/faqs', category: 'Pages' },
    { label: 'Gallery', href: '/about-us/gallery', category: 'Pages' },
  ]), group: 'search' },
];

@Injectable()
export class SiteSettingsService {
  constructor(
    @InjectRepository(SiteSetting)
    private repo: Repository<SiteSetting>,
  ) {}

  async findAll(): Promise<SiteSetting[]> {
    return this.repo.find({ where: { isActive: true }, order: { group: 'ASC', key: 'ASC' } });
  }

  async findAllAdmin(): Promise<SiteSetting[]> {
    return this.repo.find({ order: { group: 'ASC', key: 'ASC' } });
  }

  async findByGroup(group: string): Promise<SiteSetting[]> {
    return this.repo.find({ where: { group, isActive: true }, order: { key: 'ASC' } });
  }

  async get(key: string): Promise<SiteSetting | null> {
    return this.repo.findOne({ where: { key } });
  }

  async getMany(keys: string[]): Promise<Record<string, string>> {
    const settings = await this.repo.find({ where: keys.map(k => ({ key: k })), select: ['key', 'value'] });
    const map: Record<string, string> = {};
    for (const s of settings) {
      if (s.isActive) map[s.key] = s.value;
    }
    return map;
  }

  async create(dto: CreateSiteSettingDto): Promise<SiteSetting> {
    const setting = this.repo.create(dto);
    return this.repo.save(setting);
  }

  async update(key: string, dto: UpdateSiteSettingDto): Promise<SiteSetting> {
    let setting = await this.repo.findOne({ where: { key } });
    if (!setting) throw new NotFoundException(`Setting "${key}" not found`);
    Object.assign(setting, dto);
    return this.repo.save(setting);
  }

  async remove(key: string): Promise<void> {
    const setting = await this.repo.findOne({ where: { key } });
    if (!setting) throw new NotFoundException(`Setting "${key}" not found`);
    await this.repo.remove(setting);
  }

  async seed(): Promise<SiteSetting[]> {
    const existing = await this.repo.find();
    if (existing.length > 0) return existing;
    const entities = this.repo.create(defaultSettings);
    return this.repo.save(entities);
  }
}
