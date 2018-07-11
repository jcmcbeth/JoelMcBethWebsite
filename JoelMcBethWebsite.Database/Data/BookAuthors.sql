MERGE INTO [BookAuthors] AS [Target]
USING (VALUES
	(1, 1)
) AS [Source] ([BookId], [AuthorId])
ON
	([Target].[BookId] = [Source].[BookId] AND [Target].[AuthorId] = [Source].[AuthorId])
WHEN NOT MATCHED BY TARGET THEN
	INSERT ([BookId], [AuthorId])
	VALUES (
		[Source].[BookId],
		[Source].[AuthorId]
	)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;