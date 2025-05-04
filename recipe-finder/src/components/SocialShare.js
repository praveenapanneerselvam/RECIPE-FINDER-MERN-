import React from 'react';

const SocialShare = ({ recipe }) => {
  const handleShare = (platform) => {
    const url = encodeURIComponent(recipe.url);
    const text = encodeURIComponent(`Check out this recipe: ${recipe.label}`);
    let shareUrl;

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      // Add more platforms as needed
      default:
        break;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div>
      <button onClick={() => handleShare('facebook')}>Share on Facebook</button>
      <button onClick={() => handleShare('twitter')}>Share on Twitter</button>
    </div>
  );
};

export default SocialShare;
