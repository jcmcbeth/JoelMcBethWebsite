SET IDENTITY_INSERT [Media] ON;

MERGE INTO [Media] AS [Target]
USING (VALUES
	(1, 'District 9', 1, 1, NULL)
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