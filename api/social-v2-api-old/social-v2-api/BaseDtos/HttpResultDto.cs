using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace social_v2_api.Models
{
  public class HttpResultDto
  {
    public HttpResultDto(object? Result, int StatusCode)
    {
      this.Result = Result;
      this.StatusCode = StatusCode;
    }

    public object? Result { get; set; }
    public int StatusCode { get; set; }
  }
}
