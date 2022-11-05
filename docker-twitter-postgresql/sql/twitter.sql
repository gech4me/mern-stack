CREATE TABLE contents (
    id UUID DEFAULT gen_random_uuid (),
    tweet VARCHAR(280) NOT NULL,
    img VARCHAR(500) NOT NULL
);

INSERT INTO contents (tweet, img)
VALUES ('Hello World!', ''),
       ('Content creation and programming are basically full time jobs. I have enough projects and work to keep me busy for years. Working in tech is definitely going to entertain you for a long time which is why so many people want to transition into this field.', ''),
       ('JavaScript developers are forever in high demand', '');
