export type WarrantyUnit = "DAYS" | "MONTHS" | "YEARS";

export type ProductAttributeModel = {
    id: number;
    productId: number;
    warrantyQuantity: number;
    warrantyUnit: WarrantyUnit;
};
