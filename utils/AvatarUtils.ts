
function stringToColor(str: string) {
  if (!str)
    return ""
  let hash = 0;
  let i;
  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: '100%',
      height: '100%'
    },
    children: name ? `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}` : undefined
  };
}