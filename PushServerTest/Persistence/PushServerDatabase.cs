using System;
using System.Collections.Generic;
using System.Linq;
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
            var result = db.ApiClientDatas.FirstOrDefault(b => b.NodeId == apiClientData.NodeId);
            if (result != null)
            {
                result.IsDeleted = false;
            }
            else
            {
                db.Add(apiClientData);
            }
            db.SaveChanges();
        }

        internal static void EditApiDescription(ApiClientData apiClientData)
        {
            using var db = new PushServerDbContext();
            var result = db.ApiClientDatas.FirstOrDefault(b => b.NodeId == apiClientData.NodeId);
            if (result != null)
            {
                result.Description = apiClientData.Description;
                db.SaveChanges();
            }
        }

        internal static void DeleteApiClient(ApiClientData apiClientData)
        {
            using var db = new PushServerDbContext();
            var result = db.ApiClientDatas.FirstOrDefault(b => b.NodeId == apiClientData.NodeId);
            if (result != null)
            {
                result.IsDeleted = true;
                db.SaveChanges();
            }
        }

        internal static void RestoreApiClient(ApiClientData apiClientData)
        {
            using var db = new PushServerDbContext();
            var result = db.ApiClientDatas.FirstOrDefault(b => b.NodeId == apiClientData.NodeId);
            if (result != null)
            {
                result.IsDeleted = false;
                db.SaveChanges();
            }
        }

        public static List<ApiClientData> GetApiClientDatas()
        {
            using var db = new PushServerDbContext();
            return db.ApiClientDatas.ToList();
        }

        public static List<UserData> GetUserDatas()
        {
            using var db = new PushServerDbContext();
            return db.UserDatas.ToList();
        }

        public static void AddUserData(UserData userData)
        {
            using var db = new PushServerDbContext();
            db.Add(userData);
            db.SaveChanges();
        }

        public static void DeleteUserData(UserData userData)
        {
            using var db = new PushServerDbContext();
            db.Remove(userData);
            db.SaveChanges();
        }

        internal static void EditUserDescription(UserData userData)
        {
            using var db = new PushServerDbContext();
            var result = db.UserDatas.FirstOrDefault(b => b.Id == userData.Id && b.ApiNodeId == userData.ApiNodeId);
            if (result != null)
            {
                result.Description = userData.Description;
                db.SaveChanges();
            }
        }

        public static void UpdateMessageCount(PushMessage pushMessage)
        {
            using var db = new PushServerDbContext();

            if(!db.ApiClientDatas.Any(v => v.NodeId == pushMessage.ApiNodeId))
            {
                db.Add(new ApiClientData { NodeId = pushMessage.ApiNodeId });
            }

            var userData = db.UserDatas.FirstOrDefault(v => v.Id == pushMessage.UserId && v.ApiNodeId == pushMessage.ApiNodeId);
            if (userData == null)
            {
                db.Add(new UserData { Id = pushMessage.UserId, ApiNodeId = pushMessage.ApiNodeId });
            }
            else
            {
                userData.MessagesCount++;
            }
            db.SaveChanges();
        }

        public static void UpdateMessagesCount(List<UserData> messagesCounts)
        {
            using var db = new PushServerDbContext();
            foreach (var messageCount in messagesCounts)
            {
                if (!db.ApiClientDatas.Any(v => v.NodeId == messageCount.ApiNodeId))
                {
                    db.Add(new ApiClientData { NodeId = messageCount.ApiNodeId });
                }

                var userData = db.UserDatas.FirstOrDefault(v => v.Id == messageCount.Id && v.ApiNodeId == messageCount.ApiNodeId);
                if (userData == null)
                {
                    db.Add(new UserData { Id = messageCount.Id, ApiNodeId = messageCount.ApiNodeId, MessagesCount = messageCount.MessagesCount });
                }
                else
                {
                    userData.MessagesCount += messageCount.MessagesCount;
                }
            }
            db.SaveChanges();
        }
    }
}
