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

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ(6) NOT NULL DEFAULT NOW()
);

-- =====================================================
-- FOLDERS
-- =====================================================

CREATE TABLE folders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_folder_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,

    CONSTRAINT folders_user_id_name_key
        UNIQUE (user_id, name)
);

-- =====================================================
-- FILES
-- =====================================================

CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    folder_id UUID,
    name VARCHAR(255) NOT NULL,
    storage_key TEXT NOT NULL UNIQUE,
    mime_type VARCHAR(255),
    size BIGINT NOT NULL,
    created_at TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_file_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,

    CONSTRAINT fk_file_folder
        FOREIGN KEY (folder_id)
        REFERENCES folders(id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,

    CONSTRAINT files_size_positive
        CHECK (size >= 0)
);

-- =====================================================
-- SHARES
-- =====================================================

CREATE TABLE shares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token TEXT NOT NULL UNIQUE,
    folder_id UUID NOT NULL,
    expires_at TIMESTAMPTZ(6) NOT NULL,
    created_at TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),

    CONSTRAINT shares_folder_id_fkey
        FOREIGN KEY (folder_id)
        REFERENCES folders(id)
        ON DELETE CASCADE
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_files_folder_id
    ON files(folder_id);

CREATE INDEX idx_files_user_id
    ON files(user_id);

CREATE INDEX idx_folders_user_id
    ON folders(user_id);

CREATE INDEX shares_folder_id_idx
    ON shares(folder_id);
