import { CreateServiceDto } from './dtos/service.dto';

export const seedServices: CreateServiceDto[] = [
  {
    name: 'Emergency Service',
    icon: 'ambulance',
    description: '24/7 rapid and professional emergency medical care',
    order: 1,
    image: '/images/services/emergency.jpg',
  },
  {
    name: 'Delivery Service',
    icon: 'baby',
    description: 'Safe and compassionate maternal and newborn care',
    order: 2,
    image: '/images/services/delivery.jpg',
  },
  {
    name: 'Laboratory Service',
    icon: 'flask',
    description: 'Accurate and reliable medical diagnostic services',
    order: 3,
    image: '/images/services/laboratory.jpg',
  },
  {
    name: 'X-Ray Service',
    icon: 'scan',
    description: 'Modern digital X-ray diagnostic imaging',
    order: 4,
    image: '/images/services/xray.jpg',
  },
  {
    name: 'Ultrasound Service',
    icon: 'radar',
    description: 'Safe and precise ultrasound diagnostic imaging',
    order: 5,
    image: '/images/services/ultrasound.jpg',
  },
  {
    name: 'CT Scan',
    icon: 'brain',
    description: 'High-resolution CT scan diagnostic imaging',
    order: 6,
    image: '/images/services/ct-scan.jpg',
  },
  {
    name: 'Surgical Service',
    icon: 'scissors',
    description: 'Minor and intermediate surgical procedures performed by expert surgeons',
    order: 7,
    image: '/images/services/surgical.jpg',
  },
  {
    name: 'ECG (Electrocardiogram)',
    icon: 'heart',
    description: 'Heart rhythm and electrical activity assessment',
    order: 8,
    image: '/images/services/ecg.jpg',
  },
];
