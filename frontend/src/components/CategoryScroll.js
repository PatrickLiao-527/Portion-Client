import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../assets/styles/CategoryScroll.css';
import chevronLeft from '../assets/images/chevronLeft_icon.svg';
import chevronRight from '../assets/images/chevronRight_icon.svg';

const CategoryScroll = ({ categories, selectedCategory, onCategoryClick }) => {
  const scrollContainerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Calculate the number of visible items in the scroll container
  const calculateVisibleItems = useCallback(() => {
    if (scrollContainerRef.current && !isMobile) {
      const containerWidth = scrollContainerRef.current.offsetWidth - 80; // Subtract width for chevrons
      let totalWidth = 0;
      let itemsVisible = [];
      let itemWidths = [];

      categories.forEach((category) => {
        const span = document.createElement('span');
        span.style.fontSize = '24px';
        span.style.fontWeight = '600';
        span.style.fontFamily = 'Poppins';
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.innerText = category.name;
        document.body.appendChild(span);
        const width = span.offsetWidth + 40; // Add padding
        document.body.removeChild(span);
        itemWidths.push(width);
      });

      for (let i = startIndex; i < categories.length; i++) {
        if (totalWidth + itemWidths[i] <= containerWidth) {
          totalWidth += itemWidths[i];
          itemsVisible.push(i);
        } else {
          break;
        }
      }

      setVisibleItems(itemsVisible);
    }
  }, [categories, startIndex, isMobile]);

  // Scroll left by adjusting the start index
  const scrollLeft = () => {
    setStartIndex(prevIndex => Math.max(prevIndex - visibleItems.length, 0));
  };

  // Scroll right by adjusting the start index
  const scrollRight = () => {
    setStartIndex(prevIndex => Math.min(prevIndex + visibleItems.length, categories.length - visibleItems.length));
  };

  // Handle resize events and recalculate visible items
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      calculateVisibleItems();
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categories, startIndex, isMobile, calculateVisibleItems]);

  return (
    <div className="category-scroll-container">
      {!isMobile && (
        <button className="chevron-button left" onClick={scrollLeft}>
          <img src={chevronLeft} alt="Scroll Left" />
        </button>
      )}
      <div className="category-scroll" ref={scrollContainerRef}>
        {categories.slice(isMobile ? 0 : startIndex, isMobile ? categories.length : startIndex + visibleItems.length).map((category, index) => (
          <div
            key={index}
            className={`category-item ${category._id === selectedCategory._id ? 'selected' : ''}`}
            onClick={() => onCategoryClick(category)}
          >
            {category.name}
          </div>
        ))}
      </div>
      {!isMobile && (
        <button className="chevron-button right" onClick={scrollRight}>
          <img src={chevronRight} alt="Scroll Right" />
        </button>
      )}
    </div>
  );
};

export default CategoryScroll;
