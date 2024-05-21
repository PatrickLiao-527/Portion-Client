import React from 'react';
import '../assets/styles/Banner.css';
import BannerCard from './BannerCard';
import foodImage from '../assets/images/CAVA-food.png';
import titleImage from '../assets/images/CAVA-title.png';

const BannerSection = () => {
  const banners = [
    { title: "MEDITERRANEAN STYLE BOWLS", image: titleImage, foodImage: foodImage, description: "Description... Main Offerings/Ingredients: xxx, xxx, xxx" },
    { title: "MEDITERRANEAN STYLE BOWLS", image: titleImage, foodImage: foodImage, description: "Description... Main Offerings/Ingredients: xxx, xxx, xxx" },
    { title: "MEDITERRANEAN STYLE BOWLS", image: titleImage, foodImage: foodImage, description: "Description... Main Offerings/Ingredients: xxx, xxx, xxx" },
    { title: "MEDITERRANEAN STYLE BOWLS", image: titleImage, foodImage: foodImage, description: "Description... Main Offerings/Ingredients: xxx, xxx, xxx" },
    { title: "MEDITERRANEAN STYLE BOWLS", image: titleImage, foodImage: foodImage, description: "Description... Main Offerings/Ingredients: xxx, xxx, xxx" },
  ];

  return (
    <div className="banner-section">
      <h2 className="section-title">Explore Our Healthy Restaurant Partners</h2>
      <div className="banner-carousel">
        <div className="banner-carousel-inner">
          {banners.map((banner, index) => (
            <BannerCard
              key={index}
              title={banner.title}
              image={banner.image}
              foodImage={banner.foodImage}
              description={banner.description}
            />
          ))}
          {banners.map((banner, index) => (
            <BannerCard
              key={index + banners.length}
              title={banner.title}
              image={banner.image}
              foodImage={banner.foodImage}
              description={banner.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
