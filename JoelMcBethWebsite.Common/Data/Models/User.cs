namespace JoelMcBethWebsite.Data.Models
{
    using System;
    using System.Collections.Generic;

    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public byte[] PasswordSalt { get; set; }

        public byte[] HashedPassword { get; set; }

        public bool IsApproved { get; set; }

        public int FailedLoginAttempts { get; set; }

        public bool IsLocked { get; set; }

        public DateTime? LastLoginAttempt { get; set; }

        public IEnumerable<Notification> Notifications { get; set; }
    }
}
