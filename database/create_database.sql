-- DATABASE categories --
CREATE DATABASE IF NOT EXISTS coopang_ai_search_engine;
USE coopang_ai_search_engine;

-- TABLE products --
CREATE TABLE IF NOT EXISTS products(
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    price INT UNSIGNED NOT NULL,
    category VARCHAR(63) NOT NULL,
    reviews_count INT UNSIGNED NOT NULL DEFAULT 0,
    rating DECIMAL(2, 1) NOT NULL DEFAULT 0,
    image_url VARCHAR(255) NOT NULL
);
-- TABLE prompts --
CREATE TABLE IF NOT EXISTS prompts(
    prompt_id INT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(255) NOT NULL,
    type VARCHAR(63) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

-- TABLE RELATION products_prompts --
CREATE TABLE IF NOT EXISTS products_prompts(
    product_id INT,
    prompt_id INT,
    CONSTRAINT fk_products_prompts_products FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    CONSTRAINT fk_products_prompts_prompts FOREIGN KEY (prompt_id) REFERENCES prompts(prompt_id) ON DELETE CASCADE
);
