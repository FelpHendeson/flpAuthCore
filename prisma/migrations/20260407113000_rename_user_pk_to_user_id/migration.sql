-- AlterTable
ALTER TABLE `users`
    DROP PRIMARY KEY,
    CHANGE COLUMN `id` `user_id` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`user_id`);
