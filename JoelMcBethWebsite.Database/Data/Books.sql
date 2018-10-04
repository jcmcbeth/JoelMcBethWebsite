SET IDENTITY_INSERT [Books] ON;

MERGE INTO [Books] AS [Target]
USING (VALUES
	(1, '9781459617872', 'The Expectant Father: The Ultimate Guide for Dads-to-Be', NULL, NULL, NULL, NULL),
	(2, NULL, 'Be Prepared', NULL, NULL, NULL, NULL),
	(3, NULL, 'Data Science From Scratch', NULL, NULL, NULL, NULL),
	(4, NULL, 'Clean Code - A Handbook of Agile Software Craftsmanship', NULL, NULL, NULL, NULL),
	(5, NULL, 'American Sign Language Dictionary', NULL, NULL, NULL, NULL),
	(6, NULL, 'Modern Cryptography', NULL, NULL, NULL, NULL),
	(7, NULL, 'The Pragmatic Programmer', NULL, NULL, NULL, NULL),
	(8, NULL, 'Building Wireless Sensor Networks', NULL, NULL, NULL, NULL),
	(9, NULL, 'Pandemic', NULL, NULL, NULL, NULL),
	(10, NULL, 'Assembly Language Step by Step - Programming with Linux', NULL, NULL, NULL, NULL),
	(11, NULL, '127 Hours - Between a Rock and a Hard Place', NULL, NULL, NULL, NULL),
	(12, NULL, 'The Art of Computer Programming - Fundamental Algorithms - Volume 1', NULL, NULL, NULL, NULL),
	(13, NULL, 'Brownfield Application Development in .NET', NULL, NULL, NULL, NULL),
	(14, NULL, 'Prime Obsession', NULL, NULL, NULL, NULL),
	(15, NULL, 'Make: Electronics', NULL, NULL, NULL, NULL),
	(16, NULL, 'Working Effectively with Legacy Code', NULL, NULL, NULL, NULL),
	(17, NULL, 'Dependency Injection in .NET', NULL, NULL, NULL, NULL),
	(18, NULL, 'The Art of Unit Testing', NULL, NULL, NULL, NULL),
	(19, NULL, 'Practical Guidelines and Best Practices for Visual Basic and Visual C# Developers', NULL, NULL, NULL, NULL),
	(20, NULL, 'Windows Powershell in Action', NULL, NULL, NULL, NULL),
	(21, NULL, 'Continuous Integration in .NET', NULL, NULL, NULL, NULL),
	(22, NULL, 'Inside the Microsoft Build Engine: Using MSBuild and Team Foundation Build', NULL, NULL, NULL, NULL),
	(23, NULL, 'WiX: A DeveloperNULLs Guide to Windows Installer XML', NULL, NULL, NULL, NULL),
	(24, NULL, 'The Preemie Primer: A Complete Guide for Parents of Premature Babies--from Birth through the Toddler Years and Beyond', NULL, NULL, NULL, NULL),
	(25, NULL, 'On Becoming Baby Wise: Giving Your Infant the Gift of Nighttime Sleep', NULL, NULL, NULL, NULL),
	(26, NULL, 'How to Win Friends & Influence People', NULL, NULL, NULL, NULL),
	(27, NULL, 'Coyote Peterson’s Brave Adventures: Wild Animals in a Wild World', NULL, NULL, NULL, NULL),
	(28, '9781617292392', 'Soft Skills: The software developerNULLs life manual', NULL, NULL, NULL, NULL)
) AS [Source] ([Id], [Isbn13], [Title], [Edition], [Pages], [Rating], [Order])
ON
	([Target].[Id] = [Source].[Id])
WHEN MATCHED THEN
	UPDATE SET
		[Isbn13] = [Source].[Isbn13],
		[Title] = [Source].[Title],
		[Edition] = [Source].[Edition],
		[Pages] = [Source].[Pages],
		[Rating] = [Source].[Rating],
		[Order] = [Source].[Order]
WHEN NOT MATCHED BY TARGET THEN
	INSERT ([Id], [Isbn13], [Title], [Edition], [Pages], [Rating], [Order])
	VALUES (
		[Source].[Id],
		[Source].[Isbn13],
		[Source].[Title], 
		[Source].[Edition],
		[Source].[Pages],
		[Source].[Rating],
		[Source].[Order]
	)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;

SET IDENTITY_INSERT [Books] OFF;