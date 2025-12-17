CREATE TABLE `user_education_favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`education_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`education_id`) REFERENCES `educations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_user_education_favorites_user_id` ON `user_education_favorites` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_user_education_favorites_education_id` ON `user_education_favorites` (`education_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_user_education_favorite` ON `user_education_favorites` (`user_id`,`education_id`);