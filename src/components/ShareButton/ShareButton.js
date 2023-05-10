import React from 'react';
import { WhatsappShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';

const ShareButton = ({ url }) => {
    return (
        <div className="social-container">
            <WhatsappShareButton url={url} className="whatsapp-button">
            <i className="fab fa-whatsapp"></i>
            </WhatsappShareButton>
            <FacebookShareButton url={url} className="facebook-button">
            <i className="fab fa-facebook"></i>
            </FacebookShareButton>
            <TwitterShareButton url={url} className="twitter-button">
                <i className="fab fa-twitter"></i>
            </TwitterShareButton>
        </div>
    );
};

export default ShareButton;
