
export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  disabled: boolean;
  createdBy: string;
}

export interface ReleaseDto {
  id: number;
  code: string;
  description: string;
  status: string;
  releasedAt: Date;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}

export interface FeatureDto {
  id: number;
  code: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}

export interface CreateReleasePayload {
  productCode: string;
  code: string;
  description: string;
}

export interface CreateFeaturePayload {
  productCode: string;
  code: string;
  title: string;
  description: string;
  assignedTo: string;
  releaseCode: string;
}
