import { DataSource } from 'typeorm';
import { Category } from '../category/category.entity';
import { Product } from '../product/entities/product.entity';
import { ProductAttribute } from '../product/entities/product-attribute.entity';
import { ProductVariant } from '../product/entities/product-variant.entity';
import { WarrantyUnit } from '../product/entities/product-attribute.entity';

const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'furniro.db',
  entities: [Category, Product, ProductAttribute, ProductVariant],
  synchronize: true,
});

// ---------------------------------------------------------------------------
// Pricing helpers
//
// Variant prices are no longer arbitrary random numbers: they're derived from
// the product's base price, adjusted by two multipliers:
//  - color: vibrant/saturated hues and a few "special" finishes (pure
//    black/white, metallic gold, etc.) cost more.
//  - size: bigger sizes scale the price up proportionally.
// ---------------------------------------------------------------------------

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s, l };
}

// Finishes that read as "premium" regardless of how saturated they are
// (pure black, pure white, metallics/gold).
const SPECIAL_COLORS = new Set([
  '#000000',
  '#FFFFFF',
  '#B88E2F',
  '#C0C0C0',
  '#FFD700',
]);
const SPECIAL_COLOR_BONUS = 0.15;

// Vibrant colors (high saturation, not too dark/too light) get a bonus
// proportional to how saturated they are.
const VIBRANT_SATURATION_THRESHOLD = 0.45;
const VIBRANT_MAX_BONUS = 0.35;

function getColorPriceMultiplier(hex: string): number {
  const { s, l } = hexToHsl(hex);
  let multiplier = 1;

  if (SPECIAL_COLORS.has(hex.toUpperCase())) {
    multiplier += SPECIAL_COLOR_BONUS;
  }

  if (s > VIBRANT_SATURATION_THRESHOLD && l > 0.2 && l < 0.85) {
    multiplier += s * VIBRANT_MAX_BONUS;
  }

  return multiplier;
}

// Sizes scale price proportionally around a neutral "S" baseline.
const SIZE_PRICE_MULTIPLIERS: Record<string, number> = {
  XS: 0.85,
  S: 1.0,
  M: 1.08,
  L: 1.16,
  XL: 1.24,
};

function getSizePriceMultiplier(size: string): number {
  return SIZE_PRICE_MULTIPLIERS[size] ?? 1;
}

function computeVariantPrice(basePrice: number, color: string, size: string) {
  const raw =
    basePrice * getColorPriceMultiplier(color) * getSizePriceMultiplier(size);
  return Math.round(raw / 1000) * 1000;
}

// ---------------------------------------------------------------------------
// Product images
//
// Every product gets its own main image plus 3 more, reused from other
// products' images (no external URLs).
// ---------------------------------------------------------------------------

