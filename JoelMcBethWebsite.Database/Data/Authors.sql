SET IDENTITY_INSERT [Authors] ON;

MERGE INTO [Authors] AS [Target]
USING (VALUES
	(1, 'John', 'Sonmez', NULL)
) AS [Source] ([Id], [FirstName], [LastName], [MiddleName])
ON
	([Target].[Id] = [Source].[Id])
WHEN MATCHED THEN
	UPDATE SET
		[FirstName] = [Source].[FirstName],
		[LastName] = [Source].[LastName],
		[MiddleName] = [Source].[MiddleName]
WHEN NOT MATCHED BY TARGET THEN
	INSERT ([Id], [FirstName], [LastName], [MiddleName])
	VALUES (
		[Source].[Id],
		[Source].[FirstName],
		[Source].[LastName], 
		[Source].[MiddleName]
	)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;

SET IDENTITY_INSERT [Authors] OFF;