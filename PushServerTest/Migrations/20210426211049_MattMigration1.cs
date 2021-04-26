using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PushServerTest.Migrations
{
    public partial class MattMigration1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApiClientDatas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApiClientDatas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserDatas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ApiClientId = table.Column<Guid>(type: "TEXT", nullable: false),
                    MessagesCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDatas", x => new { x.Id, x.ApiClientId });
                    table.ForeignKey(
                        name: "FK_UserDatas_ApiClientDatas_ApiClientId",
                        column: x => x.ApiClientId,
                        principalTable: "ApiClientDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserDatas_ApiClientId",
                table: "UserDatas",
                column: "ApiClientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserDatas");

            migrationBuilder.DropTable(
                name: "ApiClientDatas");
        }
    }
}
