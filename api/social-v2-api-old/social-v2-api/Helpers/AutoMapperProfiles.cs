using AutoMapper;
using social_v2_api.BaseDtos;
using social_v2_api.Entities;
using social_v2_api.Repositories;
using social_v2_api.Services.AlbumService.Dtos;
using social_v2_api.Services.ClientService.Dtos;
using social_v2_api.Services.CommentService.Dtos;
using social_v2_api.Services.DeviceService.Dtos;
using social_v2_api.Services.FeedService.Dtos;
using social_v2_api.Services.FollowService.FollowerDtos;
using social_v2_api.Services.FollowService.FollowingDtos;
using social_v2_api.Services.LikeService.Dtos;
using social_v2_api.Services.MediaService;
using social_v2_api.Services.ProfileService.ProfileDtos;
using social_v2_api.Services.RegisterService.Dtos;
using social_v2_api.Services.SessionService.Dtos;
using social_v2_api.Services.StoryService.Dtos;

namespace social_v2_api.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    private readonly IMapper _mapper;
    private readonly AppSettings _appSettings;

    public AutoMapperProfiles()
    {
      ConfigureAccountMapping();
      ConfigureClientMapping();
      ConfigureFeedMapping();
      ConfigureAlbumMapping();
      ConfigureMediaMapping();
      ConfigureCommentMapping();
      ConfigureLikeMapping();
      ConfigureFollowMapping();
      ConfigureStoryMapping();
      ConfigureDeviceMapping();
    }
    private void ConfigureAccountMapping()
    {
      CreateMap<UserEntity, ProfileDto>();
      CreateMap<RequestRegister, UserEntity>()
          .ForMember(des => des.FullName, act => act.MapFrom(src => src.LastName + " " + src.FirstName));
      CreateMap<UserEntity, ResponseCurrentSession.SessionUser>();
      CreateMap<UserEntity, BaseCreatorDto>();
      //CreateMap<AccountEntity, MediaCreatorDto>();
      CreateMap<UserEntity, FeedCreatorDto>();
      CreateMap<UserEntity, CommentCreatorDto>();
      CreateMap<UserEntity, ViewerDto>();
    }

    private void ConfigureClientMapping()
    {
      CreateMap<ClientEntity, ClientDto>();
    }

    private void ConfigureFeedMapping()
    {
      CreateMap<FeedEntity, FeedDto>()
         .ForMember(des => des.MostRelativeComments, act => act.MapFrom(src => src.Comments));
      CreateMap<RequestCreateFeed, FeedEntity>();
    }

    private void ConfigureAlbumMapping()
    {
      CreateMap<RequestCreateAlbum, AlbumEntity>();
      CreateMap<AlbumEntity, AlbumDto>();
    }

    private void ConfigureMediaMapping()
    {
      CreateMap<RequestPostMedia, MediaEntity>();
      CreateMap<MediaEntity, MediaDto>();
    }

    private void ConfigureCommentMapping()
    {
      CreateMap<CommentEntity, CommentDto>();
    }

    private void ConfigureLikeMapping()
    {
      CreateMap<LikeEntity, LikeDto>();
    }

    private void ConfigureFollowMapping()
    {
      CreateMap<FollowEntity, FollowingDto>()
        .ForMember(des => des.Avatar, act => act.MapFrom(src => src.DestUser.Avatar))
        .ForMember(des => des.FullName, act => act.MapFrom(src => src.DestUser.FullName))
        .ForMember(des => des.DestUserId, act => act.MapFrom(src => src.DestUser.Id))
        .ForMember(des => des.UserName, act => act.MapFrom(src => src.DestUser.UserName));

      CreateMap<FollowEntity, FollowerDto>()
        .ForMember(des => des.Avatar, act => act.MapFrom(src => src.CreatorUser.Avatar))
        .ForMember(des => des.FullName, act => act.MapFrom(src => src.CreatorUser.FullName))
        .ForMember(des => des.CreatorId, act => act.MapFrom(src => src.CreatorUser.Id))
        .ForMember(des => des.UserName, act => act.MapFrom(src => src.CreatorUser.UserName));
    }

    private void ConfigureStoryMapping()
    {
      CreateMap<StoryEntity, StoryDto>();
      CreateMap<CreateStoryDto, StoryEntity>();
    }

    private void ConfigureDeviceMapping()
    {
      CreateMap<DeviceEntity, DeviceDto>();
    }
  }
}
