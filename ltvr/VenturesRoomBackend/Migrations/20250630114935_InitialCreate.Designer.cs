﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using VenturesRoomBackend.Data;

#nullable disable

namespace VenturesRoomBackend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250630114935_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("VenturesRoomBackend.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ClientId")
                        .HasColumnType("integer");

                    b.Property<string>("CommissionSplit")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PaymentStatus")
                        .HasColumnType("integer");

                    b.Property<decimal>("PricePaid")
                        .HasColumnType("numeric");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("ProductId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("DiscountPercent")
                        .HasColumnType("double precision");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.Property<int>("StartupId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("StartupId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.Startup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("FounderId")
                        .HasColumnType("integer");

                    b.Property<string>("Logo")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("Website")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("FounderId")
                        .IsUnique();

                    b.ToTable("Startups");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.StartupSupportStructure", b =>
                {
                    b.Property<int>("StartupId")
                        .HasColumnType("integer");

                    b.Property<int>("SupportStructureId")
                        .HasColumnType("integer");

                    b.HasKey("StartupId", "SupportStructureId");

                    b.HasIndex("SupportStructureId");

                    b.ToTable("StartupSupportStructures");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.SupportStructure", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("CommissionPercent")
                        .HasColumnType("double precision");

                    b.Property<string>("ContactEmail")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Logo")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("SupportStructures");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("LinkedStartupId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Photo")
                        .HasColumnType("text");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.UserSupportStructure", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<int>("SupportStructureId")
                        .HasColumnType("integer");

                    b.HasKey("UserId", "SupportStructureId");

                    b.HasIndex("SupportStructureId");

                    b.ToTable("UserSupportStructures");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.VIPClub", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("Active")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("DateJoined")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("MemberId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("MemberId");

                    b.ToTable("VIPClubs");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.VIPClubBenefit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ProductId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UsedOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("VIPClubId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("VIPClubId");

                    b.ToTable("VIPClubBenefits");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.Order", b =>
                {
                    b.HasOne("VenturesRoomBackend.Models.User", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VenturesRoomBackend.Models.Product", "Product")
                        .WithMany("Orders")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.Product", b =>
                {
                    b.HasOne("VenturesRoomBackend.Models.Startup", "Startup")
                        .WithMany("Products")
                        .HasForeignKey("StartupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Startup");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.Startup", b =>
                {
                    b.HasOne("VenturesRoomBackend.Models.User", "Founder")
                        .WithOne("LinkedStartup")
                        .HasForeignKey("VenturesRoomBackend.Models.Startup", "FounderId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Founder");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.StartupSupportStructure", b =>
                {
                    b.HasOne("VenturesRoomBackend.Models.Startup", "Startup")
                        .WithMany("StructuresLinked")
                        .HasForeignKey("StartupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VenturesRoomBackend.Models.SupportStructure", "SupportStructure")
                        .WithMany("LinkedStartups")
                        .HasForeignKey("SupportStructureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Startup");

                    b.Navigation("SupportStructure");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.UserSupportStructure", b =>
                {
                    b.HasOne("VenturesRoomBackend.Models.SupportStructure", "SupportStructure")
                        .WithMany("LinkedUsers")
                        .HasForeignKey("SupportStructureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VenturesRoomBackend.Models.User", "User")
                        .WithMany("LinkedStructures")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SupportStructure");

                    b.Navigation("User");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.VIPClub", b =>
                {
                    b.HasOne("VenturesRoomBackend.Models.User", "Member")
                        .WithMany("VIPClubs")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Member");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.VIPClubBenefit", b =>
                {
                    b.HasOne("VenturesRoomBackend.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VenturesRoomBackend.Models.VIPClub", "VIPClub")
                        .WithMany("BenefitsUsed")
                        .HasForeignKey("VIPClubId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");

                    b.Navigation("VIPClub");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.Product", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.Startup", b =>
                {
                    b.Navigation("Products");

                    b.Navigation("StructuresLinked");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.SupportStructure", b =>
                {
                    b.Navigation("LinkedStartups");

                    b.Navigation("LinkedUsers");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.User", b =>
                {
                    b.Navigation("LinkedStartup");

                    b.Navigation("LinkedStructures");

                    b.Navigation("VIPClubs");
                });

            modelBuilder.Entity("VenturesRoomBackend.Models.VIPClub", b =>
                {
                    b.Navigation("BenefitsUsed");
                });
#pragma warning restore 612, 618
        }
    }
}
