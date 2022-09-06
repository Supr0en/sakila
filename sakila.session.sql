-- @BLOCK
    SELECT FL.title, R.rental_date, R.return_date
    FROM film_list FL, inventory I, rental R
    WHERE R.inventory_id = I.inventory_id
-- @BLOCK
    SELECT *
    FROM inventory

-- @BLOCK 
    SELECT F.title, R.rental_date, R.return_date
    FROM film F, rental R, inventory I
    WHERE F.film_id = I.film_id AND I.inventory_id = R.rental_id