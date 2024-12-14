CREATE TABLE IF NOT EXISTS thumbnail(
    `id` INT UNSIGNED AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `picture_id` INT UNSIGNED,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_thumbnail_picture` FOREIGN KEY (`picture_id`) REFERENCES `picture` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)