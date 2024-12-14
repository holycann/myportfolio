CREATE TABLE IF NOT EXISTS products(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `desc` TEXT,
    `thumbnail_id` INT UNSIGNED,
    `category_id` INT UNSIGNED NOT NULL,
    `price` INT(15) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_products_thumbnail` FOREIGN KEY (`thumbnail_id`) REFERENCES `thumbnail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)