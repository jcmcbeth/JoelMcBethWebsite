SET IDENTITY_INSERT [Books] ON;

MERGE INTO [Books] AS [Target]
USING (VALUES
	(1, '9781459617872', 'The Expectant Father: The Ultimate Guide for Dads-to-Be', NULL, 301, NULL),
	(2, '9780743251549', 'Be Prepared', NULL, NULL, NULL),
	(3, '9781491901427', 'Data Science From Scratch', NULL, NULL, NULL),
	(4, '9780132350884', 'Clean Code - A Handbook of Agile Software Craftsmanship', NULL, 315, NULL),
	(5, '9780062736345', 'American Sign Language Dictionary', NULL, NULL, NULL),
	(6, '9780132887410', 'Modern Cryptography', NULL, 672, NULL),
	(7, '9780201616224', 'The Pragmatic Programmer: From Journeyman to Master', NULL, 259, NULL),
	(8, '9781784395582', 'Building Wireless Sensor Networks', NULL, 259, NULL),
	(9, '9780765359940', 'Pandemic', NULL, 407, NULL),
	(10, '9780470497029', 'Assembly Language Step by Step - Programming with Linux', '3rd', 506, NULL),
	(11, '9781451617702', '127 Hours - Between a Rock and a Hard Place', NULL, 406, NULL),
	(12, '9780201038019', 'The Art of Computer Programming - Fundamental Algorithms - Volume 1', NULL, 463, NULL),
	(13, '9781933988719', 'Brownfield Application Development in .NET', NULL, 366, NULL),
	(14, '9780452285255', 'Prime Obsession', NULL, 364, NULL),
	(15, '9780596153748', 'Make: Electronics', '1st', 317, NULL),
	(16, '9780131177055', 'Working Effectively with Legacy Code', NULL, 464, NULL),					
	(17, '9781935182504', 'Dependency Injection in .NET', '1st', 584, NULL),
	(18, '9781933988276', 'The Art of Unit Testing: with Examples in .NET', '1st', NULL, NULL),
	(19, '9780735621725', 'Practical Guidelines and Best Practices for Visual Basic and Visual C# Developers', NULL, 608, NULL),
	(20, '9781935182139', 'Windows Powershell in Action', '2nd', 1016, NULL),				
	(21, '9781935182559', 'Continuous Integration in .NET', NULL, 375, NULL),
	(22, '9780735645240', 'Inside the Microsoft Build Engine: Using MSBuild and Team Foundation Build', '2nd', 616, NULL),
	(23, '9781849513722', 'WiX: A Developer''s Guide to Windows Installer XML', '1st', 348, NULL),
	(24, '9780738213934', 'The Preemie Primer: A Complete Guide for Parents of Premature Babies--from Birth through the Toddler Years and Beyond', NULL, 352, NULL),
	(25, '9781932740134', 'On Becoming Baby Wise: Giving Your Infant the Gift of Nighttime Sleep', NULL, 279, NULL),
	(26, '9780671027032', 'How to Win Friends & Influence People', NULL, 288, NULL),
	(27, '9781633535770', 'Coyote Peterson''s Brave Adventures: Wild Animals in a Wild World', NULL, 192, NULL),
	(28, '9781617292392', 'Soft Skills: The software developer''s life manual', NULL, 504, NULL),
	(29, '9780672326967', 'C Primer Plus', '5th', 984, NULL),
	(30, '9780137081073', 'The Clean Coder: A Code of Conduct for Professional Programmers', NULL, 256, NULL),
	(31, '9780553293357', 'Foundation', NULL, 296, NULL),
	(32, '9780812981605', 'The Power of Habit: Why We Do What We Do in Life and Business', NULL, 416, NULL),
	(33, '9780553382587', 'Foundation and Empire', NULL, 272, NULL)
) AS [Source] ([Id], [Isbn13], [Title], [Edition], [Pages], [Order])
ON
	([Target].[Id] = [Source].[Id])
WHEN MATCHED THEN
	UPDATE SET
		[Isbn13] = [Source].[Isbn13],
		[Title] = [Source].[Title],
		[Edition] = [Source].[Edition],
		[Pages] = [Source].[Pages],
		[Order] = [Source].[Order]
WHEN NOT MATCHED BY TARGET THEN
	INSERT ([Id], [Isbn13], [Title], [Edition], [Pages], [Order])
	VALUES (
		[Source].[Id],
		[Source].[Isbn13],
		[Source].[Title], 
		[Source].[Edition],
		[Source].[Pages],
		[Source].[Order]
	)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;

SET IDENTITY_INSERT [Books] OFF;