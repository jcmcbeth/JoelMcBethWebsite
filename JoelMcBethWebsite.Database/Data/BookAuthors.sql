MERGE INTO [BookAuthors] AS [Target]
USING (VALUES
	(1, 1),
	(2, 2),
	(3, 3),
	(4, 4),
	(5, 5),
	(6, 6),
	(7, 7),
	(7, 8),
	(8, 9),
	(9, 10),
	(10, 11),
	(11, 12),
	(12, 13),
	(13, 14),
	(13, 15),
	(14, 16),
	(15, 17),
	(16, 18),
	(17, 19),
	(18, 20),
	(19, 21),
    (19, 22),
	(20, 23),
	(21, 24),
	(21, 25),
	(21, 26),
	(22, 27),
	(23, 28),
	(24, 29),
	(25, 30),
	(25, 31),
	(26, 32),
    (27, 33),
	(28, 34),
	(29, 35),
	(30, 4),
	(31, 36),
	(32, 37),
	(33, 36),
	(34, 38)
) AS [Source] ([BookId], [AuthorId])
ON
	([Target].[BookId] = [Source].[BookId] AND [Target].[AuthorId] = [Source].[AuthorId])
WHEN NOT MATCHED BY TARGET THEN
	INSERT ([BookId], [AuthorId])
	VALUES (
		[Source].[BookId],
		[Source].[AuthorId]
	);