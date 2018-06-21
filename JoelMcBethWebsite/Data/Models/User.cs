namespace JoelMcBethWebsite.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class User
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordSalt { get; set; }
        public byte[] HashedPassword { get; set; }
    }
}
