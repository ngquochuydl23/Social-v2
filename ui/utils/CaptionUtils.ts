
export const getCaptionLines = (feedId: number) => {
  var captionIdView = document.getElementById('caption' + feedId);
  var divHeight = captionIdView?.offsetHeight || 0;
  var lineHeight = 24;
  return divHeight / lineHeight;
}