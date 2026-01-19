'use client';
import React from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className='py-16 px-4 bg-background'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16 animate-fadeInUp'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-foreground'>
            Get In Touch
          </h2>
          <p className='text-lg text-foreground/70'>
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 mx-auto'>
          <div
            className='bg-card card-elegant p-6 text-center animate-fadeInUp rounded-xl '
            style={{ animationDelay: '0.1s' }}
          >
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <Mail className='w-6 h-6 text-primary' />
            </div>
            <h3 className='text-foreground font-semibold mb-2'>Email</h3>
            <p className='text-foreground/70 text-sm'>
              kumarharsh.connect@gmail.com
            </p>
          </div>
          <div
            className='bg-card card-elegant  p-6 text-center animate-fadeInUp rounded-xl '
            style={{ animationDelay: '0.1s' }}
          >
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <Phone className='w-6 h-6 text-primary' />
            </div>
            <h3 className='text-foreground font-semibold mb-2'>Phone</h3>
            <p className='text-foreground/70 text-sm'>(+91) 9718823390</p>
          </div>
          <div
            className='bg-card card-elegant  p-6 text-center animate-fadeInUp rounded-xl '
            style={{ animationDelay: '0.1s' }}
          >
            <div className='w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <MapPin className='w-6 h-6 text-primary' />
            </div>
            <h3 className='text-foreground font-semibold mb-2'>Location</h3>
            <p className='text-foreground/70 text-sm'>Delhi, India</p>
          </div>
        </div>

        {/* CONTACT FORM – Premium Voyana UI */}
        <div
          className='relative mx-auto rounded-3xl p-12 md:p-16 
  bg-white/40 backdrop-blur-2xl 
  border border-white/30 
  shadow-[0px_20px_60px_rgba(0,0,0,0.06)] 
  animate-fadeInUp'
        >
          {/* Soft top glow accent */}
          <div
            className='absolute inset-x-0 top-0 h-1 
    bg-linear-to-r from-primary/50 via-secondary/50 to-primary/50 
    rounded-t-3xl'
          />

          {/* FORM */}
          <form onSubmit={handleSubmit} className='space-y-10'>
            {/* NAME & EMAIL ROW */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* NAME */}
              <div className='group relative'>
                <label className='text-sm text-foreground/70 font-medium mb-2 block'>
                  Full Name
                </label>

                <input
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your full name'
                  required
                  className='w-full px-5 py-4
                              rounded-xl
                              bg-white/70 
                              border border-border/60
                              text-foreground
                              shadow-sm
                              focus:border-primary/50
                              focus:ring-4 focus:ring-primary/20
                              outline-none
                              transition-all duration-300'
                />
              </div>

              {/* EMAIL */}
              <div className='group relative'>
                <label className='text-sm text-foreground/70 font-medium mb-2 block'>
                  Email Address
                </label>

                <input
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='you@example.com'
                  required
                  className='w-full px-5 py-4
          rounded-xl
          bg-white/70 
          border border-border/60
          text-foreground
          shadow-sm
          focus:border-primary/50
          focus:ring-4 focus:ring-primary/20
          outline-none
          transition-all duration-300'
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div className='group relative'>
              <label className='text-sm text-foreground/70 font-medium mb-2 block'>
                Message
              </label>

              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                placeholder='Tell us how we can help...'
                required
                rows={6}
                className='w-full px-5 py-4
        rounded-xl
        bg-white/70 
        border border-border/60
        text-foreground
        shadow-sm
        resize-none
        focus:border-primary/50
        focus:ring-4 focus:ring-primary/20
        outline-none
        transition-all duration-300'
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className='pt-2 flex justify-center'>
              <button
                type='submit'
                className='px-12 py-4 rounded-xl
                            bg-linear-to-r from-primary to-secondary
                            text-white font-semibold
                            shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                            hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)]
                            hover:scale-[1.02]
                            active:scale-[0.97]
                            transition-all duration-300 flex items-center gap-3'
              >
                <Send className='w-5 h-5' />
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </div>

            {/* SUCCESS */}
            {submitted && (
              <div
                className='mt-6 p-4 bg-green-50 border border-green-200 
        text-green-700 rounded-xl text-center text-sm font-medium 
        animate-slideInDown'
              >
                ✓ Thanks for reaching out! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
