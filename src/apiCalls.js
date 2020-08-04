
const url = "http://localhost:3001/api/v1/urls"
// export const getUrls = () => {
//   return fetch('http://localhost:3001/api/v1/urls')
//       .then(response => response.json())
// }

// get and post

export const getAllUrls = async () => {
  const response = await fetch (url);
  const urls = await response.json();
  const allUrls = urls.urls;
  return allUrls;
};

export const postUrl = async (url, title) => {
  const response = await fetch (url, {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        "long_url": url,
        "title": title
      })
    }
  )
  const message = await response.json();
  return message;
}


'/api/v1/urls/:url_id'// delete

export const deleteUrl = async (urlId) => {
  const response = await fetch(
    `${url}/${urlId}`, {
      "method": "DELETE",
      "headers": {
        "content-type": "application/json"
      },
    }
  )
  return response.status;
}

'/useshorturl/:url_id'// redirect


