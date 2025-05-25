using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SharpCompress.Common;
using social_v2_api.Entities;
using social_v2_api.Helpers;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.FeedService;
using social_v2_api.Services.FeedService.Dtos;
using social_v2_api.Services.SettingService.ManageAccountDtos;
using social_v2_api.Services.SettingService.SecurityAndPrivacyDtos;
using social_v2_api.Services.UserService;
using System.Collections.ObjectModel;

namespace social_v2_api.Services.SettingService
{
    public class SettingService : BaseService, ISettingService
  {
    private readonly IEfRepository<FeedEntity> _feedRepo;
    private readonly IEfRepository<AlbumEntity> _albumRepo;
    private readonly IEfRepository<UserEntity> _userRepo;
    private readonly IMapper _mapper;

    public SettingService(
      IEfRepository<UserEntity> userRepo,
      IMapper mapper,
      IEfRepository<FeedEntity> feedRepo,
      IEfRepository<AlbumEntity> albumRepo,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      _userRepo = userRepo;
      _feedRepo = feedRepo;
      _albumRepo = albumRepo;
    }
    public SecurityAndPrivacyDto GetSecurityAndPrivacy()
    {
      var user = GetUserEntity();

      return new SecurityAndPrivacyDto()
      {
        Email = user.Email,
        VerifiedEmail = user.VerifiedEmail,
        PhoneNumber = user.PhoneNumber,
        VerifiedPhoneNumber = user.VerifiedPhoneNumber
      };
    }

    public ResponseChangeEmail ChangeEmail(RequestChangeEmail model)
    {
      var user = GetUserEntity();

      if (user.Email == model.Email)
        throw new Exception("Cannot change the same email address.");

      user.Email = model.Email;
      _userRepo.Update(Id, user);
      return new ResponseChangeEmail()
      {
        Email = model.Email,
        VerifiedEmail = false,
      };
    }

    public ResponseChangePhoneNumber ChangePhoneNumber(RequestChangePhoneNumber model)
    {
      var user = GetUserEntity();

      if (user.PhoneNumber == model.PhoneNumber)
        throw new Exception("Cannot change the same phone number.");

      user.PhoneNumber = model.PhoneNumber;
      _userRepo.Update(Id, user);
      return new ResponseChangePhoneNumber()
      {
        PhoneNumber = model.PhoneNumber,
        VerifiedPhoneNumber = false,
      };
    }

    public ResponseChangeAvatar ChangeAvatar(RequestChangeAvatar model)
    {
      var user = GetUserEntity();
      user.Avatar = model.AvatarUrl;
      _userRepo.Update(Id, user);

      if (model.HasShareFeed)
      {
        var avatarAlbum = _albumRepo
          .GetQueryable()
          .Include(x => x.Medias)
          .FirstOrDefault(x => x.CreatorId == Id && x.Name == "Avatar")
            ?? _albumRepo.Insert(new AlbumEntity
            {
              Name = "Avatar",
              CreatorId = Id,
              Removable = false,
              CreateAt = DateTime.Now,
            });

        var newFeed = _feedRepo.Insert(new FeedEntity
        {
          AlbumId = avatarAlbum.Id,
          CreateAt = DateTime.Now,
          Caption = model.Caption,
          CreatorId = Id,
          FeedStyle = "avatar",
          Medias = new MediaEntity[]
          {
            new MediaEntity
            {
              AlbumId= avatarAlbum.Id,
              CreatorId = Id,
              CreateAt = DateTime.Now,
              Caption = model.Caption,
              Url = model.AvatarUrl,
              MediaType = model.MediaType,
            }
          }
        });

        avatarAlbum.Thumbnail = model.AvatarUrl;
        avatarAlbum.Count = avatarAlbum.Medias.Count();

        _albumRepo.Update(avatarAlbum.Id, avatarAlbum);

        return new ResponseChangeAvatar(user.Avatar, newFeed.Id);
      }
      return new ResponseChangeAvatar(user.Avatar);
    }

    public ResponseChangeCover ChangeCover(RequestChangeCover model)
    {
      var user = GetUserEntity();

      user.Cover = model.CoverUrl;
      _userRepo.Update(Id, user);

      if (model.HasShareFeed)
      {

      }

      return new ResponseChangeCover(user.Cover);
    }

    public ResponseChangeBio ChangeBio(RequestChangeBio model)
    {
      var user = GetUserEntity();

      user.Bio = model.Bio;
      _userRepo.Update(Id, user);
      return new ResponseChangeBio(user.Bio);
    }

    public UserEntity GetUserEntity()
    {
      return _userRepo.Find(Id) ?? throw new Exception("User does not exist");
    }

    public ResponseChangePassword ChangePassword(RequestChangePassword model)
    {
      var user = GetUserEntity();

      if (model.CurrentPassword == model.NewPassword)
        throw new Exception("Your new and current password are the same.");

      if (!BCrypt.Net.BCrypt.Verify(model.CurrentPassword, user.Password))
        throw new Exception("Your current password is incorrect.");

      user.Password = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
      _userRepo.Update(Id, user);
      return new ResponseChangePassword("Your password is successfully changed.");
    }
  }
}