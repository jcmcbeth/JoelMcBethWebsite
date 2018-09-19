MERGE INTO [Media] AS [Target]
USING (VALUES
	(1, 'District 9', 'Movie', 'DVD', NULL)
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
	INSERT ([Id], [FirstName], [LastName], [MiddleName])
	VALUES (
		[Source].[Id],
		[Source].[Title],
		[Source].[MediaType], 
		[Source].[Medium],
		[Source].[Year]
	)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;