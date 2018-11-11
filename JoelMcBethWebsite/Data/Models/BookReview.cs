namespace JoelMcBethWebsite.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class BookReview
    {
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the Rating of the book.
        /// </summary>
        /// <value>
        /// Rating between 1 to 5.
        /// </value>
        public int? Rating { get; set; }

        public string Comments { get; set; }

        public bool? IsRecommended { get; set; }

        /// <summary>
        /// Gets or sets the Id of the book the review is about.
        /// </summary>
        public int BookId { get; set; }
    }
}
