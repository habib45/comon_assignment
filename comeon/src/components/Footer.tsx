export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ui inverted vertical footer segment site-footer">
      <div className="ui container">
        <div className="ui stackable divided grid">
          <div className="six wide column">
            <h4 className="ui inverted header">ComeOn</h4>
            <p>
              Curating premium casino experiences with live tournaments,
              exclusive launches, and responsible play guidelines.
            </p>
          </div>
          <div className="five wide column">
            <h4 className="ui inverted header">Explore</h4>
            <div className="ui inverted link list">
              <a className="item">New releases</a>
              <a className="item">Seasonal campaigns</a>
              <a className="item">VIP lounge</a>
            </div>
          </div>
          <div className="five wide column">
            <h4 className="ui inverted header">Need help?</h4>
            <div className="ui inverted link list">
              <a className="item">Support center</a>
              <a className="item">Payment methods</a>
              <a className="item">Responsible gaming</a>
            </div>
          </div>
        </div>
        <div className="ui divider"></div>
        <div className="footer-meta">
          <span>© {year} ComeOn Entertainment</span>
          <div className="footer-social">
            <i className="facebook f icon" aria-hidden="true"></i>
            <i className="instagram icon" aria-hidden="true"></i>
            <i className="twitter icon" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
