SET IDENTITY_INSERT [BookReviews] ON;

MERGE INTO [BookReviews] AS [Target]
USING (VALUES
	(4, 5, 1, NULL, 4),
	(16, 5, 1, NULL, 16),
	(26, 5, 1, null, 26),
	(31, 4, 0, 'I think this book is over-hyped. I''ve heard very strong accolades for this book and how important it is to the sci-fi genre – or at least the series. It focuses a lot on the story and is obviously set in a sci-fi universe. I just feel unsatisfied with the science fiction part. I just feel like it doesn’t go into much detail about the technology. It may be because it is hard to set the stage for an entire sci-fi universe in a single book or that is a book and not visual. If I wanted to imagine this universe to make a game or even pretend I was there, I wouldn''t even know where to begin.', 31),
	(32, 3, 0, 'The book is a collection of interesting anecdotes that explain how habits work and how they are formed. I felt the anecdotes were too long for the point they were trying to make. The main thing I wanted to get out of this book was how to create good habits and get rid of bad habits. This seemed to be the topic that was covered in the least amount of detail while most of the book was just anecdotes. I wouldn''t recommend this book if you were looking for practical information and guidance.', 31),
	(33, 5, 1, NULL, 33)	
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