namespace JoelMcBethWebsite.Data.MicrosoftSql
{
    using System;
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Linq;
    using System.Threading.Tasks;

    public static class DbDataReaderExtensions
    {
        public static int GetInt32(this DbDataReader reader, string columnName)
        {
            int ordinal = reader.GetOrdinal(columnName);

            return reader.GetInt32(ordinal);
        }

        public static int? GetNullableInt32(this DbDataReader reader, string columnName, int? defaultValue = default(int?))
        {
            var value = reader[columnName];

            if (value == DBNull.Value)
            {
                return defaultValue;
            }

            return (int)value;
        }

        public static byte? GetNullableByte(this DbDataReader reader, string columnName, byte? defaultValue = default(byte?))
        {
            var value = reader[columnName];

            if (value == DBNull.Value)
            {
                return defaultValue;
            }

            return (byte)value;
        }

        public static string GetNullableString(this DbDataReader reader, string columnName, string defaultValue = default(string))
        {
            var value = reader[columnName];

            if (value == DBNull.Value)
            {
                return defaultValue;
            }

            return (string)value;
        }
    }
}
