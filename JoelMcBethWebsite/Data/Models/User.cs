﻿namespace JoelMcBethWebsite.Data.Models
{
    public class User
    {
        public string UserName { get; set; }

        public string Email { get; set; }

        public byte[] PasswordSalt { get; set; }

        public byte[] HashedPassword { get; set; }
    }
}
