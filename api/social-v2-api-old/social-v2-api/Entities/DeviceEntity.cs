using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace social_v2_api.Entities
{
  public class DeviceEntity : BaseEntity<long>, IHasCreationTime
  {
    [Column(TypeName = "varchar(256)")]
    public string? DeviceToken { get; set; }

    [Column(TypeName = "varchar(50)")]
    public string? DeviceName { get; set; }

    [Column(TypeName = "varchar(25)")]
    public string? Platform { get; set; }

    public DateTime CreateAt { get; set; }

    public long CreatorId { get; set; }

    [Column(TypeName = "varchar(10)")]
    public string? AppVersion { get; set; } = "1.0.0";

    [Column(TypeName = "varchar(50)")]
    public string? AppName { get; set; }

    public bool TurnOffNotification { get; set; } = true;

    public DateTime? LastAccess { get; set; }

    [Column(TypeName = "varchar(50)")]
    public string? IpAddress { get; set; }

    public string? Location { get; set; }

    public virtual UserEntity? Creator { get; set; }
  }
}
