﻿using System;
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

        public static List<UserData> GetUserDatas()
        {
            using var db = new PushServerDbContext();
            return db.UserDatas.ToList();
        }

        public static void UpdateMessageCount(PushMessage pushMessage)
        {
            using var db = new PushServerDbContext();
            if (db.ApiClientDatas.Any(v => v.Id == pushMessage.ApiClientId))
            {
                var userData = db.UserDatas.FirstOrDefault(v => v.Id == pushMessage.UserId && v.ApiClientId == pushMessage.ApiClientId);
                if (userData == null)
                {
                    db.Add(new UserData {Id = pushMessage.UserId, ApiClientId = pushMessage.ApiClientId});
                }
                else
                {
                    userData.MessagesCount++;
                }
            }
            db.SaveChanges();
        }

        public static void UpdateMessagesCount(List<UserData> messagesCounts)
        {
            using var db = new PushServerDbContext();
            foreach (var messageCount in messagesCounts)
            {
                if (db.ApiClientDatas.Any(v => v.Id == messageCount.ApiClientId))
                {
                    var userData = db.UserDatas.FirstOrDefault(v => v.Id == messageCount.Id && v.ApiClientId == messageCount.ApiClientId);
                    if (userData == null)
                    {
                        db.Add(new UserData { Id = messageCount.Id, ApiClientId = messageCount.ApiClientId, MessagesCount = messageCount.MessagesCount});
                    }
                    else
                    {
                        userData.MessagesCount += messageCount.MessagesCount;
                    }
                }
            }
            db.SaveChanges();
        }
    }
}
