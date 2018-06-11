using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JoelMcBethWebsite.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JoelMcBethWebsite.Controllers
{
    [Produces("application/json")]
    [Route("api/Books")]
    public class BookController : Controller
    {
        private static Book[] books = new Book[]
        {
            new Book()
            {
                Title = "Pro AngularJS",
                Authors = new List<string>()
                {
                    "Adam Freeman"
                },
                Isbn = "9781430264484"
            },
            new Book()
            {
                Title = "Soft Skills: The software developer's life manual",
                Authors = new List<string>()
                {
                    "John Sonmez"
                },
                Isbn = "9781617292392"
            },
            new Book()
            {
                Title = "Assembly language Step by Step - Programming with Linux",
                Edition = "3rd",
                Authors = new List<string>()
                {
                    "Jeff Duntemann"
                },
                Isbn = "9780470497029"
            },
            new Book()
            {
                Title = "The Expectant Father: The Ultimate Guide for Dads-to-Be",
                Isbn = "9780789212139"
            },
            new Book()
            {
                Title = "Be Prepared",
                Isbn = "9780743251549"
            },
            new Book()
            {
                Title = "Data Science From Scratch",
                Isbn = "9781491901427"
            },
            new Book()
            {
                Title = "Clean Code - A Handbook of Agile Software Craftsmanship",
                Isbn = "9780132350884"
            },
            new Book()
            {
                Title = "American Sign Language Dictionary",
                Isbn = "9780062736345"
            },
            new Book()
            {
                Title = "Modern Cryptography",
                Isbn = "9780132887410"
            },
            new Book()
            {
                Title = "The Pragmatic Programmer",
                Isbn = "9780132119177"
            },
            new Book()
            {
                Title = "Building Wireless Sensor Networks",
                Isbn = "9780596807733"
            },
            new Book()
            {
                Title = "Pandemic",
                Isbn = "9780765350848"
            },
            new Book()
            {
                Title = "The Art of Computer Programming - Fundamental Algorithms - Volume 1",
                Authors = new List<string>()
                {
                    "Donald Knuth"
                },
                Isbn = "9780201896831"
            },
            new Book()
            {
                Title = "Brownfield Application Development in .NET",
                Isbn = "978-1933988719"
            },
            new Book()
            {
                Title = "Prime Obsession"
            },
            new Book()
            {
                Title = "127 Hours - Between a Rock and a Hard Place",
            },
            new Book()
            {
                Title = "Make: Electronics"
            },
            new Book()
            {
                Title = "Working Effectively with Legacy Code"
            },
            new Book()
            {
                Title = "Dependency Injection in .NET"
            },
            new Book()
            {
                Title = "The Art of Unit Testing"
            },
            new Book()
            {
                Title = "Practical Guidelines and Best Practices for Visual Basic and Visual C# Developers"
            },
            new Book()
            {
                Title = "Windows Powershell in Action"
            },
            new Book()
            {
                Title = "Continuous Integration in .NET"
            },
            new Book()
            {
                Title = "Inside the Microsoft Build Engine: Using MSBuild and Team Foundation Build"
            },
            new Book()
            {
                Title = "WiX: A Developer's Guide to Windows Installer XML"
            },
            new Book()
            {
                Title = "The Preemie Primer: A Complete Guide for Parents of Premature Babies--from Birth through the Toddler Years and Beyond"
            },
            new Book()
            {
                Title = "On Becoming Baby Wise: Giving Your Infant the Gift of Nighttime Sleep"
            },
            new Book()
            {
                Title = "How to Win Friends & Influence People"
            },
            new Book()
            {
                Title = "Coyote Peterson’s Brave Adventures: Wild Animals in a Wild World"
            }
        };

        [HttpGet]
        public PagedEnumerable<Book> Get(int? page, int? pageSize, string filter = null)
        {
            IEnumerable<Book> result = books;

            if (!string.IsNullOrEmpty(filter))
            {
                result = result.Where(bk => bk.Title.IndexOf(filter, StringComparison.CurrentCultureIgnoreCase) >= 0);
            }

            return new PagedEnumerable<Book>(result, page ?? 1, pageSize ?? 10);
        }
    }
}
