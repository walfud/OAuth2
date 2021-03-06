-- Clear
DROP DATABASE IF EXISTS OAuth2;
CREATE DATABASE OAuth2;
USE OAuth2;

-- Table
CREATE TABLE Users(
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,

    --
    PRIMARY KEY (`id`),
    INDEX `indexName` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Apps(
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    redirectUri VARCHAR(64),

    --
    PRIMARY KEY (`id`),
    INDEX `indexName` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Codes(
    id BIGINT AUTO_INCREMENT,
    userId BIGINT NOT NULL,
    appId BIGINT NOT NULL,

    code CHAR(36) NOT NULL,

    -- 
    PRIMARY KEY (`id`),
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (appId) REFERENCES Apps(id),
    UNIQUE KEY `indexUserIdAppId` (`userId`, `appId`),
    INDEX `indexCode` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Tokens(
    id BIGINT AUTO_INCREMENT,
    userId BIGINT NOT NULL,
    appId BIGINT NOT NULL,

    oid CHAR(36) NOT NULL,
    accessToken CHAR(36) NOT NULL,
    refreshToken CHAR(36) NOT NULL,

    --
    PRIMARY KEY (`id`),
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (appId) REFERENCES Apps(id),
    UNIQUE KEY `indexUserIdAppId` (`userId`, `appId`),
    INDEX `indexAccessToken` (`accessToken`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Initial Data
INSERT INTO Apps values(
    1, 
    'oauth2',
    NULL
);