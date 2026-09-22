/**
 * Central SmartBee payment configuration for ronenamoscpa.co.il
 * Replaces PayPal with SmartBee (Max terminal, Bit, credit cards, automatic digital invoices)
 */

export interface SmartBeeProductConfig {
    name: string;
    price: number;
    currency: string;
    url: string;
}

export const SMARTBEE_CONFIG = {
    providerName: "SmartBee (סליקה מקס)",
    trustBadges: {
        security: "סליקה מאובטחת בתקן PCI-DSS",
        paymentMethods: "תשלום בכרטיס אשראי, Bit ו-Max",
        invoicing: "חשבונית מס / קבלה מופקת מיידית במייל כחוק",
    },
    products: {
        notebookMaster: {
            name: "Mastering NotebookLM: קורס מעשי לאנשי פיננסים",
            price: 150,
            currency: "ILS",
            url: "https://smartbee.co.il/public-pages/?redirect-path=pay/6aa9542e3d393becc5dd187a",
        },
        claudeBundle: {
            name: "בנדל הפרומפטים והסוכנים ל-Claude ואקסל",
            price: 150,
            currency: "ILS",
            url: "https://smartbee.co.il/public-pages/?redirect-path=pay/6aa952643d393becc5dd0a75",
        },
        aiFinanceMaster: {
            name: "קורס AI Finance Master המלא",
            price: 599,
            currency: "ILS",
            url: "https://smartbee.co.il/public-pages/?redirect-path=pay/6aa9520a3d393becc5dd04f0",
        },
        aiMastery: {
            name: "AI לכספים: המדריך למתחילים",
            price: 250,
            currency: "ILS",
            url: "https://smartbee.co.il/public-pages/?redirect-path=pay/6aa953f43d393becc5dd175b",
        },
        monthlySubscription: {
            name: "מנוי חודשי AI Finance Pro",
            price: 100,
            currency: "ILS",
            url: "https://smartbee.co.il/public-pages/?redirect-path=pay/6aa952983d393becc5dd0bd1",
        },
        arCommandCenter: {
            name: "חמ״ל ניהול חייבים ותזרים ב-AI (AR Command Center v2.4)",
            price: 99,
            currency: "ILS",
            url: "", // Will be filled once Ronen generates the SmartBee payment page
        },
    },
} as const;
