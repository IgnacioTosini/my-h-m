import React from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const ShareButton = ({ url }) => {
    return (
        <div className="social-container">
            <FacebookShareButton url={url} className="facebook-button">
                <FontAwesomeIcon icon={faFacebook} />
            </FacebookShareButton>
            <TwitterShareButton url={url} className="twitter-button">
                <FontAwesomeIcon icon={faTwitter} />
            </TwitterShareButton>
        </div>
    );
};

export default ShareButton;
