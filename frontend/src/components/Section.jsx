// src/components/Section.jsx
import React from 'react';

function Section({ children, className = '' }) {
    return (
        <section className={`flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100 ${className}`}>
            {children}
        </section>
    );
}

export default Section;
