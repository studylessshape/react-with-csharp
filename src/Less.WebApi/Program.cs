using Less.WebApi;
using Serilog;

try
{
    Log.Information("Starting web application");

    var builder = WebApplication.CreateBuilder(args);
    Startup.ConfigService(builder.Services, builder.Configuration);

    var app = builder.Build();
    Startup.PrepareService(app.Services);
    Startup.ConfigApp(app, app.Environment);

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




