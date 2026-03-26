import React from 'react';

const StructuredData = () => {
    const primaryUrl = 'https://www.ronenamoscpa.co.il';

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
            'https://www.facebook.com/AmosFinancialServices',
            'https://www.instagram.com/ronen_financial_services/',
            'https://www.wikidata.org/wiki/Q138751503',
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
        telephone: '+972-50-5500344',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Tzvi 8',
            addressLocality: 'Ramat Gan',
            addressCountry: 'IL',
        },
    };

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'AccountingService'],
        name: 'רונן עמוס - שירותי ייעוץ פיננסי וטכנולוגי',
        image: `${primaryUrl}/og-image.png`,
        '@id': primaryUrl,
        url: primaryUrl,
        description: 'שירותי ייעוץ פיננסי וטכנולוגי לחברות וארגונים, כולל הכשרות Power BI ו-AI, אוטומציה פיננסית ויישום ERP.',
        telephone: '+972-50-5500344',
        email: 'finance@amosbudget.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'צבי 8',
            addressLocality: 'רמת גן',
            postalCode: '5252006',
            addressRegion: 'תל אביב',
            addressCountry: 'IL',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 32.0842,
            longitude: 34.8124,
        },
        hasMap: 'https://maps.google.com/?q=צבי+8,+רמת+גן,+ישראל',
        areaServed: [
            { '@type': 'Country', name: 'Israel' },
            { '@type': 'City', name: 'תל אביב' },
            { '@type': 'City', name: 'רמת גן' },
            { '@type': 'City', name: 'ירושלים' },
        ],
        sameAs: [
            'https://www.linkedin.com/in/ronenamoscpa/',
            'https://www.youtube.com/@AIFinanceTransformation',
            'https://www.facebook.com/AmosFinancialServices',
            'https://www.instagram.com/ronen_financial_services/',
            'https://www.wikidata.org/wiki/Q138751503',
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
        currenciesAccepted: 'ILS',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer',
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
