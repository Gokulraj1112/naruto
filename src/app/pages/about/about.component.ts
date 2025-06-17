import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-page">
      <div class="container">
        <!-- Hero Section -->
        <section class="about-hero">
          <div class="hero-content fade-in">
            <h1>About ShopEasy</h1>
            <p class="hero-subtitle">Your Ultimate Destination for Anime Merchandise</p>
          </div>
        </section>

        <!-- Story Section -->
        <section class="story-section">
          <div class="section-content">
            <div class="story-text slide-up">
              <h2>Our Story</h2>
              <p>
                Welcome to ShopEasy [買い物がしやすい], your ultimate destination for exclusive merchandise 
                inspired by the world of anime and the Leaf Village! Our journey began with a simple passion 
                for anime and a desire to bring fans closer to their beloved characters.
              </p>
              <p>
                Founded by dedicated anime enthusiasts, ShopEasy has grown from a small collection of 
                figurines to a comprehensive store featuring high-quality collectibles, action figures, 
                and memorabilia representing your favorite characters, including Naruto Uzumaki, 
                Sasuke Uchiha, Kakashi Hatake, and many more.
              </p>
              <p>
                At ShopEasy, we believe that every fan deserves access to authentic, high-quality 
                merchandise that celebrates their favorite anime series. We carefully curate our 
                product line to ensure that each item meets our standards of excellence and authenticity.
              </p>
            </div>
            <div class="story-image slide-up">
              <img src="https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg" alt="Our Story">
            </div>
          </div>
        </section>

        <!-- Values Section -->
        <section class="values-section">
          <h2>Our Values</h2>
          <div class="values-grid">
            <div class="value-card slide-up">
              <div class="value-icon">
                <i class="fas fa-heart"></i>
              </div>
              <h3>Passion</h3>
              <p>We're driven by our love for anime and commitment to serving the fan community with authentic merchandise.</p>
            </div>
            <div class="value-card slide-up">
              <div class="value-icon">
                <i class="fas fa-gem"></i>
              </div>
              <h3>Quality</h3>
              <p>Every product in our store is carefully selected for its craftsmanship, authenticity, and attention to detail.</p>
            </div>
            <div class="value-card slide-up">
              <div class="value-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>Community</h3>
              <p>We're more than a store - we're a community of fans who share the same passion for anime culture.</p>
            </div>
            <div class="value-card slide-up">
              <div class="value-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3>Trust</h3>
              <p>We build lasting relationships with our customers through transparency, reliability, and exceptional service.</p>
            </div>
          </div>
        </section>

        <!-- Mission Section -->
        <section class="mission-section">
          <div class="section-content">
            <div class="mission-image slide-up">
              <img src="https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg" alt="Our Mission">
            </div>
            <div class="mission-text slide-up">
              <h2>Our Mission</h2>
              <p>
                Our mission is to bridge the gap between anime fans and the merchandise they love. 
                We strive to offer a curated selection of high-quality products at affordable prices, 
                making it easy for fans to express their passion and connect with their favorite characters.
              </p>
              <p>
                Whether you're a long-time collector, a casual fan, or shopping for the perfect gift, 
                our store has something special for everyone. We're committed to providing an exceptional 
                shopping experience that celebrates the spirit of anime culture.
              </p>
              <div class="mission-stats">
                <div class="stat">
                  <span class="stat-number">10,000+</span>
                  <span class="stat-label">Happy Customers</span>
                </div>
                <div class="stat">
                  <span class="stat-number">500+</span>
                  <span class="stat-label">Products</span>
                </div>
                <div class="stat">
                  <span class="stat-number">50+</span>
                  <span class="stat-label">Anime Series</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Team Section -->
        <section class="team-section">
          <h2>Meet Our Team</h2>
          <div class="team-grid">
            <div class="team-member slide-up">
              <div class="member-image">
                <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg" alt="Team Member">
              </div>
              <h3>Naruto Uzumaki</h3>
              <p class="member-role">Founder & CEO</p>
              <p>Passionate anime fan with a dream to make quality merchandise accessible to everyone.</p>
            </div>
            <div class="team-member slide-up">
              <div class="member-image">
                <img src="https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg" alt="Team Member">
              </div>
              <h3>Sasuke Uchiha</h3>
              <p class="member-role">Product Manager</p>
              <p>Expert in anime merchandise with an eye for authentic and high-quality collectibles.</p>
            </div>
            <div class="team-member slide-up">
              <div class="member-image">
                <img src="https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg" alt="Team Member">
              </div>
              <h3>Kakashi Hatake</h3>
              <p class="member-role">Customer Experience</p>
              <p>Dedicated to ensuring every customer has an exceptional shopping experience.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      padding: 2rem 0;
    }

    .about-hero {
      text-align: center;
      padding: 4rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin-bottom: 4rem;
    }

    .hero-content h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      opacity: 0.9;
    }

    .story-section,
    .mission-section {
      margin-bottom: 4rem;
    }

    .section-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .story-text h2,
    .mission-text h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #374151;
      margin-bottom: 1.5rem;
    }

    .story-text p,
    .mission-text p {
      color: #6b7280;
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }

    .story-image img,
    .mission-image img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .values-section {
      background: #f9fafb;
      padding: 4rem 0;
      margin: 4rem 0;
      border-radius: 20px;
    }

    .values-section h2 {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 700;
      color: #374151;
      margin-bottom: 3rem;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .value-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    .value-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .value-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
    }

    .value-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 1rem;
    }

    .value-card p {
      color: #6b7280;
      line-height: 1.6;
    }

    .mission-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-top: 2rem;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #6b7280;
      font-weight: 500;
    }

    .team-section {
      margin: 4rem 0;
    }

    .team-section h2 {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 700;
      color: #374151;
      margin-bottom: 3rem;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .team-member {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    .team-member:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .member-image {
      width: 120px;
      height: 120px;
      margin: 0 auto 1.5rem;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid #667eea;
    }

    .member-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .team-member h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .member-role {
      color: #667eea;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .team-member p:last-child {
      color: #6b7280;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2rem;
      }
      
      .section-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .mission-stats {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .values-grid,
      .team-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {}