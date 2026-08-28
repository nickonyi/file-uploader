-- File Uploader Database Initialization
-- =====================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- =====================================================
-- Drop Existing Objects
-- =====================================================
DROP TABLE IF EXISTS shares CASCADE;
DROP TABLE IF EXISTS files CASCADE;
DROP TABLE IF EXISTS folders CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- =========================================
-- USERS
-- =========================================

CREATE TABLE USERS (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR (255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================
-- FOLDERS
-- =========================================
CREATE TABLE FOLDERS (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL,
     parent_id UUID NOT NULL,
     name VARCHAR(255) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

      CONSTRAINT  fk_folder_user
      FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

      CONSTRAINT fk_folder_parent
      FOREIGN KEY (parent_id)
      REFERENCES folders(id)
      ON DELETE CASCADE

);

-- =========================================
-- FILES
-- =========================================

CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,
    folder_id UUID,

    name VARCHAR(255) NOT NULL,
    storage_key TEXT NOT NULL UNIQUE,
    mime_type VARCHAR(255),
    size BIGINT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_file_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_file_folder
        FOREIGN KEY (folder_id)
        REFERENCES folders(id)
        ON DELETE SET NULL,

    CONSTRAINT files_size_positive
        CHECK (size >= 0)
);


-- =========================================
-- SHARES
-- =========================================

CREATE TABLE shares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    file_id UUID NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_share_file
        FOREIGN KEY (file_id)
        REFERENCES files(id)
        ON DELETE CASCADE
);

-- =========================================
-- INDEXES
-- =========================================

CREATE INDEX idx_files_user_id
    ON files(user_id);

CREATE INDEX idx_files_folder_id
    ON files(folder_id);

CREATE INDEX idx_folders_user_id
    ON folders(user_id);

CREATE INDEX idx_folders_parent_id
    ON folders(parent_id);

CREATE INDEX idx_shares_file_id
    ON shares(file_id);
