CREATE TABLE IF NOT EXISTS project (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `desc` TEXT,
    `client_id` INT UNSIGNED NOT NULL,
    `team_id` INT UNSIGNED NOT NULL,
    `gallery_id` INT UNSIGNED,
    `thumbnail_id` INT UNSIGNED,
    `service_id` INT UNSIGNED NOT NULL,
    `product_id` INT UNSIGNED NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `status` ENUM(
        'UPCOMING',
        'ONGOING',
        'COMPLETED'
    ) DEFAULT 'UPCOMING',
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_project_client` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_project_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_project_gallery` FOREIGN KEY (`gallery_id`) REFERENCES `gallery` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fl_project_thumbnail` FOREIGN KEY (`thumbnail_id`) REFERENCES `thumbnail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_project_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_project_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)