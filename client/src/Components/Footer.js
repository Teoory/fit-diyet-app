import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="ft-top">
                <div className="ft-top-tx">
                    <div>
                        <Link to="/" className="ft-href">Ana Sayfa</Link>
                        <Link to="/settings" className="ft-href">Ayarlar</Link>
                        <a href='mailto:kkslab.info@gmail.com' className="ft-href">İletişim</a>
                    </div>
                </div>
                <div className="ft-bot-tx">
                    <a>
                        <a target="_blank" href="https://www.linkedin.com/in/berkay-koksal/" rel="nofollow"><span>KKSLAB tarafından geliştirilmiştir.</span></a>
                        <br />
                        <a target="_blank" href="/privacy" rel="nofollow"><span>© 2024 Sitemizin tüm hakları gizlidir.</span></a>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;