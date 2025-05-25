namespace social_v2_api.Services.FollowService.FollowerDtos
{
    public class FollowerDto
    {
        public int CreatorId { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Avatar { get; set; }

        public bool? Owned { get; set; }
    }
}
