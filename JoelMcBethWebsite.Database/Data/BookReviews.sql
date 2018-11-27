SET IDENTITY_INSERT [BookReviews] ON;

MERGE INTO [BookReviews] AS [Target]
USING (VALUES
	(4, 5, 1, NULL, 4),
	(16, 5, 1, NULL, 16),
	(31, 4, 1, NULL, 31)
) AS [Source] ([Id], [Rating], [IsRecommended], [Comments], [BookId])
ON
	([Target].[Id] = [Source].[Id])
WHEN MATCHED THEN
	UPDATE SET
		[Rating] = [Source].[Rating],
		[IsRecommended] = [Source].[IsRecommended],
		[Comments] = [Source].[Comments],
		[BookId] = [Source].[BookId]
WHEN NOT MATCHED BY TARGET THEN
	INSERT ([Id], [Rating], [IsRecommended], [Comments], [BookId])
	VALUES (
		[Source].[Id],
		[Source].[Rating],
		[Source].[IsRecommended], 
		[Source].[Comments],
		[Source].[BookId]
	)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;

SET IDENTITY_INSERT [BookReviews] OFF;