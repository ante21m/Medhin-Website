import { GalleryService } from '../services/gallery.service';
import { CreateGalleryDto, UpdateGalleryDto } from '../dtos/gallery.dto';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    findAll(): Promise<import("../entities/gallery.entity").Gallery[]>;
    findOne(id: string): Promise<import("../entities/gallery.entity").Gallery>;
    create(dto: CreateGalleryDto): Promise<import("../entities/gallery.entity").Gallery>;
    update(id: string, dto: UpdateGalleryDto): Promise<import("../entities/gallery.entity").Gallery>;
    remove(id: string): Promise<void>;
    seed(): Promise<import("../entities/gallery.entity").Gallery[]>;
}