function buildImageArray(pool: string[], ownImage: string): string[] {
  const others = pool.filter((image) => image !== ownImage);
  const shuffled = [...others].sort(() => Math.random() - 0.5);
  return [ownImage, ...shuffled.slice(0, 3)];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = [
  '#FF0000',
  '#0000FF',
  '#00FF00',
  '#808080',
  '#FFFFFF',
  '#000000',
  '#F5F0DC',
  '#8B4513',
];
const discounts = [10, 20, 30, 40, 50];

const warranties: { warrantyQuantity: number; warrantyUnit: WarrantyUnit }[] = [
  { warrantyQuantity: 1, warrantyUnit: WarrantyUnit.YEARS },
  { warrantyQuantity: 1, warrantyUnit: WarrantyUnit.YEARS },
  { warrantyQuantity: 1, warrantyUnit: WarrantyUnit.YEARS },
  { warrantyQuantity: 2, warrantyUnit: WarrantyUnit.YEARS },
  { warrantyQuantity: 6, warrantyUnit: WarrantyUnit.MONTHS },
  { warrantyQuantity: 18, warrantyUnit: WarrantyUnit.MONTHS },
  { warrantyQuantity: 21, warrantyUnit: WarrantyUnit.DAYS },
  { warrantyQuantity: 14, warrantyUnit: WarrantyUnit.DAYS },
];

// ---------------------------------------------------------------------------
// Seed products imported from db.json
//
// These are real, hand-curated products (name, description, price, discount,
// warranty and variant colors/sizes) adapted to the same shape the rest of
// this script uses to create products. Variant prices and the `images` array
// are (re)computed by this script rather than copied from the JSON, so they
// follow the same rules as every other product.
// ---------------------------------------------------------------------------

interface JsonSeedProduct {
  sku: string;
  name: string;
  description: string;
  fullDescription: string;
  additionalInformation: string;
  image: string;
  price: number;
  discount: number | null;
  postedAt: string;
  categoryName: 'Dining' | 'Living' | 'Bedroom' | 'Sofas';
  warranty: { warrantyQuantity: number; warrantyUnit: WarrantyUnit };
  variants: { color: string; size: string }[];
}

const jsonProducts: JsonSeedProduct[] = [
  {
    sku: 'DIN-001',
    name: 'Syltherine',
    description: 'Stylish cafe chair',
    fullDescription:
      'The Syltherine combines a clean silhouette with a comfortable seat, making it suitable for dining rooms, cafés and compact social areas.',
    additionalInformation:
      'Wood, fabric and reinforced components. Available in compact, standard and large sizes. Clean with a soft dry cloth and avoid abrasive products. Warranty: 2 years',
    image: 'syltherine.png',
    price: 2500000,
    discount: 30,
    postedAt: '2026-07-02',
    categoryName: 'Dining',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#C8A97E', size: 'S' },
      { color: '#76543E', size: 'M' },
      { color: '#222222', size: 'L' },
    ],
  },
  {
    sku: 'DIN-002',
    name: 'Leviosa',
    description: 'Stylish cafe chair',
    fullDescription:
      'The Leviosa is a lightweight café chair designed for everyday use, with a neutral profile that works in both modern and classic interiors.',
    additionalInformation:
      'Wood, fabric and reinforced components. Available in compact, standard and large sizes. Clean with a soft dry cloth and avoid abrasive products. Warranty: 2 years',
    image: 'leviosa.png',
    price: 2500000,
    discount: null,
    postedAt: '2026-06-28',
    categoryName: 'Dining',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#C8A97E', size: 'S' },
      { color: '#76543E', size: 'M' },
      { color: '#222222', size: 'L' },
    ],
  },
  {
    sku: 'LIV-003',
    name: 'Lolito',
    description: 'Luxury big sofa',
    fullDescription:
      'The Lolito is a spacious sofa created for larger living rooms, offering generous seating and a refined contemporary appearance.',
    additionalInformation:
      'Wood structure, foam and upholstery. Available in compact, standard and large configurations. Vacuum regularly and clean stains with a damp neutral cloth. Warranty: 2 years',
    image: 'lolito.png',
    price: 7000000,
    discount: 50,
    postedAt: '2026-05-15',
    categoryName: 'Living',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#D8C8B5', size: 'S' },
      { color: '#8D8D8D', size: 'M' },
      { color: '#795548', size: 'L' },
    ],
  },
  {
    sku: 'LIV-004',
    name: 'Respira',
    description: 'Outdoor bar table and stool',
    fullDescription:
      'The Respira set brings a practical table-and-stool combination to balconies, patios and other casual outdoor environments.',
    additionalInformation:
      'Wood structure, foam and upholstery. Available in compact, standard and large configurations. Vacuum regularly and clean stains with a damp neutral cloth. Warranty: 2 years',
    image: 'respira.jpg',
    price: 500000,
    discount: null,
    postedAt: '2026-07-05',
    categoryName: 'Living',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#D8C8B5', size: 'S' },
      { color: '#8D8D8D', size: 'M' },
      { color: '#795548', size: 'L' },
    ],
  },
  {
    sku: 'BED-005',
    name: 'Grifo',
    description: 'Night lamp',
    fullDescription:
      'The Grifo is a compact bedside lamp that provides soft ambient lighting while keeping a discreet and minimalist presence.',
    additionalInformation:
      'Fabric, metal and decorative composite materials. Available in compact, standard and large sizes. Keep dry and clean gently according to the selected finish. Warranty: 2 years',
    image: 'grifo.png',
    price: 1500000,
    discount: null,
    postedAt: '2026-04-10',
    categoryName: 'Bedroom',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#F4F1EA', size: 'S' },
      { color: '#D9C7AF', size: 'M' },
      { color: '#A0A0A0', size: 'L' },
    ],
  },
  {
    sku: 'DIN-006',
    name: 'Muggo',
    description: 'Small mug',
    fullDescription:
      'The Muggo is a small everyday mug with a simple shape, comfortable grip and versatile finish for informal dining spaces.',
    additionalInformation:
      'Wood, fabric and reinforced components. Available in compact, standard and large sizes. Clean with a soft dry cloth and avoid abrasive products. Warranty: 2 years',
    image: 'muggo.png',
    price: 150000,
    discount: null,
    postedAt: '2026-07-01',
    categoryName: 'Dining',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#C8A97E', size: 'S' },
      { color: '#76543E', size: 'M' },
      { color: '#222222', size: 'L' },
    ],
  },
  {
    sku: 'BED-007',
    name: 'Pingky',
    description: 'Cute bed set',
    fullDescription:
      'The Pingky bed set combines coordinated fabrics and soft textures to create a comfortable and welcoming bedroom composition.',
    additionalInformation:
      'Fabric, metal and decorative composite materials. Available in compact, standard and large sizes. Keep dry and clean gently according to the selected finish. Warranty: 2 years',
    image: 'pingky.jpg',
    price: 7000000,
    discount: 50,
    postedAt: '2026-06-18',
    categoryName: 'Bedroom',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#F4F1EA', size: 'S' },
      { color: '#D9C7AF', size: 'M' },
      { color: '#A0A0A0', size: 'L' },
    ],
  },
  {
    sku: 'LIV-008',
    name: 'Potty',
    description: 'Minimalist flower pot',
    fullDescription:
      'The Potty is a minimalist flower pot designed to display small plants without competing with the surrounding decoration.',
    additionalInformation:
      'Wood structure, foam and upholstery. Available in compact, standard and large configurations. Vacuum regularly and clean stains with a damp neutral cloth. Warranty: 2 years',
    image: 'potty.jpg',
    price: 500000,
    discount: null,
    postedAt: '2026-03-20',
    categoryName: 'Living',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#D8C8B5', size: 'S' },
      { color: '#8D8D8D', size: 'M' },
      { color: '#795548', size: 'L' },
    ],
  },
  {
    sku: 'DIN-009',
    name: 'Nordic Chair',
    description: 'Modern wooden dining chair',
    fullDescription:
      'The Nordic Chair uses a warm wooden appearance and balanced proportions to complement contemporary dining tables and breakfast spaces.',
    additionalInformation:
      'Wood, fabric and reinforced components. Available in compact, standard and large sizes. Clean with a soft dry cloth and avoid abrasive products. Warranty: 2 years',
    image: 'syltherine.png',
    price: 1850000,
    discount: 10,
    postedAt: '2026-07-03',
    categoryName: 'Dining',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#C8A97E', size: 'S' },
      { color: '#76543E', size: 'M' },
      { color: '#222222', size: 'L' },
    ],
  },
  {
    sku: 'DIN-010',
    name: 'Urban Seat',
    description: 'Comfortable upholstered chair',
    fullDescription:
      'The Urban Seat combines an upholstered surface with a compact frame, providing extra comfort for dining and multipurpose rooms.',
    additionalInformation:
      'Wood, fabric and reinforced components. Available in compact, standard and large sizes. Clean with a soft dry cloth and avoid abrasive products. Warranty: 2 years',
    image: 'leviosa.png',
    price: 2350000,
    discount: 15,
    postedAt: '2026-06-10',
    categoryName: 'Dining',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#C8A97E', size: 'S' },
      { color: '#76543E', size: 'M' },
      { color: '#222222', size: 'L' },
    ],
  },
  {
    sku: 'LIV-011',
    name: 'Cloud Sofa',
    description: 'Large premium living room sofa',
    fullDescription:
      'The Cloud Sofa offers broad seating, soft cushioning and a premium finish for relaxed living rooms and family spaces.',
    additionalInformation:
      'Wood structure, foam and upholstery. Available in compact, standard and large configurations. Vacuum regularly and clean stains with a damp neutral cloth. Warranty: 2 years',
    image: 'lolito.png',
    price: 8200000,
    discount: 20,
    postedAt: '2026-05-30',
    categoryName: 'Living',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#D8C8B5', size: 'S' },
      { color: '#8D8D8D', size: 'M' },
      { color: '#795548', size: 'L' },
    ],
  },
  {
    sku: 'LIV-012',
    name: 'Garden Rest',
    description: 'Outdoor coffee table set',
    fullDescription:
      'The Garden Rest is an outdoor coffee-table set designed for informal gatherings, combining practical proportions with an easygoing look.',
    additionalInformation:
      'Wood structure, foam and upholstery. Available in compact, standard and large configurations. Vacuum regularly and clean stains with a damp neutral cloth. Warranty: 2 years',
    image: 'respira.jpg',
    price: 890000,
    discount: 5,
    postedAt: '2026-07-06',
    categoryName: 'Living',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#D8C8B5', size: 'S' },
      { color: '#8D8D8D', size: 'M' },
      { color: '#795548', size: 'L' },
    ],
  },
  {
    sku: 'BED-013',
    name: 'Luna Lamp',
    description: 'Minimalist standing lamp',
    fullDescription:
      'The Luna Lamp provides focused and ambient lighting through a slim standing profile suited to bedrooms and reading corners.',
    additionalInformation:
      'Fabric, metal and decorative composite materials. Available in compact, standard and large sizes. Keep dry and clean gently according to the selected finish. Warranty: 2 years',
    image: 'grifo.png',
    price: 1700000,
    discount: 25,
    postedAt: '2026-06-01',
    categoryName: 'Bedroom',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#F4F1EA', size: 'S' },
      { color: '#D9C7AF', size: 'M' },
      { color: '#A0A0A0', size: 'L' },
    ],
  },
  {
    sku: 'DIN-014',
    name: 'Mini Cup',
    description: 'Decorative ceramic mug',
    fullDescription:
      'The Mini Cup is a decorative ceramic piece that can be used for small servings or as a subtle accent on shelves and tables.',
    additionalInformation:
      'Wood, fabric and reinforced components. Available in compact, standard and large sizes. Clean with a soft dry cloth and avoid abrasive products. Warranty: 2 years',
    image: 'muggo.png',
    price: 180000,
    discount: null,
    postedAt: '2026-07-04',
    categoryName: 'Dining',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#C8A97E', size: 'S' },
      { color: '#76543E', size: 'M' },
      { color: '#222222', size: 'L' },
    ],
  },
  {
    sku: 'BED-015',
    name: 'Soft Dream',
    description: 'Modern fabric sofa set',
    fullDescription:
      'The Soft Dream is a fabric sofa set with gentle lines and comfortable cushioning, suitable for calm bedroom or lounge compositions.',
    additionalInformation:
      'Fabric, metal and decorative composite materials. Available in compact, standard and large sizes. Keep dry and clean gently according to the selected finish. Warranty: 2 years',
    image: 'pingky.jpg',
    price: 6800000,
    discount: 35,
    postedAt: '2026-05-08',
    categoryName: 'Bedroom',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#F4F1EA', size: 'S' },
      { color: '#D9C7AF', size: 'M' },
      { color: '#A0A0A0', size: 'L' },
    ],
  },
  {
    sku: 'LIV-016',
    name: 'Clay Pot',
    description: 'Decorative indoor flower pot',
    fullDescription:
      'The Clay Pot highlights indoor plants through a natural ceramic-inspired finish and a shape that fits a variety of surfaces.',
    additionalInformation:
      'Wood structure, foam and upholstery. Available in compact, standard and large configurations. Vacuum regularly and clean stains with a damp neutral cloth. Warranty: 2 years',
    image: 'potty.jpg',
    price: 620000,
    discount: null,
    postedAt: '2026-06-26',
    categoryName: 'Living',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#D8C8B5', size: 'S' },
      { color: '#8D8D8D', size: 'M' },
      { color: '#795548', size: 'L' },
    ],
  },
  {
    sku: 'DIN-017',
    name: 'Classic Chair',
    description: 'Elegant dining chair',
    fullDescription:
      'The Classic Chair brings traditional proportions to a modern dining environment, balancing elegance, comfort and everyday durability.',
    additionalInformation:
      'Wood, fabric and reinforced components. Available in compact, standard and large sizes. Clean with a soft dry cloth and avoid abrasive products. Warranty: 2 years',
    image: 'syltherine.png',
    price: 2100000,
    discount: 30,
    postedAt: '2026-04-18',
    categoryName: 'Dining',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#C8A97E', size: 'S' },
      { color: '#76543E', size: 'M' },
      { color: '#222222', size: 'L' },
    ],
  },
  {
    sku: 'DIN-018',
    name: 'Loft Chair',
    description: 'Industrial style chair',
    fullDescription:
      'The Loft Chair uses an industrial-inspired profile and straightforward construction for kitchens, dining rooms and creative workspaces.',
    additionalInformation:
      'Wood, fabric and reinforced components. Available in compact, standard and large sizes. Clean with a soft dry cloth and avoid abrasive products. Warranty: 2 years',
    image: 'leviosa.png',
    price: 2750000,
    discount: 10,
    postedAt: '2026-07-07',
    categoryName: 'Dining',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#C8A97E', size: 'S' },
      { color: '#76543E', size: 'M' },
      { color: '#222222', size: 'L' },
    ],
  },
  {
    sku: 'LIV-019',
    name: 'Royal Sofa',
    description: 'Luxury sectional sofa',
    fullDescription:
      'The Royal Sofa is a large sectional model designed to become the main seating element in spacious and sophisticated living rooms.',
    additionalInformation:
      'Wood structure, foam and upholstery. Available in compact, standard and large configurations. Vacuum regularly and clean stains with a damp neutral cloth. Warranty: 2 years',
    image: 'lolito.png',
    price: 9100000,
    discount: 40,
    postedAt: '2026-05-22',
    categoryName: 'Living',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#D8C8B5', size: 'S' },
      { color: '#8D8D8D', size: 'M' },
      { color: '#795548', size: 'L' },
    ],
  },
  {
    sku: 'LIV-020',
    name: 'Patio Set',
    description: 'Outdoor lounge furniture',
    fullDescription:
      'The Patio Set provides coordinated outdoor seating for balconies and gardens, with pieces sized for conversation and relaxation.',
    additionalInformation:
      'Wood structure, foam and upholstery. Available in compact, standard and large configurations. Vacuum regularly and clean stains with a damp neutral cloth. Warranty: 2 years',
    image: 'respira.jpg',
    price: 1200000,
    discount: 15,
    postedAt: '2026-06-15',
    categoryName: 'Living',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#D8C8B5', size: 'S' },
      { color: '#8D8D8D', size: 'M' },
      { color: '#795548', size: 'L' },
    ],
  },
  {
    sku: 'BED-021',
    name: 'Aurora Lamp',
    description: 'Contemporary floor lamp',
    fullDescription:
      'The Aurora Lamp adds contemporary floor lighting through a clean vertical form that works beside beds, sofas and reading chairs.',
    additionalInformation:
      'Fabric, metal and decorative composite materials. Available in compact, standard and large sizes. Keep dry and clean gently according to the selected finish. Warranty: 2 years',
    image: 'grifo.png',
    price: 1600000,
    discount: 20,
    postedAt: '2026-07-01',
    categoryName: 'Bedroom',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#F4F1EA', size: 'S' },
      { color: '#D9C7AF', size: 'M' },
      { color: '#A0A0A0', size: 'L' },
    ],
  },
  {
    sku: 'DIN-022',
    name: 'Ceramic Mug',
    description: 'Minimalist ceramic mug',
    fullDescription:
      'The Ceramic Mug pairs a minimalist shape with a smooth finish for daily drinks, table settings and decorative arrangements.',
    additionalInformation:
      'Wood, fabric and reinforced components. Available in compact, standard and large sizes. Clean with a soft dry cloth and avoid abrasive products. Warranty: 2 years',
    image: 'muggo.png',
    price: 210000,
    discount: 5,
    postedAt: '2026-05-12',
    categoryName: 'Dining',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#C8A97E', size: 'S' },
      { color: '#76543E', size: 'M' },
      { color: '#222222', size: 'L' },
    ],
  },
  {
    sku: 'LIV-023',
    name: 'Harmony Sofa',
    description: 'Comfortable living room sofa',
    fullDescription:
      'The Harmony Sofa focuses on balanced cushioning and approachable proportions for comfortable everyday use in living rooms.',
    additionalInformation:
      'Wood structure, foam and upholstery. Available in compact, standard and large configurations. Vacuum regularly and clean stains with a damp neutral cloth. Warranty: 2 years',
    image: 'pingky.jpg',
    price: 7300000,
    discount: 30,
    postedAt: '2026-06-29',
    categoryName: 'Living',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#D8C8B5', size: 'S' },
      { color: '#8D8D8D', size: 'M' },
      { color: '#795548', size: 'L' },
    ],
  },
  {
    sku: 'LIV-024',
    name: 'Bloom Pot',
    description: 'Elegant decorative flower pot',
    fullDescription:
      'The Bloom Pot is a decorative planter with an elegant profile designed for flowers, foliage and compact indoor arrangements.',
    additionalInformation:
      'Wood structure, foam and upholstery. Available in compact, standard and large configurations. Vacuum regularly and clean stains with a damp neutral cloth. Warranty: 2 years',
    image: 'potty.jpg',
    price: 550000,
    discount: 10,
    postedAt: '2026-04-28',
    categoryName: 'Living',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#D8C8B5', size: 'S' },
      { color: '#8D8D8D', size: 'M' },
      { color: '#795548', size: 'L' },
    ],
  },
  {
    sku: 'SS001',
    name: 'Asgaard sofa',
    description:
      'Compact sofa with balanced comfort and a distinctive modern look.',
    fullDescription:
      'The Asgaard sofa combines a compact profile with distinctive woven details, balanced cushioning and a modern outdoor-inspired appearance.',
    additionalInformation:
      'Wood structure, woven panels and upholstered cushions. Available in L, XL and XS configurations. Clean the frame with a dry cloth and the upholstery with a neutral damp cloth. Warranty: 2 years',
    image: 'asgaard-sofa.png',
    price: 250000,
    discount: null,
    postedAt: '2026-07-08',
    categoryName: 'Sofas',
    warranty: {
      warrantyQuantity: 2,
      warrantyUnit: WarrantyUnit.YEARS,
    },
    variants: [
      { color: '#816DFA', size: 'L' },
      { color: '#816DFA', size: 'XL' },
      { color: '#816DFA', size: 'XS' },
      { color: '#000000', size: 'L' },
      { color: '#000000', size: 'XL' },
      { color: '#000000', size: 'XS' },
      { color: '#B88E2F', size: 'L' },
      { color: '#B88E2F', size: 'XL' },
      { color: '#B88E2F', size: 'XS' },
    ],
  },
];

