SET IDENTITY_INSERT [Media] ON;

MERGE INTO [Media] AS [Target]
USING (VALUES
	(1, 'District 9', 1, 1, NULL),
	(2, 'It', 1, 1, NULL),
	(3, 'The Shining', 1, 1, NULL),
	(4, '21 & Over', 1, 1, NULL),
	(5, 'The World''s End', 1, 1, NULL),
	(6, 'Just Friends', 1, 1, NULL),
	(7, '28 Days Later', 1, 1, NULL),
	(8, 'Ghostbusters', 1, 1, NULL),
	(9, 'Ghostbusters 2', 1, 1, NULL),
	(10, 'Buffy The Vampire Slayer', 1, 1, NULL),
	(11, 'Saw VI', 1, 1, NULL),
	(12, 'Saw: The Final Chapter', 1, 1, NULL)
) AS [Source] ([Id], [Title], [MediaType], [Medium], [Year])
ON
	([Target].[Id] = [Source].[Id])
WHEN MATCHED THEN
	UPDATE SET
		[Title] = [Source].[Title],
		[MediaType] = [Source].[MediaType],
		[Medium] = [Source].[Medium],
		[Year] = [Source].[Year]
WHEN NOT MATCHED BY TARGET THEN
	INSERT ([Id], [Title], [MediaType], [Medium], [Year])
	VALUES (
		[Source].[Id],
		[Source].[Title],
		[Source].[MediaType], 
		[Source].[Medium],
		[Source].[Year]
	)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;

SET IDENTITY_INSERT [Media] OFF;