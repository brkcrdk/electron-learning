PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`slug` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`parent_id` integer,
	`created_by` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_categories`("id", "name", "slug", "description", "parent_id", "created_by", "created_at", "updated_at") SELECT "id", "name", "slug", "description", "parent_id", "created_by", "created_at", "updated_at" FROM `categories`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
ALTER TABLE `__new_categories` RENAME TO `categories`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_category_parent_id` ON `categories` (`parent_id`);--> statement-breakpoint
CREATE TABLE `__new_education_materials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`content_type` text NOT NULL,
	`content_file_id` integer NOT NULL,
	`created_by` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`content_file_id`) REFERENCES `media_files`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_education_materials`("id", "name", "description", "content_type", "content_file_id", "created_by", "created_at", "updated_at") SELECT "id", "name", "description", "content_type", "content_file_id", "created_by", "created_at", "updated_at" FROM `education_materials`;--> statement-breakpoint
DROP TABLE `education_materials`;--> statement-breakpoint
ALTER TABLE `__new_education_materials` RENAME TO `education_materials`;--> statement-breakpoint
CREATE INDEX `idx_educations_content_file_id` ON `education_materials` (`content_file_id`);--> statement-breakpoint
CREATE INDEX `idx_education_materials_created_by` ON `education_materials` (`created_by`);--> statement-breakpoint
CREATE INDEX `idx_educations_content_type` ON `education_materials` (`content_type`);--> statement-breakpoint
CREATE TABLE `__new_educations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`category_id` integer NOT NULL,
	`cover_image_id` integer,
	`education_materials` integer NOT NULL,
	`created_by` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`cover_image_id`) REFERENCES `media_files`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`education_materials`) REFERENCES `education_materials`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_educations`("id", "name", "description", "category_id", "cover_image_id", "education_materials", "created_by", "created_at", "updated_at") SELECT "id", "name", "description", "category_id", "cover_image_id", "education_materials", "created_by", "created_at", "updated_at" FROM `educations`;--> statement-breakpoint
DROP TABLE `educations`;--> statement-breakpoint
ALTER TABLE `__new_educations` RENAME TO `educations`;--> statement-breakpoint
CREATE INDEX `idx_educations_category_id` ON `educations` (`category_id`);--> statement-breakpoint
CREATE INDEX `idx_educations_cover_image_id` ON `educations` (`cover_image_id`);--> statement-breakpoint
CREATE INDEX `idx_educations_education_material` ON `educations` (`education_materials`);--> statement-breakpoint
CREATE INDEX `idx_educations_created_by` ON `educations` (`created_by`);--> statement-breakpoint
ALTER TABLE `education_assignments` ADD `title` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `education_assignments` ADD `description` text DEFAULT '' NOT NULL;