const diningProducts = [
  { name: 'Grifo Dining Chair', image: 'grifo.png' },
  { name: 'Leviosa Dining Table', image: 'leviosa.png' },
  { name: 'Lolito Dining Set', image: 'lolito.png' },
  { name: 'Muggo Side Table', image: 'muggo.png' },
  { name: 'Pingky Stool', image: 'pingky.jpg' },
  { name: 'Potty Bar Chair', image: 'potty.jpg' },
  { name: 'Respira Bench', image: 'respira.jpg' },
  { name: 'Syltherine Chair', image: 'syltherine.png' },
  { name: 'Grifo Armchair', image: 'grifo.png' },
  { name: 'Leviosa Side Chair', image: 'leviosa.png' },
  { name: 'Lolito Bar Stool', image: 'lolito.png' },
  { name: 'Muggo Dining Chair', image: 'muggo.png' },
  { name: 'Pingky Dining Table', image: 'pingky.jpg' },
  { name: 'Potty Dining Set', image: 'potty.jpg' },
  { name: 'Respira Side Table', image: 'respira.jpg' },
  { name: 'Syltherine Bench', image: 'syltherine.png' },
  { name: 'Grifo Bench Pro', image: 'grifo.png' },
  { name: 'Leviosa Stool', image: 'leviosa.png' },
  { name: 'Lolito Armchair', image: 'lolito.png' },
  { name: 'Muggo Bar Chair', image: 'muggo.png' },
  { name: 'Pingky Side Chair', image: 'pingky.jpg' },
  { name: 'Potty Bench', image: 'potty.jpg' },
  { name: 'Respira Armchair', image: 'respira.jpg' },
  { name: 'Syltherine Stool', image: 'syltherine.png' },
  { name: 'Grifo Side Table', image: 'grifo.png' },
  { name: 'Leviosa Bench', image: 'leviosa.png' },
  { name: 'Lolito Side Table', image: 'lolito.png' },
  { name: 'Muggo Stool', image: 'muggo.png' },
  { name: 'Pingky Armchair', image: 'pingky.jpg' },
  { name: 'Potty Side Chair', image: 'potty.jpg' },
  { name: 'Respira Dining Set', image: 'respira.jpg' },
  { name: 'Syltherine Dining Table', image: 'syltherine.png' },
  { name: 'Grifo Bar Stool', image: 'grifo.png' },
  { name: 'Leviosa Armchair', image: 'leviosa.png' },
];

