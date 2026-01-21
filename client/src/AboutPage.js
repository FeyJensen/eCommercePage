import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/footer.jsx';

function AboutPage() {
    return (
        <>
            <div style={{
                width: '100%',
                minWidth: '1000px',
                overflow: 'hidden',
                position: 'relative',
                height: '380px'
            }}>
                <img
                    src="images/AboutUs.png"
                    alt="About Banner"
                    style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        display: 'block',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transform: 'scale(.8)',
                        paddingTop: '2rem'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '1rem',
                    zIndex: 10,
                    padding: '0 1rem'
                }}>
                    <Header />
                </div>
            </div>

            <div style={{ paddingLeft: '8rem', paddingRight: '8rem', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <h1 style={{ color: '#8d6748', marginBottom: '1rem' }}>About Skye Eclisse</h1>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#333' }}>
                    Hi, I'm Fey, an artist and maker based in Portland, Oregon.
                    I create jewelry that's bold, colorful, and deeply inspired
                    by my Mexican roots. My work is shaped by memories of growing
                    up around vibrant textiles, painted ceramics, café con pan, and
                    the joyful chaos of piñatas and family gatherings.
                    <br /><br />
                    Each piece is made by hand, often using clay, and designed to feel like a
                    small celebration you can wear. I love statement jewelry—the kind that
                    sparks conversation, carries emotion, and feels personal rather than
                    mass-produced. My goal is to create pieces that feel playful yet
                    meaningful, blending tradition, nostalgia, and modern design.
                    <br /><br />
                    I started this business during the pandemic as a leap of faith, turning
                    creativity into something tangible and shareable. Thank you for being here
                    and supporting handmade work—it truly means everything.
                </p>
            </div>

            <Footer />
        </>
    );
}

export default AboutPage;