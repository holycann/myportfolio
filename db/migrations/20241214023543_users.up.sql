CREATE TABLE IF NOT EXISTS users (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(50) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `gender` ENUM('M', 'F', 'O'),
    `bio` TEXT,
    `role_id` INT UNSIGNED NOT NULL,
    `picture_id` INT UNSIGNED,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY (`username`),
    UNIQUE KEY (`email`),
    UNIQUE KEY (`phone`),
    CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_users_picture` FOREIGN KEY (`picture_id`) REFERENCES `picture` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)