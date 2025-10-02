// SkinCare.js - Enhanced
import React from 'react';
import './SkinCare.css';

const SkinCare = () => {
    const tips = [
        'Always wear sunscreen with an SPF of 30 or higher, even on cloudy days.',
        'Moisturize your skin daily to maintain hydration and skin barrier function.',
        'Avoid tanning beds and sunlamps which emit harmful UV radiation.',
        'Check your skin regularly for any new or changing spots using the ABCDE rule.',
        'Eat a healthy diet rich in antioxidants, vitamins, and omega-3 fatty acids.',
        'Stay hydrated by drinking at least 8 glasses of water daily.',
        'Use gentle, fragrance-free skincare products suitable for your skin type.',
        'Get regular professional skin examinations annually.'
    ];

    const products = [
        { name: 'CeraVe Hydrating Facial Cleanser', link: '#', icon: '🧴' },
        { name: 'La Roche-Posay Anthelios Melt-in-Milk Sunscreen SPF 60', link: '#', icon: '☀️' },
        { name: 'The Ordinary Niacinamide 10% + Zinc 1%', link: '#', icon: '💧' },
        { name: 'Cetaphil Moisturizing Cream', link: '#', icon: '🌟' },
        { name: 'EltaMD UV Clear Broad-Spectrum SPF 46', link: '#', icon: '🛡️' },
        { name: 'Paula\'s Choice Skin Perfecting 2% BHA Liquid Exfoliant', link: '#', icon: '🌿' }
    ];

    return (
        <div className="skin-care">
            <h1>Skin Care Guide</h1>
            <p style={{textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem'}}>
                Professional skincare tips and product recommendations for healthy skin
            </p>
            
            <section>
                <h2>Essential Skin Care Tips</h2>
                <div className="tips-grid">
                    {tips.map((tip, index) => (
                        <div key={index} className="tip-card">
                            <p>{tip}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Recommended Products</h2>
                <div className="products-grid">
                    {products.map((product, index) => (
                        <div key={index} className="product-card">
                            <div className="product-icon">{product.icon}</div>
                            <div>
                                <a href={product.link} target="_blank" rel="noopener noreferrer">
                                    {product.name}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div style={{
                marginTop: '3rem',
                padding: '2rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--border-radius)',
                textAlign: 'center'
            }}>
                <p style={{margin: 0, color: 'var(--text-secondary)'}}>
                    <strong>Note:</strong> Always patch test new products and consult with a dermatologist for personalized skincare advice.
                </p>
            </div>
        </div>
    );
};

export default SkinCare;