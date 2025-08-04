using Less.Auth.WebApi;
using Less.Auth.WebApi.Controllers;
using Less.DalCore;
using Less.WebApi.Dal;
using Less.WebApi.Filters;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text.Json.Serialization;

try
{
    Log.Information("Starting web application");

    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddSerilog((services, lc) => lc
        .ReadFrom.Configuration(builder.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext()
        .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3} ({SourceContext})] {Message:lj}{NewLine}{Exception}"));
    #region web
    // Add services to the container.
    builder.Services.AddControllers(opts =>
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
    .AddLessAuthControllerWithCookies();
    builder.Services.AddCors();

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(opts =>
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

    builder.Services.AddResponseCaching();
    #endregion

    builder.Services.AddCoreDal(builder.Configuration);

    var app = builder.Build();
    app.Services.EnsureDbContextCreate<CoreDbContext>();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
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

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}




