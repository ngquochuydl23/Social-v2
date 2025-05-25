namespace social_v2_api.Services.SearchService.Dtos
{
    public class SearchAccountResultDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Avatar { get; set; }

        public string Bio { get; set; }

        public bool Followed { get; set; }

        public long FollowerCount { get; set; }

        public bool Owned { get; set; }
    }
}