const livingProducts = [
  { name: 'Grifo Sofa', image: 'grifo.png' },
  { name: 'Leviosa Coffee Table', image: 'leviosa.png' },
  { name: 'Lolito Bookshelf', image: 'lolito.png' },
  { name: 'Muggo TV Stand', image: 'muggo.png' },
  { name: 'Pingky Armchair', image: 'pingky.jpg' },
  { name: 'Potty Ottoman', image: 'potty.jpg' },
  { name: 'Respira Loveseat', image: 'respira.jpg' },
  { name: 'Syltherine Sofa', image: 'syltherine.png' },
  { name: 'Grifo Coffee Table', image: 'grifo.png' },
  { name: 'Leviosa Bookshelf', image: 'leviosa.png' },
  { name: 'Lolito TV Stand', image: 'lolito.png' },
  { name: 'Muggo Sofa', image: 'muggo.png' },
  { name: 'Pingky Coffee Table', image: 'pingky.jpg' },
  { name: 'Potty Bookshelf', image: 'potty.jpg' },
  { name: 'Respira TV Stand', image: 'respira.jpg' },
  { name: 'Syltherine Ottoman', image: 'syltherine.png' },
  { name: 'Grifo Loveseat', image: 'grifo.png' },
  { name: 'Leviosa Ottoman', image: 'leviosa.png' },
  { name: 'Lolito Sofa', image: 'lolito.png' },
  { name: 'Muggo Armchair', image: 'muggo.png' },
  { name: 'Pingky TV Stand', image: 'pingky.jpg' },
  { name: 'Potty Loveseat', image: 'potty.jpg' },
  { name: 'Respira Sofa', image: 'respira.jpg' },
  { name: 'Syltherine Bookshelf', image: 'syltherine.png' },
  { name: 'Grifo TV Stand', image: 'grifo.png' },
  { name: 'Leviosa Loveseat', image: 'leviosa.png' },
  { name: 'Lolito Ottoman', image: 'lolito.png' },
  { name: 'Muggo Bookshelf', image: 'muggo.png' },
  { name: 'Pingky Sofa', image: 'pingky.jpg' },
  { name: 'Potty Armchair', image: 'potty.jpg' },
  { name: 'Respira Coffee Table', image: 'respira.jpg' },
  { name: 'Syltherine Loveseat', image: 'syltherine.png' },
  { name: 'Grifo Ottoman', image: 'grifo.png' },
];

