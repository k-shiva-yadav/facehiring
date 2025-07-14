import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FeaturedCompetitionsCarousel.css';

const featuredCompetitions = [
  {
    image: require('../../Assests/Images/coupon-deal2.jpg'),
  },
  {
    image: require('../../Assests/Images/coupon-deal1.jpg'),
  },
  {
    image: require('../../Assests/Images/coupon-deal3.jpg'), // duplicate for autoplay
  },
];

const FeaturedCompetitionsCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 991,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="featured-competitions-carousel">
      <Slider {...settings} className="carousel-slider-gap">
        {featuredCompetitions.map((item, idx) => (
          <div key={idx} className="carousel-card card-spacing">
            <img src={item.image} alt="Featured Competition" className="carousel-img-full" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedCompetitionsCarousel; 