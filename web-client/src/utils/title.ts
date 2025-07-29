export function title(prefix?: string, suffix?: string): string {
  var resultTitle = import.meta.env.PUBLIC_APP_TITLE;
  if (prefix) resultTitle = `${prefix} - ${resultTitle}`;
  if (suffix) resultTitle = `${resultTitle} - ${suffix}`;
  return resultTitle;
}

export function titleAppend(suffix?: string) {
  return title(undefined, suffix);
}
