import React from "react";
import { language } from "../../../scripts/language";

const Info = ({ lang }) => {
  return (
    <footer className="info-footer">
      <div className="footer-glow"></div>

      <div className="info-container">
        <div className="info-brand">
          <h2>{language?.[lang].footer.title}</h2>

          <p>
            {language?.[lang].footer.description}
          </p>
        </div>

        <div className="info-social">
          <h3>{language?.[lang].footer.socials}</h3>

          <div className="social-links">
            <a href="https://youtube.com/@masallahmix?si=i2dTfNSHcggevLU9" target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://www.tiktok.com/@masallahmix?_r=1&_t=ZS-97OkDwTg6IW" target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>
      </div>

      <div className="copyright">
        {language?.[lang].footer.copyright}
      </div>
    </footer>
  );
};

export default Info;