const bedroomProducts = [
  { name: 'Grifo Bed Frame', image: 'grifo.png' },
  { name: 'Leviosa Wardrobe', image: 'leviosa.png' },
  { name: 'Lolito Nightstand', image: 'lolito.png' },
  { name: 'Muggo Dresser', image: 'muggo.png' },
  { name: 'Pingky Bed Frame', image: 'pingky.jpg' },
  { name: 'Potty Wardrobe', image: 'potty.jpg' },
  { name: 'Respira Nightstand', image: 'respira.jpg' },
  { name: 'Syltherine Dresser', image: 'syltherine.png' },
  { name: 'Grifo Wardrobe', image: 'grifo.png' },
  { name: 'Leviosa Nightstand', image: 'leviosa.png' },
  { name: 'Lolito Dresser', image: 'lolito.png' },
  { name: 'Muggo Bed Frame', image: 'muggo.png' },
  { name: 'Pingky Wardrobe', image: 'pingky.jpg' },
  { name: 'Potty Nightstand', image: 'potty.jpg' },
  { name: 'Respira Dresser', image: 'respira.jpg' },
  { name: 'Syltherine Bed Frame', image: 'syltherine.png' },
  { name: 'Grifo Dresser', image: 'grifo.png' },
  { name: 'Leviosa Bed Frame', image: 'leviosa.png' },
  { name: 'Lolito Wardrobe', image: 'lolito.png' },
  { name: 'Muggo Nightstand', image: 'muggo.png' },
  { name: 'Pingky Dresser', image: 'pingky.jpg' },
  { name: 'Potty Bed Frame', image: 'potty.jpg' },
  { name: 'Respira Wardrobe', image: 'respira.jpg' },
  { name: 'Syltherine Nightstand', image: 'syltherine.png' },
  { name: 'Grifo Nightstand', image: 'grifo.png' },
  { name: 'Leviosa Dresser', image: 'leviosa.png' },
  { name: 'Lolito Bed Frame', image: 'lolito.png' },
  { name: 'Muggo Wardrobe', image: 'muggo.png' },
  { name: 'Pingky Nightstand', image: 'pingky.jpg' },
  { name: 'Potty Dresser', image: 'potty.jpg' },
  { name: 'Respira Bed Frame', image: 'respira.jpg' },
  { name: 'Syltherine Wardrobe', image: 'syltherine.png' },
  { name: 'Grifo Bunk Bed', image: 'grifo.png' },
];

