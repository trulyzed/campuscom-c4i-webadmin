export const handleTrailingSlashAppend = (endpoint='', appendTrailingSlash=false): string => {
  if (!endpoint) return '';
  const splitted = endpoint.split('?');
  const hasQueryParam = splitted.length > 1;
  const onlyEndpoint = splitted[0];
  const queryParam = hasQueryParam && `?${splitted[1]}` || '';
  const slash = appendTrailingSlash && !onlyEndpoint.endsWith('/') && '/' || '';

  return `${onlyEndpoint}${slash}${queryParam}`;
}