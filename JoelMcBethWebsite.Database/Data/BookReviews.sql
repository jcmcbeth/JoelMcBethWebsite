SET IDENTITY_INSERT [BookReviews] ON;

MERGE INTO [BookReviews] AS [Target]
USING (VALUES
	(4, 5, 1, NULL, 4),
	(16, 5, 1, NULL, 16),
	(31, 4, 1, NULL, 31),
	(32, 3, 0, 'The book is a collection of interesting anecdotes that explain how habits work and how they are formed. I felt the anecdotes were too long for the point they were trying to make. The main thing I wanted to get out of this book was how to create good habits and get rid of bad habits. This seemed to be the topic that was covered in the least amount of detail while most of the book was just anecdotes. I wouldn''t recommend this book if you were looking for practical information and guidance.', 31)
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