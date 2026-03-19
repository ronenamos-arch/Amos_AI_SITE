import React from 'react';

const StructuredData = () => {
    const primaryUrl = 'https://amos-ai-site.vercel.app';

    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'רונן עמוס',
        alternateName: 'Ronen Amos',
        jobTitle: 'רואה חשבון ויועץ טכנולוגי פיננסי',
        url: primaryUrl,
        image: `${primaryUrl}/og-image.png`,
        sameAs: [
            'https://www.linkedin.com/in/ronenamoscpa/',
            'https://www.youtube.com/@AIFinanceTransformation',
        ],
        description: 'רו"ח מוסמך המתמחה בשילוב טכנולוגיה וכספים, AI, Power BI ואוטומציה פיננסית.',
        knowsAbout: [
            'AI Finance', 'Power BI', 'Financial Automation', 'ERP Implementation',
            'ASC 606', 'IFRS 15', 'Digital Transformation', 'Financial Reporting',
            'רואה חשבון', 'ייעוץ פיננסי', 'אוטומציה כספית', 'בינה מלאכותית לכספים',
        ],
        hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'רואה חשבון מוסמך (CPA)',
            recognizedBy: { '@type': 'Organization', name: 'לשכת רואי החשבון בישראל' },
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Tel Aviv',
            addressCountry: 'IL',
        },
    };

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'רונן עמוס - שירותי ייעוץ פיננסי וטכנולוגי',
        image: `${primaryUrl}/og-image.png`,
        '@id': primaryUrl,
        url: primaryUrl,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Tel Aviv',
            addressCountry: 'IL',
        },
        areaServed: [
            { '@type': 'Country', name: 'Israel' },
        ],
        knowsAbout: [
            'AI Finance Consulting', 'Power BI', 'ERP Implementation',
            'ASC 606 Revenue Recognition', 'IFRS 15', 'Financial Automation',
            'CFO Dashboard', 'Financial Digital Transformation',
        ],
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
                opens: '09:00',
                closes: '18:00',
            },
        ],
        priceRange: '$$',
        founder: { '@type': 'Person', name: 'רונן עמוס', url: primaryUrl },
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'רונן עמוס | רו"ח ויועץ AI פיננסי',
        url: primaryUrl,
        inLanguage: 'he',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${primaryUrl}/blog?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    const courseSchema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'AI Mastery for Accountants',
        description: 'קורס מעשי המלמד רואי חשבון ואנשי כספים איך לרתום את כוח ה-AI לעבודה היומיומית.',
        provider: {
            '@type': 'Organization',
            name: 'רונן עמוס',
            url: primaryUrl,
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
};

export default StructuredData;
