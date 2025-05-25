using social_v2_api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using social_v2_api.Services.UserService;
using social_v2_api.Helpers;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.OpenApi.Models;
using social_v2_api.Services.SessionService;
using social_v2_api.Services.ClientService;
using social_v2_api.Services.FollowService;
using social_v2_api.Services.RegisterService;
using social_v2_api.Services.SettingService;
using social_v2_api.Services.ProfileService;
using social_v2_api.Services.FeedService;
using social_v2_api.Services.AlbumService;
using social_v2_api.Services.SearchService;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Repositories.MongoRepository;
using social_v2_api.Services.CommentService;
using Newtonsoft.Json;
using social_v2_api.Services.LikeService;
using social_v2_api.Services.StoryService;
using social_v2_api.Middleware.Jwt;
using Microsoft.AspNetCore.Identity;
using social_v2_api.Services.DeviceService;
using Microsoft.AspNetCore.HttpOverrides;
using social_v2_api.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
  .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

builder.Services.AddCors();
builder.Services.AddHttpContextAccessor();

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
builder.Services.Configure<GoogleAuthSettings>(builder.Configuration.GetSection("GoogleAuthSettings"));
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
  options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
  config.EnableAnnotations();
  config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
  {
    In = ParameterLocation.Header,
    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
    Name = "Authorization",
    Type = SecuritySchemeType.Http,
    BearerFormat = "JWT",
    Scheme = "bearer"
  });


  config.AddSecurityRequirement(new OpenApiSecurityRequirement
  {
    {
      new OpenApiSecurityScheme
      {
        Name = "Bearer",
        In = ParameterLocation.Header,
        Reference = new OpenApiReference
        {
          Id = "Bearer",
          Type = ReferenceType.SecurityScheme
        }
      },
      new List<string>()
    }
  });
});
builder.Services.AddDbContext<ApplicationDbContext>(x =>
   x.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddAuthentication(auth =>
{
  auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
  .AddJwtBearer(options =>
  {
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetSection("AppSettings:Secret").Value)),
      ValidateIssuer = false,
      ValidateAudience = false
    };
  })
  .AddGoogle(googleOptions => 
  {
    googleOptions.ClientId = builder.Configuration.GetSection("GoogleAuthSettings:clientId").Value;
    googleOptions.ClientSecret = builder.Configuration.GetSection("GoogleAuthSettings:clientSecret").Value;
  });

builder.Services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddTransient(typeof(IEfRepository<>), typeof(EfRepository<>));
builder.Services.AddTransient(typeof(IMongoRepository<>), typeof(MongoRepository<>));
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IFeedService, FeedService>();
builder.Services.AddTransient<ISessionService, SessionService>();
builder.Services.AddTransient<IClientService, ClientService>();
builder.Services.AddTransient<IFollowService, FollowService>();
builder.Services.AddTransient<IRegisterService, RegisterService>();
builder.Services.AddTransient<ISettingService, SettingService>();
builder.Services.AddTransient<IProfileService, ProfileService>();
builder.Services.AddTransient<ISearchService, SearchService>();
builder.Services.AddTransient<IAlbumService, AlbumService>();
builder.Services.AddTransient<ICommentService, CommentService>();
builder.Services.AddTransient<ILikeService, LikeService>();
builder.Services.AddTransient<IStoryService, StoryService>();
builder.Services.AddTransient<IDeviceService, DeviceService>();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);

var app = builder.Build();


app.UseDeveloperExceptionPage();
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(x => x
  .AllowAnyMethod()
  .AllowAnyHeader()
  .SetIsOriginAllowed(origin => true)
  .AllowCredentials());

app.UseRouting();
app.UseMiddleware<JwtMiddleware>();

app.UseAuthorization();
app.MapControllers();
app.Run();
