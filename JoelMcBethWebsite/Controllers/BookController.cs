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
        [HttpGet]
        public IEnumerable<Book> Get()
        {
            return new Book[]
            {
                new Book()
                {
                    Title = "Soft Skills: The software developer's life manual",
                    Authors = new List<string>()
                    {
                        "John Sonmez"
                    }                    
                },
                new Book()
                {
                    Title = "Assembly language Step by Step - Programming with Linux",
                    Edition = "3rd",
                    Authors = new List<string>()
                    {
                        "Jeff Duntemann"
                    }
                },
                new Book()
                {
                    Title = "The Expectant Father: The Ultimate Guide for Dads-to-Be"
                },
                new Book()
                {
                    Title = "Be Prepared"
                },
                new Book()
                {
                    Title = "Data Science From Scratch"
                },
                new Book()
                {
                    Title = "Clean Code - A Handbook of Agile Software Craftsmanship"
                },
                new Book()
                {
                    Title = "American Sign Language Dictionary"
                },
                new Book()
                {
                    Title = "Modern Cryptography"
                },
                new Book()
                {
                    Title = "The Pragmatic Programmer"
                },
                new Book()
                {
                    Title = "Building Wireless Sensor Networks"
                },
                new Book()
                {
                    Title = "Pandemic"
                },
                new Book()
                {
                    Title = "Assembly Language Step by Step - Programming with Linux"
                },
                new Book()
                {
                    Title = "127 Hours - Between a Rock and a Hard Place"
                },
                new Book()
                {
                    Title = "The Art of Computer Programming - Fundamental Algorithms - Volume 1"
                },
                new Book()
                {
                    Title = "Brownfield Application Development in .NET"
                },
                new Book()
                {
                    Title = "Prime Obsession"
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
        }               
    }
}
