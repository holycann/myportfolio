CREATE TABLE IF NOT EXISTS gallery(
    `id` INT UNSIGNED AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `desc` TEXT,
    `picture_id` INT UNSIGNED,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_gallery_picture` FOREIGN KEY (`picture_id`) REFERENCES `picture` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)