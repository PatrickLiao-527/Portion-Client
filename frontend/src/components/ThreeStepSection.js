import React from 'react';
import '../assets/styles/ThreeStepSection.css';
import ExclamationIcon from '../assets/images/Exclamation_icon.png';
import DownLeftArrow from '../assets/images/DownleftArrow.png';
import DownRightArrow from '../assets/images/DownrightArrow.png';
import CoolKidsStanding from '../assets/images/Cool Kids - Standing 1.png';
import CoolKidsBust from '../assets/images/Cool Kids - Bust 1.png';
import CoolKidsStayingHome from '../assets/images/Cool Kids - Staying Home 1.png';
import BroccoliIcon from '../assets/images/Brocolli_icon.png';
import MeatIcon from '../assets/images/Meat_icon.png';
import SushiIcon from '../assets/images/Sushi_icon.png';
import HeartEmoji from '../assets/images/Heart_emoji.png';
import HandsUpEmoji from '../assets/images/HandsUp_emoji.png';
import LovingEmoji from '../assets/images/Loving_emoji.png';
import LitEmoji from '../assets/images/Lit_emoji.png';
import SurprisedEmoji from '../assets/images/Surprised_emoji.png';
import SoGoodBubble from '../assets/images/So-good-bubble.png';

const ThreeStepSection = () => {
  return (
    <div className="three-step-section">
      <div className="row">
        <div className="text-section">
          <h2>Get Portioned Meals <br /> in 3 Easy Steps</h2>
        </div>
        <div className="step step-1">
          <div className="step-content">
            <img src={CoolKidsStanding} alt="Step 1" className="step-image step-image-1" />
            <img src={ExclamationIcon} alt="Exclamation" className="exclamation-icon" />
            <p className="step-1-text">
              <strong>Browse</strong> our carefully selected restaurant selection <br />
              &<br /> <strong>find one to satisfy</strong> your cravings and needs.
            </p>
          </div>
        </div>
      </div>
      <img src={DownLeftArrow} alt="Down Left Arrow" className="arrow downleft-arrow" />
      <div className="row">
        <div className="step step-2">
          <div className="step-content">
            <p className="step-2-text">
              <strong>Choose</strong> an offering & <strong>customize</strong>!<br />
              20g, 50g, 100g, or whatever you want, we will make sure you get your desired portions.
            </p>
            <img src={BroccoliIcon} alt="Broccoli" className="broccoli-icon" />
            <img src={MeatIcon} alt="Meat" className="meat-icon" />
            <img src={SushiIcon} alt="Sushi" className="sushi-icon" />
            <img src={CoolKidsBust} alt="Step 2" className="step-image step-image-2" />
          </div>
        </div>
      </div>
      <img src={DownRightArrow} alt="Down Right Arrow" className="arrow downright-arrow" />
      <div className="row">
        <div className="text-section">
          <button className="get-started-button">Get Started With<br />Your First Order!</button>
        </div>
        <div className="step step-3">
          <div className="step-content">
            <div className="text-container">
              <p className="confirm-pickup-text">
                <strong>Confirm & pick up/<br />get it delivered</strong>!
              </p>
              <p className="enjoy-text">
                Now, enjoy with friends<br /> or by yourself!
              </p>
            </div>
            <img src={CoolKidsStayingHome} alt="Step 3" className="step-image step-image-3" />
            <div className="emojis">
              <img src={HeartEmoji} alt="Heart Emoji" className="heart-emoji" />
              <img src={HandsUpEmoji} alt="Hands Up Emoji" className="handsup-emoji" />
              <img src={LovingEmoji} alt="Loving Emoji" className="loving-emoji" />
              <img src={LitEmoji} alt="Lit Emoji" className="lit-emoji" />
              <img src={SurprisedEmoji} alt="Surprised Emoji" className="surprised-emoji" />
            </div>
            <img src={SoGoodBubble} alt="So Good" className="so-good-bubble" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeStepSection;
