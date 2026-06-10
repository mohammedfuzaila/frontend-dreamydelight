export default function HowItWorks() {
  return (
    <section className="hiw-section">
      <div className="container">
        <h2 className="section-title fade-in">How It Works</h2>
        <div className="hiw-grid fade-in stagger-item">
          <div className="hiw-step stagger-item">
            <div className="hiw-number">1</div>
            <i className="hiw-icon fas fa-shopping-basket"></i>
            <h3 className="hiw-title">Browse Products</h3>
            <p className="hiw-desc">
              Explore our wide variety of cakes, brownies, kunafa, and chocolates.
            </p>
          </div>

          <div className="hiw-step stagger-item">
            <div className="hiw-number">2</div>
            <i className="hiw-icon fab fa-whatsapp"></i>
            <h3 className="hiw-title">Order via WhatsApp / Insta</h3>
            <p className="hiw-desc">
              Click the button on any product to send your order details directly to us.
            </p>
          </div>

          <div className="hiw-step stagger-item">
            <div className="hiw-number">3</div>
            <i className="hiw-icon fas fa-gift"></i>
            <h3 className="hiw-title">Receive Fresh Delivery</h3>
            <p className="hiw-desc">
              We bake it fresh with love and deliver it straight to your doorstep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
