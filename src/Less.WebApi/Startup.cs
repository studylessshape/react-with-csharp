using Less.Auth.WebApi;
using Less.Auth.WebApi.Controllers;
using Less.DalCore;
using Less.WebApi.Dal;
using Less.WebApi.Filters;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text.Json.Serialization;

namespace Less.WebApi
{
    public static class Startup
    {
        public static void ConfigService(IServiceCollection services, IConfiguration configuration)
        {
            #region log
            services.AddSerilog((services, lc) => lc
                .ReadFrom.Configuration(configuration)
                .ReadFrom.Services(services)
                .Enrich.FromLogContext());
            #endregion

            #region web
            // Add services to the container.
            services.AddControllers(opts =>
            {
                opts.Filters.Add<ExceptionFilter>();
                opts.Filters.Add<ValidationProblemDetailsResultFilter>();
            })
            .AddJsonOptions(opts =>
            {
                opts.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                opts.JsonSerializerOptions.ReadCommentHandling = System.Text.Json.JsonCommentHandling.Skip;
                opts.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
            })
            .AddLessAuthServices();
            services.AddCors();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(opts =>
            {
                opts.OperationFilter<AuthOperationFilter>();
                opts.AddSecurityDefinition("cookies", new OpenApiSecurityScheme
                {
                    Description = "Standard Authorization header using the cookies",
                    In = ParameterLocation.Cookie,
                    Name = "Cookies",
                    Type = SecuritySchemeType.ApiKey,
                });
                opts.IncludeXmlComments(typeof(LoginController).Assembly);
            });

            services.AddResponseCaching();
            #endregion

            services.AddCoreDal(configuration);
        }

        public static void PrepareService(IServiceProvider services)
        {
            services.EnsureDbContextCreate<CoreDbContext>();
        }

        public static void ConfigApp<TApp>(TApp app, IWebHostEnvironment environment)
            where TApp : IApplicationBuilder, IEndpointRouteBuilder
        {
            // Configure the HTTP request pipeline.
            if (environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseResponseCaching();
            app.UseCors(builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());

            //app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.UseSwagger();
            app.UseSwaggerUI(AspNetCore.Swagger.Themes.ModernStyle.Dark);
        }
    }
}
