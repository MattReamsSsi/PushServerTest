using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PushServerTest.Persistence
{
    public static class PushServerDatabase
    {
        public static void MigrateDatabase()
        {
            using var db = new PushServerDbContext();
            db.Database.Migrate();
        }

        public static void AddApiClientData(ApiClientData apiClientData)
        {
            using var db = new PushServerDbContext();
            db.Add(apiClientData);
            db.SaveChanges();
        }

        public static List<ApiClientData> GetApiClientDatas()
        {
            using var db = new PushServerDbContext();
            return db.ApiClientDatas.Where(v => !v.IsDeleted).ToList();
        }
    }
}
