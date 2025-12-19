import type { Category, EducationListItem, MediaFile, User, MediaFileTypes } from '@db/schema';

type StandardEducationRow = {
  id: number;
  name: string;
  description: string;
  category: Category;
  coverImage: MediaFile | null;
  educationMaterial: {
    id: number;
    name: string;
    description: string;
    contentType: MediaFileTypes;
    createdAt: Date;
    updatedAt: Date;
  };
  educationMaterialContentFile: MediaFile;
  educationMaterialCreatedBy: User;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
};

type AssignmentEducationRow = {
  education: {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
  category: Category;
  coverImage: MediaFile | null;
  educationMaterial: {
    id: number;
    name: string;
    description: string;
    contentType: MediaFileTypes;
    createdAt: Date;
    updatedAt: Date;
  };
  educationMaterialContentFile: MediaFile;
  educationMaterialCreatedBy: User;
  educationCreatedBy: User;
};

interface Props extends StandardEducationRow {
  isFavorite: boolean;
}

/**
 * Maps a standard education row (from get-education-list or get-users-education) to EducationListItem
 */
export function mapStandardRowToEducationListItem(row: Props): EducationListItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    coverImage: row.coverImage ?? null,
    educationMaterial: {
      id: row.educationMaterial.id,
      name: row.educationMaterial.name,
      description: row.educationMaterial.description,
      contentType: row.educationMaterial.contentType,
      contentFile: row.educationMaterialContentFile,
      createdBy: row.educationMaterialCreatedBy,
      createdAt: row.educationMaterial.createdAt,
      updatedAt: row.educationMaterial.updatedAt,
    },
    createdBy: row.createdBy,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    isFavorite: row.isFavorite,
  };
}

/**
 * Maps an assignment education row (from get-assigment-list) to EducationListItem
 */
export function mapAssignmentRowToEducationListItem(row: AssignmentEducationRow, isFavorite: boolean): EducationListItem {
  return {
    id: row.education.id,
    name: row.education.name,
    description: row.education.description,
    category: row.category,
    coverImage: row.coverImage ?? null,
    educationMaterial: {
      id: row.educationMaterial.id,
      name: row.educationMaterial.name,
      description: row.educationMaterial.description,
      contentType: row.educationMaterial.contentType,
      contentFile: row.educationMaterialContentFile,
      createdBy: row.educationMaterialCreatedBy,
      createdAt: row.educationMaterial.createdAt,
      updatedAt: row.educationMaterial.updatedAt,
    },
    createdBy: row.educationCreatedBy,
    createdAt: row.education.createdAt,
    updatedAt: row.education.updatedAt,
    isFavorite,
  };
}
