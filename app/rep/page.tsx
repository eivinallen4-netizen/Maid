'use client';

import { useState, useEffect } from 'react';

export default function RepPage() {
  const [step, setStep] = useState(1);
  const [bedrooms, setBedrooms] = useState('1bed');
  const [fullBaths, setFullBaths] = useState('1');
  const [halfBaths, setHalfBaths] = useState('0');
  const [extraTime, setExtraTime] = useState('no');
  const [serviceType, setServiceType] = useState('standard');
  const [repName, setRepName] = useState('');
  const [repEmail, setRepEmail] = useState('');
  const [repPhone, setRepPhone] = useState('');
  const [repAddress, setRepAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('repFormState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setStep(state.step || 1);
        setBedrooms(state.bedrooms || '1bed');
        setFullBaths(state.fullBaths || '1');
        setHalfBaths(state.halfBaths || '0');
        setExtraTime(state.extraTime || 'no');
        setServiceType(state.serviceType || 'standard');
        setRepName(state.repName || '');
        setRepEmail(state.repEmail || '');
        setRepPhone(state.repPhone || '');
        setRepAddress(state.repAddress || '');
      } catch (e) {
        console.error('Failed to restore form state');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repFormState', JSON.stringify({
      step,
      bedrooms,
      fullBaths,
      halfBaths,
      extraTime,
      serviceType,
      repName,
      repEmail,
      repPhone,
      repAddress,
    }));
  }, [step, bedrooms, fullBaths, halfBaths, extraTime, serviceType, repName, repEmail, repPhone, repAddress]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSendQuote = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/send-quote-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: repEmail,
          message: `Home: ${bedrooms}, Service: ${serviceType}`,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      alert(`Quote sent to ${repEmail}`);
      localStorage.removeItem('repFormState');
      setStep(1);
      setBedrooms('1bed');
      setFullBaths('1');
      setHalfBaths('0');
      setExtraTime('no');
      setServiceType('standard');
      setRepName('');
      setRepEmail('');
      setRepPhone('');
      setRepAddress('');
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send quote');
      setLoading(false);
    }
  };

  const getExtraTimeMinutes = () => {
    const timeMap: Record<string, number> = {
      'no': 0,
      '0.5': 30,
      '1': 60,
      '1.5': 90,
      '2': 120,
      '3': 180,
    };
    return timeMap[extraTime] || 0;
  };

  const calculatePricing = () => {
    const servicePrices: Record<string, number> = {
      standard: 150,
      deep: 225,
      moveout: 275,
    };

    const homeSizeSurcharge: Record<string, number> = {
      '1bed': 0,
      '2bed': 0,
      '3bed': 75,
      '4bed': 150,
      '5bed': 225,
      '6bed': 300,
    };

    const extraTimeHourlyRate = 50;

    let basePrice = servicePrices[serviceType] || 150;
    let surcharge = homeSizeSurcharge[bedrooms] || 0;
    let extraTimePrice = 0;

    const extraTimeHours = parseFloat(extraTime === 'no' ? '0' : extraTime);
    if (extraTimeHours > 0) {
      extraTimePrice = extraTimeHours * extraTimeHourlyRate;
    }

    const subtotal = basePrice + surcharge + extraTimePrice;
    const total = Math.max(subtotal, 150); // minimum $150

    return {
      basePrice,
      surcharge,
      extraTimePrice,
      subtotal,
      total,
    };
  };

  const pricing = calculatePricing();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/stripe/checkout-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            name: repName,
            email: repEmail,
            phone: repPhone,
            address: repAddress,
          },
          selections: {
            serviceType,
            homeSize: bedrooms,
            extraTimeMinutes: getExtraTimeMinutes(),
          },
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      if (data.url) {
        localStorage.removeItem('repFormState');
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fb 0%, #fff8f0 100%)', padding: '40px 20px' }}>
      <style>{`
        :root {
          --blue: #1565f2;
          --border: #e5e7eb;
          --neutral-light: #999;
        }

        .rep-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        @media (max-width: 968px) {
          .rep-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .rep-content h1 {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #1565f2 0%, #0d47a1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .rep-content p {
          font-size: 18px;
          line-height: 1.6;
          color: #555;
          margin-bottom: 28px;
        }

        .rep-benefits {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 40px;
        }

        .benefit-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: rgba(21, 101, 242, 0.05);
          border-radius: 12px;
          border-left: 4px solid var(--blue);
        }

        .benefit-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          color: var(--blue);
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .benefit-text h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #1a1a1a;
        }

        .benefit-text p {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        form {
          display: block;
        }

        .form-card {
          background: #fff;
          border-radius: 24px;
          border: 1px solid var(--border);
          box-shadow: 0 8px 32px rgba(21, 101, 242, 0.1);
          overflow: hidden;
        }

        .form-header {
          background: var(--blue);
          padding: 28px 40px;
        }

        .step-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .step-progress {
          font-size: 13px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
        }

        .step-next {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.65);
        }

        .step-indicators {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .step-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: all 0.3s;
        }

        .step-item.active .step-num {
          background: white;
          color: var(--blue);
        }

        .step-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          font-weight: 500;
        }

        .step-item.active .step-label {
          color: white;
          font-weight: 600;
        }

        .step-line {
          width: 24px;
          height: 2px;
          background: rgba(255, 255, 255, 0.2);
          margin: 0 4px;
        }

        .form-content {
          padding: 40px;
        }

        .section-label {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
          display: block;
        }

        .section-label span {
          display: block;
          font-weight: 600;
          color: var(--neutral-light);
          text-transform: none;
          letter-spacing: 0;
          font-size: 12px;
          margin-top: 4px;
        }

        .btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .sel-btn {
          padding: 12px 20px;
          border: 2px solid var(--border);
          background: white;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .sel-btn:hover {
          border-color: var(--blue);
          color: var(--blue);
        }

        .sel-btn.active {
          background: var(--blue);
          color: white;
          border-color: var(--blue);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          margin-bottom: 32px;
        }

        @media (max-width: 512px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        .form-input {
          padding: 12px 16px;
          border: 2px solid var(--border);
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--blue);
        }

        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-actions {
          margin-top: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 20px;
          border: 1px solid #fcc;
        }

        .bk-next-btn {
          padding: 14px 28px;
          background: var(--blue);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          min-width: 160px;
        }

        .bk-next-btn:hover:not(:disabled) {
          background: #0d47a1;
          transform: translateX(4px);
        }

        .bk-next-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .bk-prev-btn {
          padding: 10px 20px;
          background: transparent;
          color: var(--blue);
          border: 2px solid var(--blue);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .bk-prev-btn:hover {
          background: var(--blue);
          color: white;
        }

        .service-desc {
          font-size: 12px;
          color: #666;
          margin-top: 4px;
        }

        .receipt {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 24px;
          border: 1px solid var(--border);
        }

        .receipt-section {
          margin-bottom: 24px;
        }

        .receipt-section:last-child {
          margin-bottom: 0;
        }

        .receipt-header {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid var(--blue);
          padding-bottom: 8px;
        }

        .receipt-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          font-size: 14px;
        }

        .receipt-item-label {
          color: #666;
        }

        .receipt-item-value {
          font-weight: 600;
          color: #1a1a1a;
        }

        .receipt-divider {
          height: 1px;
          background: var(--border);
          margin: 16px 0;
        }

        .receipt-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          font-size: 18px;
          font-weight: 700;
          color: var(--blue);
          background: rgba(21, 101, 242, 0.05);
          padding: 16px;
          border-radius: 8px;
          margin-top: 16px;
        }

        .receipt-total-value {
          font-size: 28px;
        }

        .customer-info {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
        }
      `}</style>

      <div className="rep-container">
        {/* Left Column: Sales Pitch */}
        <div className="rep-content">
          <h1>Mountain Springs Cleaning</h1>
          <p>Professional cleaning service trusted by Las Vegas families. Same team every visit. Always background-checked and fully insured.</p>

          <div className="rep-benefits">
            <div className="benefit-item">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <div className="benefit-text">
                <h3>Same Team Every Time</h3>
                <p>Build trust with the same cleaners who know your home</p>
              </div>
            </div>

            <div className="benefit-item">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <div className="benefit-text">
                <h3>Background-Checked & Insured</h3>
                <p>We vet everyone thoroughly. Your home is always safe</p>
              </div>
            </div>

            <div className="benefit-item">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <div className="benefit-text">
                <h3>Satisfaction Guaranteed</h3>
                <p>Not happy? We'll come back and make it right</p>
              </div>
            </div>

            <div className="benefit-item">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
              </svg>
              <div className="benefit-text">
                <h3>Eco-Friendly Options</h3>
                <p>Green cleaning products safe for kids and pets</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(21, 101, 242, 0.08)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--blue)' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#555', fontWeight: 500 }}>
              <strong>What customers say:</strong><br/>
              "They asked me how I liked the cleaning every time they finished a floor."<br/>
              "I never have to worry about a dirty house again."
            </p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-card">
              <div className="form-header">
                <div className="step-info">
                  <div className="step-progress">Step {step} of 4 · Review & confirm</div>
                  <div className="step-next">
                    {step === 1 && 'Next: Service Type'}
                    {step === 2 && 'Next: Customer Info'}
                    {step === 3 && 'Next: Review & Confirm'}
                    {step === 4 && 'Ready to send or book'}
                  </div>
                </div>

                <div className="step-indicators">
                  <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                    <div className="step-num">1</div>
                    <div className="step-label">Your Home</div>
                  </div>
                  <div className="step-line"></div>

                  <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                    <div className="step-num">2</div>
                    <div className="step-label">Service</div>
                  </div>
                  <div className="step-line"></div>

                  <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
                    <div className="step-num">3</div>
                    <div className="step-label">Info</div>
                  </div>
                  <div className="step-line"></div>

                  <div className={`step-item ${step >= 4 ? 'active' : ''}`}>
                    <div className="step-num">4</div>
                    <div className="step-label">Review</div>
                  </div>
                </div>
              </div>

              <div className="form-content">
                {error && <div className="error-message">{error}</div>}

                {step === 1 && (
                  <>
                    <label className="section-label">How many bedrooms?</label>
                    <div className="btn-row" style={{ marginBottom: '28px' }}>
                      {['1bed', '2bed', '3bed', '4bed', '5bed', '6bed'].map((val) => (
                        <button
                          key={val}
                          type="button"
                          className={`sel-btn ${bedrooms === val ? 'active' : ''}`}
                          onClick={() => setBedrooms(val)}
                        >
                          {val.replace('bed', '')} bed{val !== '1bed' ? 's' : ''}
                        </button>
                      ))}
                    </div>

                    <div className="form-grid">
                      <div>
                        <label className="section-label">Full bathrooms</label>
                        <div className="btn-row">
                          {['1', '2', '3', '4', '5+'].map((val) => (
                            <button
                              key={val}
                              type="button"
                              className={`sel-btn ${fullBaths === val ? 'active' : ''}`}
                              onClick={() => setFullBaths(val)}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="section-label">Half bathrooms</label>
                        <div className="btn-row">
                          {['0', '1', '2', '3+'].map((val) => (
                            <button
                              key={val}
                              type="button"
                              className={`sel-btn ${halfBaths === val ? 'active' : ''}`}
                              onClick={() => setHalfBaths(val)}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <label className="section-label">
                      Need extra time?
                      <span>For larger or heavily cluttered homes</span>
                    </label>
                    <div className="btn-row">
                      {[
                        { val: 'no', label: 'No thanks' },
                        { val: '0.5', label: '+0.5 hr' },
                        { val: '1', label: '+1 hr' },
                        { val: '1.5', label: '+1.5 hr' },
                        { val: '2', label: '+2 hr' },
                        { val: '3', label: '+3 hr' },
                      ].map(({ val, label }) => (
                        <button
                          key={val}
                          type="button"
                          className={`sel-btn ${extraTime === val ? 'active' : ''}`}
                          onClick={() => setExtraTime(val)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <label className="section-label">What service do you need?</label>
                    <div className="btn-row">
                      {[
                        { id: 'standard', label: 'Standard', desc: 'Regular cleaning' },
                        { id: 'deep', label: 'Deep Clean', desc: 'Thorough cleaning' },
                        { id: 'moveout', label: 'Move Out', desc: 'Complete deep clean' },
                      ].map(({ id, label, desc }) => (
                        <button
                          key={id}
                          type="button"
                          className={`sel-btn ${serviceType === id ? 'active' : ''}`}
                          onClick={() => setServiceType(id)}
                          style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                        >
                          <div>{label}</div>
                          <div className="service-desc">{desc}</div>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <label className="section-label">Customer Information</label>
                    <div className="form-input-group">
                      <input
                        type="text"
                        placeholder="Customer name"
                        value={repName}
                        onChange={(e) => setRepName(e.target.value)}
                        className="form-input"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Customer email"
                        value={repEmail}
                        onChange={(e) => setRepEmail(e.target.value)}
                        className="form-input"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={repPhone}
                        onChange={(e) => setRepPhone(e.target.value)}
                        className="form-input"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Service address"
                        value={repAddress}
                        onChange={(e) => setRepAddress(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <label className="section-label">Order Summary</label>
                    <div className="receipt">
                      <div className="receipt-section">
                        <div className="receipt-header">Service Details</div>
                        <div className="receipt-item">
                          <span className="receipt-item-label">Service Type</span>
                          <span className="receipt-item-value">{serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</span>
                        </div>
                        <div className="receipt-item">
                          <span className="receipt-item-label">Home Size</span>
                          <span className="receipt-item-value">{bedrooms.replace('bed', '')} Bedrooms</span>
                        </div>
                        {extraTime !== 'no' && (
                          <div className="receipt-item">
                            <span className="receipt-item-label">Extra Time</span>
                            <span className="receipt-item-value">+{extraTime} hr</span>
                          </div>
                        )}
                      </div>

                      <div className="receipt-divider"></div>

                      <div className="receipt-section">
                        <div className="receipt-header">Pricing</div>
                        <div className="receipt-item">
                          <span className="receipt-item-label">{serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Cleaning</span>
                          <span className="receipt-item-value">${pricing.basePrice.toFixed(2)}</span>
                        </div>
                        {pricing.surcharge > 0 && (
                          <div className="receipt-item">
                            <span className="receipt-item-label">Home Size Surcharge</span>
                            <span className="receipt-item-value">${pricing.surcharge.toFixed(2)}</span>
                          </div>
                        )}
                        {pricing.extraTimePrice > 0 && (
                          <div className="receipt-item">
                            <span className="receipt-item-label">Extra Time (+{extraTime} hr @ $50/hr)</span>
                            <span className="receipt-item-value">${pricing.extraTimePrice.toFixed(2)}</span>
                          </div>
                        )}
                      </div>

                      <div className="receipt-total">
                        <span>Total</span>
                        <span className="receipt-total-value">${pricing.total.toFixed(2)}</span>
                      </div>

                      <div className="receipt-divider"></div>

                      <div className="receipt-section">
                        <div className="receipt-header">Customer Info</div>
                        <div className="customer-info">
                          <strong>{repName}</strong><br/>
                          {repEmail}<br/>
                          {repPhone}<br/>
                          {repAddress && <>{repAddress}</>}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="form-actions">
                  {step > 1 && (
                    <button type="button" className="bk-prev-btn" onClick={handlePrev}>
                      ← Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button type="button" className="bk-next-btn" onClick={handleNext}>
                      Next: {step === 1 ? 'Service Type' : step === 2 ? 'Customer Info' : 'Review'} →
                    </button>
                  ) : (
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        type="button"
                        className="bk-prev-btn"
                        onClick={handleSendQuote}
                        disabled={loading}
                        style={{
                          background: 'transparent',
                          color: 'var(--blue)',
                          border: '2px solid var(--blue)',
                          flex: 1,
                        }}
                      >
                        {loading ? 'Sending...' : 'Send Quote'}
                      </button>
                      <button
                        type="submit"
                        className="bk-next-btn"
                        disabled={loading}
                        style={{ flex: 1 }}
                      >
                        {loading ? 'Processing...' : 'Book & Pay'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
