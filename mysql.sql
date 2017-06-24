-- Clear
DROP DATABASE IF EXISTS test_oauth2;
CREATE DATABASE test_oauth2;
USE test_oauth2;

-- Table
CREATE TABLE user(
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,

    --
    PRIMARY KEY (`id`),
    INDEX `index_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE app(
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    redirect_uri VARCHAR(64),

    --
    PRIMARY KEY (`id`),
    INDEX `index_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE code(
    id BIGINT AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    app_id BIGINT NOT NULL,

    code CHAR(36) NOT NULL,

    -- 
    PRIMARY KEY (`id`),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (app_id) REFERENCES app(id),
    UNIQUE KEY `compositeIndex` (`user_id`, `app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE token(
    id BIGINT AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    app_id BIGINT NOT NULL,

    oid CHAR(36) NOT NULL,
    access_token CHAR(36) NOT NULL,
    refresh_token CHAR(36) NOT NULL,

    --
    PRIMARY KEY (`id`),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (app_id) REFERENCES app(id),
    UNIQUE KEY `compositeIndex` (`user_id`, `app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Initial Data
INSERT INTO app values(
    1, 
    'oauth2',
    NULL
);

-- Test Data
INSERT INTO user values(
    1,
    'test', 
    'e10adc3949ba59abbe56e057f20f883e'      -- 123456
);

INSERT INTO app values(
    2, 
    'contactsync',
    'http://contactsync.walfud.com/cb'
);

INSERT INTO code values(
    1,
    1,                                      -- test
    2,                                      -- contactsync

    '2b4db34a-7f7d-47cc-b349-cffbb3c192a9'
);

INSERT INTO token values(
    1,
    1,                                      -- test
    1,                                      -- oauth2

    '469bd0c7-5d7e-45fd-9e46-5b09612a5193',
    'f1cbd734-854a-c36f-091c-7559665151aa',
    '954bd0c6-a37e-90fd-1246-4252612a0987'
);