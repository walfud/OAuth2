-- Clear
DROP DATABASE IF EXISTS TestOauth2;
CREATE DATABASE TestOauth2;
USE TestOauth2;

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

-- Test Data
INSERT INTO Users values(
    1,
    'test', 
    'e10adc3949ba59abbe56e057f20f883e'      -- 123456
);

INSERT INTO Apps values(
    2, 
    'contactsync',
    'http://contactsync.walfud.com/cb'
);

INSERT INTO Codes values(
    1,
    1,                                      -- test
    2,                                      -- contactsync

    '2b4db34a-7f7d-47cc-b349-cffbb3c192a9'
);

INSERT INTO Tokens values(
    1,
    1,                                      -- test
    1,                                      -- oauth2

    '469bd0c7-5d7e-45fd-9e46-5b09612a5193',
    'f1cbd734-854a-c36f-091c-7559665151aa',
    '954bd0c6-a37e-90fd-1246-4252612a0987'
);
INSERT INTO Tokens values(
    1,
    1,                                      -- test
    2,                                      -- contactsync

    '826658b4-9d7f-4eef-b083-923ab745b3ff',
    '48d61801-8f27-496f-b25d-955f9b4d4af9',
    '7971b59f-4bcf-431b-815a-2cf1b668a242'
);