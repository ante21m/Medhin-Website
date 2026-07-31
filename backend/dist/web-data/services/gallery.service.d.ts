import { Repository } from 'typeorm';
import { Gallery } from '../entities/gallery.entity';
import { CreateGalleryDto, UpdateGalleryDto } from '../dtos/gallery.dto';
export declare class GalleryService {
    private galleryRepository;
    constructor(galleryRepository: Repository<Gallery>);
    findAll(): Promise<Gallery[]>;
    findOne(id: number): Promise<Gallery>;
    create(dto: CreateGalleryDto): Promise<Gallery>;
    update(id: number, dto: UpdateGalleryDto): Promise<Gallery>;
    remove(id: number): Promise<void>;
    seed(): Promise<Gallery[]>;
}
