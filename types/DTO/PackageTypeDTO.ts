export type Feature = {
  name: string;
  featureId: number;
};

export type PackageTypeDTO = {
  id: number;
  name: string;
  description: string;
  price: number;
  resourceAccessPercentage: number;
  partnerId: number;
  slashedPrice: number;
  discountPercentage: number;
  thumbnailUrl: string | null;
  features: Feature[];
};
