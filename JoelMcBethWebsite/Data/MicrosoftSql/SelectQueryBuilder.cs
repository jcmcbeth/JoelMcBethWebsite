using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoelMcBethWebsite.Data.MicrosoftSql
{
    public class SelectQueryBuilder
    {
        private readonly string tableName;
        private readonly List<string> selections;

        const string temp = @"
                SELECT DISTINCT [Books].[Id]
                    ,[Books].[Isbn13]
                    ,[Books].[Title]
                    ,[Books].[Edition]
                    ,[Books].[Pages]
                    ,[Books].[Rating]
                    ,[Books].[Order]
                FROM [Books]
                LEFT JOIN [BookAuthors] on [Books].[Id] = [BookAuthors].[BookId]
                LEFT JOIN [Authors] ON [BookAuthors].[AuthorId] = [Authors].[Id]
                WHERE [Books].[Title] LIKE @Filter OR [Authors].[FirstName] LIKE @Filter OR [Authors].[LastName] LIKE @Filter
                ORDER BY {
                OFFSET {0} ROWS
                FETCH NEXT {1} ROWS ONLY
                ";

        public SelectQueryBuilder(string tableName)
        {
            this.tableName = tableName;
            this.selections = new List<string>();
        }

        public void AddSelection(string selection)
        {
            this.selections.Add(selection);
        }


        public string GetQuery()
        {
            var builder = new StringBuilder("SELECT ");

            builder.Append(string.Join(", ", this.selections));

            builder.AppendLine();
            builder.Append("FROM ");
            builder.Append(this.tableName);

            return builder.ToString();
        }
    }
}
