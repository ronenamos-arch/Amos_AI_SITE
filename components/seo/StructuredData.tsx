import React from 'react';

const StructuredData = () => {
    const primaryUrl = 'https://amos-ai-site.vercel.app';

    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'רונן עמוס',
        jobTitle: 'רואה חשבון ויועץ טכנולוגי פיננסי',
        url: primaryUrl,
        sameAs: [
            'https://www.linkedin.com/in/ronen-amos-cpa/', // Example, should be updated if known
        ],
        description: 'רו"ח מוסמך המתמחה בשילוב טכנולוגיה וכספים, AI, Power BI ואוטומציה פיננסית.',
    };

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'רונן עמוס - שירותי ייעוץ פיננסי וטכנולוגי',
        image: `${primaryUrl}/og-image.png`,
        '@id': primaryUrl,
        url: primaryUrl,
        telephone: '', // User can provide
        address: {
            '@type': 'PostalAddress',
            streetAddress: '',
            addressLocality: 'Tel Aviv',
            addressCountry: 'IL',
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
                opens: '09:00',
                closes: '18:00',
            },
        ],
        priceRange: '$$',
    };

    const courseSchema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'AI Mastery for Accountants',
        description: 'קורס מעשי המלמד רואי חשבון ואנשי כספים איך לרתום את כוח ה-AI לעבודה היומיומית.',
        provider: {
            '@type': 'Organization',
            name: 'רונן עמוס',
            sameAs: primaryUrl,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
            />
        </>
    );
};

export default StructuredData;
