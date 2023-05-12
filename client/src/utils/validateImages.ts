export const validateImageURL = async(url: string): Promise<boolean> => {
  const excludedUrls = ['input.photos', 'more photos', 'a'];

  if (!url || excludedUrls.includes(url)) {
    return false;
  }

  url = url.replace('http://', 'https://');

  try {
    const response = await fetch(url, { method: 'HEAD' });

    if (!response.ok) {
      return false;
    }

    const contentType = response.headers.get('Content-Type');

    if (!contentType?.startsWith('image/')) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const validateImages = async(
  images: { url: string; thumbnail_url?: string | undefined }[]
): Promise<{ url: string; thumbnail_url?: string | undefined }[]> => {
  const filteredPhotos = await Promise.all(
    images.map(async(image) => {
      if (!image || !image.url) {
        return null;
      }

      const isValid =
        (await validateImageURL(image.url)) &&
        (!image.thumbnail_url ||
          (image.thumbnail_url &&
            (await validateImageURL(image.thumbnail_url))));

      return isValid ? image : null;
    })
  );

  return filteredPhotos.filter((photo) => photo !== null) as {
    url: string;
    thumbnail_url?: string | undefined;
  }[];
};
