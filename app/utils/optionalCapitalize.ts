export function optionalCapitalize(string: string | undefined) {
  if (string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };
};