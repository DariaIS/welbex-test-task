CREATE TABLE comp(
    id SERIAL PRIMARY KEY,
    date DATE,
    name VARCHAR(50),
    number INT,
    distance VARCHAR(50)
);

INSERT INTO comp (id, date, name, number, distance) VALUES
(1, '2021-12-18', 'aaaaa', 14, '34 км'),
(2, '2021-12-18', 'bbbbbb', 34, '52 км'),
(3, '2021-12-08', 'cccccc', 24, '74 км'),
(4, '2021-12-19', 'dddddd', 64, '62 км'),
(5, '2021-12-19', 'eeeeeeee', 2, '48 км'),
(6, '2021-12-09', 'fffffff', 32, '33 км'),
(7, '2021-12-13', 'gggggggg', 68, '68 км'),
(8, '2022-02-15', 'hhhhhhhhhh', 45, '48 км'),
(9, '2022-02-15', 'iiiiiiiii', 97, '24 км'),
(10, '2022-02-15', 'jjjjjjjj', 43, '96 км'),
(11, '2022-05-17', 'kkkkkkkkk', 24, '47 км'),
(12, '2022-05-18', 'lllllllll', 25, '48 км'),
(13, '2022-05-18', 'mmmmmmmmmmm', 64, '38 км'),
(14, '2022-05-22', 'nnnnnnnnnn', 27, '53 км');