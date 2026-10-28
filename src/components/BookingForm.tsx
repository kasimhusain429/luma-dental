'use client';

import { useState } from 'react';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok' } | { kind: 'error'; message: string };

const TREATMENTS = [
  { id: 'checkup', label: '🌿 Gentle Check-up' },
  { id: 'whitening', label: '✨ Teeth Whitening' },
  { id: 'aligners', label: '🦷 Clear Aligners' },
  { id: 'implants', label: '💎 Dental Implants' },
  { id: 'consult', label: '💬 Consultation' },
];

const SLOTS = [
  { id: 'morning', icon: '☀️', label: 'Morning (8am–12pm)' },
  { id: 'afternoon', icon: '🌤️', label: 'Afternoon (12pm–4pm)' },
  { id: 'evening', icon: '🌙', label: 'Evening (4pm–7pm)' },
  { id: 'any', icon: '⚡', label: 'Any time' },
];

export default function BookingForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [selectedTreatment, setSelectedTreatment] = useState('checkup');
  const [selectedSlot, setSelectedSlot] = useState('any');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.treatment = selectedTreatment;
    data.slot = selectedSlot;

    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? 'Something went wrong. Please try again.');
      form.reset();
      setStatus({ kind: 'ok' });
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      });
    }
  }

  if (status.kind === 'ok') {
    return (
      <div className="form-done" role="status">
        <div className="done-icon" aria-hidden="true">✓</div>
        <h3>Thank you — breathe easy.</h3>
        <p>
          We’ve received your visit request. Our team will contact you within 2 business hours to confirm a quiet, unhurried time.
        </p>
        <div className="done-perks">
          <span>✓ Zero waiting room lag</span>
          <span>✓ Personalized care plan</span>
          <span>✓ Direct line to your doctor</span>
        </div>
      </div>
    );
  }

  return (
    <form className="booking" onSubmit={onSubmit} noValidate={false}>
      {/* Interactive Treatment Selection */}
      <div className="field">
        <label className="field-label">How can we help you smile?</label>
        <div className="pill-grid" role="radiogroup" aria-label="Select treatment type">
          {TREATMENTS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={selectedTreatment === t.id}
              className={`pill-option ${selectedTreatment === t.id ? 'selected' : ''}`}
              onClick={() => setSelectedTreatment(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Name Input */}
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="e.g. Eleanor Vance"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
        />
      </div>

      {/* Contact Details */}
      <div className="field-row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="eleanor@example.com"
            autoComplete="email"
            maxLength={200}
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 234-5678"
            autoComplete="tel"
            maxLength={40}
          />
        </div>
      </div>
      <p className="hint">Please share at least an email or phone so our coordinator can confirm.</p>

      {/* Interactive Preferred Time Selection */}
      <div className="field">
        <label className="field-label">Preferred arrival time</label>
        <div className="slot-grid" role="radiogroup" aria-label="Select preferred time of day">
          {SLOTS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={selectedSlot === s.id}
              className={`slot-pill ${selectedSlot === s.id ? 'selected' : ''}`}
              onClick={() => setSelectedSlot(s.id)}
            >
              <span className="slot-icon" aria-hidden="true">{s.icon}</span>
              <span className="slot-text">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Optional Note */}
      <div className="field">
        <label htmlFor="message">
          Anything we should know? <span>(dental anxiety, questions, preferences)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="I get nervous at the dentist / I'm interested in sedation / etc."
          maxLength={1000}
        />
      </div>

      {/* Honeypot field for spam prevention */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Submit Button with Animated State */}
      <button className="btn" type="submit" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? (
          <>
            <span className="spinner" aria-hidden="true" />
            <span>Securing your slot…</span>
          </>
        ) : (
          <>
            <span>Request Calm Visit</span>
            <span aria-hidden="true" className="btn-arrow">→</span>
          </>
        )}
      </button>

      {/* Form Error Feedback */}
      <div aria-live="polite" className="form-msg">
        {status.kind === 'error' ? status.message : ''}
      </div>

      {/* Trust & Peace of Mind Highlights */}
      <div className="booking-trust">
        <div className="trust-item">
          <span className="trust-check" aria-hidden="true">✓</span>
          <span>Zero-anxiety guarantee</span>
        </div>
        <div className="trust-item">
          <span className="trust-check" aria-hidden="true">✓</span>
          <span>Free rescheduling anytime</span>
        </div>
        <div className="trust-item">
          <span className="trust-check" aria-hidden="true">✓</span>
          <span>Upfront transparent fee breakdown</span>
        </div>
      </div>
    </form>
  );
}
