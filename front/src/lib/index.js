


const mountContent = (media_type, media_data, mediaRoot) => {

  const data = JSON.parse(media_data);

  try {
    switch (media_type) {
      case 'embedded_video': {
        const mountElement = document.getElementById(mediaRoot);
        mountElement.innerHTML = `
          <iframe 
            class="media-frame"
            src=${data.url} 
            frameborder="0" 
            scrolling="no" 
            allowfullscreen></iframe>`;
        break;
      }
      default: {
        const mountElement = document.getElementById(mediaRoot);
        mountElement.innerHTML = '<span>Unsupported content</span>';
        break;
      }
    }; } catch {} ;
};

export {
  mountContent
}