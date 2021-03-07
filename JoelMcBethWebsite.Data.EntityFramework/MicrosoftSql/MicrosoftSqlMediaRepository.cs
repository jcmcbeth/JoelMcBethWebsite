namespace JoelMcBethWebsite.Data.MicrosoftSql
{
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Threading.Tasks;
    using Dapper;
    using JoelMcBethWebsite.Data.Models;

    public class MicrosoftSqlMediaRepository : IMediaRepository
    {
        private readonly string connectionString;

        public MicrosoftSqlMediaRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<IEnumerable<Media>> GetMediaAsync(string titleSearch)
        {
            var query = @"SELECT
                            [Id],
		                    [Title],
		                    [MediaType], 
		                    [Medium],
		                    [Year]
                          FROM [Media]";

            using (var connection = new SqlConnection(this.connectionString))
            {
                var media = await connection.QueryAsync<Media>(query);

                if (!string.IsNullOrWhiteSpace(titleSearch))
                {
                    media = media.Where(m =>
                        m.Title.IndexOf(titleSearch, StringComparison.OrdinalIgnoreCase) >= 0);
                }

                return media;
            }
        }
    }
}
