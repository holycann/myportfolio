CREATE TABLE IF NOT EXISTS category (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `desc` TEXT,
    `type` ENUM('Personal', 'Business') DEFAULT 'Personal',
    PRIMARY KEY (`id`)
)