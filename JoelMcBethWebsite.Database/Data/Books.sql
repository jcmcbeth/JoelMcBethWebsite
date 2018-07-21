SET IDENTITY_INSERT [Books] ON;

MERGE INTO [Books] AS [Target]
USING (VALUES
	(1, '9781617292392', 'Soft Skills: The software developer''s life manual', NULL, NULL)
) AS [Source] ([Id], [Isbn13], [Title], [Edition], [Pages])
ON
	([Target].[Id] = [Source].[Id])
WHEN MATCHED THEN
	UPDATE SET
		[Isbn13] = [Source].[Isbn13],
		[Title] = [Source].[Title],
		[Edition] = [Source].[Edition],
		[Pages] = [Source].[Pages]
WHEN NOT MATCHED BY TARGET THEN
	INSERT ([Id], [Isbn13], [Title], [Edition], [Pages])
	VALUES (
		[Source].[Id],
		[Source].[Isbn13],
		[Source].[Title], 
		[Source].[Edition],
		[Source].[Pages]
	)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;

SET IDENTITY_INSERT [Books] OFF;