// Pool of every local image filename in use across the seed, used to fill
// out each product's `images` array with photos "borrowed" from others.
const allImagePool = Array.from(
  new Set([
    ...jsonProducts.map((p) => p.image),
    ...diningProducts.map((p) => p.image),
    ...livingProducts.map((p) => p.image),
    ...bedroomProducts.map((p) => p.image),
  ]),
);

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDate(maxDaysAgo: number) {
  const date = new Date();
  date.setDate(date.getDate() - randomBetween(0, maxDaysAgo));
  return date.toISOString().split('T')[0];
}

function generateSku(prefix: string, index: number) {
  return `${prefix}${String(index).padStart(5, '0')}`;
}

async function seed() {
  await dataSource.initialize();

  const categoryRepo = dataSource.getRepository(Category);
  const productRepo = dataSource.getRepository(Product);
  const attributeRepo = dataSource.getRepository(ProductAttribute);
  const variantRepo = dataSource.getRepository(ProductVariant);

  async function findOrCreateCategory(name: string) {
    const existingCategory = await categoryRepo.findOneBy({ name });
    if (existingCategory) {
      return existingCategory;
    }

    const category = categoryRepo.create({ name });
    return categoryRepo.save(category);
  }

  async function findOrCreateProduct(productData: Partial<Product>) {
    const existingProduct = await productRepo.findOneBy({
      sku: productData.sku!,
    });
    if (existingProduct) {
      return existingProduct;
    }

    const product = productRepo.create(productData);
    return productRepo.save(product);
  }

  async function findOrCreateProductAttribute(
    product: Product,
    warranty: { warrantyQuantity: number; warrantyUnit: WarrantyUnit },
  ) {
    const existingAttribute = await attributeRepo.findOneBy({
      productId: product.id,
    });
    if (existingAttribute) {
      return existingAttribute;
    }

    const attribute = attributeRepo.create({
      productId: product.id,
      warrantyQuantity: warranty.warrantyQuantity,
      warrantyUnit: warranty.warrantyUnit,
    });

    return attributeRepo.save(attribute);
  }

  async function findOrCreateProductVariants(
    product: Product,
    variants: Array<{ color: string; size: string; price: number }>,
  ) {
    const existingVariants = await variantRepo.findBy({
      productId: product.id,
    });
    if (existingVariants.length > 0) {
      return existingVariants;
    }

    const createdVariants = variants.map((variant) =>
      variantRepo.create({
        productId: product.id,
        color: variant.color,
        size: variant.size,
        price: variant.price,
      }),
    );

    return variantRepo.save(createdVariants);
  }

  // Categories
  const dining = await findOrCreateCategory('Dining');
  const living = await findOrCreateCategory('Living');
  const bedroom = await findOrCreateCategory('Bedroom');
  const sofas = await findOrCreateCategory('Sofas');

  const categoriesByName: Record<JsonSeedProduct['categoryName'], Category> = {
    Dining: dining,
    Living: living,
    Bedroom: bedroom,
    Sofas: sofas,
  };

  // Seed the curated products from db.json first, so they're the first
  // products created in the database.
  for (const item of jsonProducts) {
    const category = categoriesByName[item.categoryName];

    const productData: Partial<Product> = {
      sku: item.sku,
      name: item.name,
      description: item.description,
      fullDescription: item.fullDescription,
      additionalInformation: item.additionalInformation,
      image: item.image,
      images: buildImageArray(allImagePool, item.image),
      price: item.price,
      discount: item.discount,
      postedAt: item.postedAt,
      categoryId: category.id,
      category,
    };

    const savedProduct = await findOrCreateProduct(productData);

    await findOrCreateProductAttribute(savedProduct, item.warranty);

    const variantInputs = item.variants.map((variant) => ({
      color: variant.color,
      size: variant.size,
      price: computeVariantPrice(item.price, variant.color, variant.size),
    }));

    await findOrCreateProductVariants(savedProduct, variantInputs);
  }

  const allProducts: {
    items: typeof diningProducts;
    category: Category;
    prefix: string;
  }[] = [
    { items: diningProducts, category: dining, prefix: 'DI' },
    { items: livingProducts, category: living, prefix: 'LI' },
    { items: bedroomProducts, category: bedroom, prefix: 'BE' },
  ];

  let productIndex = 0;
  const noVariantIndexes = new Set<number>();
  while (noVariantIndexes.size < 10) {
    noVariantIndexes.add(randomBetween(0, 99));
  }

  for (const { items, category, prefix } of allProducts) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const hasDiscount = productIndex % 3 === 0;
      const warranty = warranties[productIndex % warranties.length];
      const price = randomBetween(800, 17000);

      const productData: Partial<Product> = {
        sku: generateSku(prefix, i + 1),
        name: item.name,
        description: `${item.name} — elegant and modern design.`,
        fullDescription: `The ${item.name} is crafted with premium materials, offering durability and style. Perfect for contemporary and classic interiors alike.`,
        additionalInformation: `Material: Wood and fabric. Assembly required. Dimensions vary by size.`,
        image: item.image,
        images: buildImageArray(allImagePool, item.image),
        price,
        discount: hasDiscount
          ? discounts[productIndex % discounts.length]
          : null,
        postedAt: generateDate(365),
        categoryId: category.id,
        category,
      };

      const savedProduct = await findOrCreateProduct(productData);

      await findOrCreateProductAttribute(savedProduct, warranty);

      if (!noVariantIndexes.has(productIndex)) {
        const numVariants = randomBetween(2, 4);
        const usedCombos = new Set<string>();
        const variantInputs: Array<{
          color: string;
          size: string;
          price: number;
        }> = [];

        for (let v = 0; v < numVariants; v++) {
          let color: string, size: string, combo: string;
          do {
            color = colors[randomBetween(0, colors.length - 1)];
            size = sizes[randomBetween(0, sizes.length - 1)];
            combo = `${color}-${size}`;
          } while (usedCombos.has(combo));
          usedCombos.add(combo);

          variantInputs.push({
            color,
            size,
            price: computeVariantPrice(price, color, size),
          });
        }

        await findOrCreateProductVariants(savedProduct, variantInputs);
      }

      productIndex++;
    }
  }

  console.log('Seed completed successfully!');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
