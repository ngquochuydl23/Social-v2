namespace social_v2_api.Models
{
  public class HttpErrorDto
  {
    public int StatusCode { get; set; }
    public object ErrorMessage { get; set; }

    public HttpErrorDto(object ErrorMessage, int StatusCode)
    {
      this.ErrorMessage = ErrorMessage;
      this.StatusCode = StatusCode;
    }
  }
}
