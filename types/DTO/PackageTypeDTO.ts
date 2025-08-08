export type PackageTypeDTO = {
  id: number;
  name: string;
  description: string;
  price: number;
  resourceAccessPercentage: number;
  partnerId: number;
  slashedPrice: string;
  discountPercentage: string;
  thumbnailUrl: string;
  features: { featureId: number; id: number; name: string }[];
};
