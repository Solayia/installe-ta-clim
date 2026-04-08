export function HomePageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: "Installe ta Clim",
        description:
          "Achetez votre climatisation et installez-la vous-même ou faites installer par nos experts certifiés RGE. Devis gratuit en 2 minutes.",
        url: "https://installetaclim.fr",
        telephone: "+33100000000",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Toulouse",
          addressRegion: "Occitanie",
          addressCountry: "FR",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "200",
          bestRating: "5",
        },
        priceRange: "EUR EUR EUR",
        areaServed: {
          "@type": "Country",
          name: "France",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Climatisations",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Pack Essentiel - Climatisation prêt à poser",
                description: "Climatisation mono-split entrée de gamme, jusqu'à 20 m²",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "699",
                priceCurrency: "EUR",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Pack Confort+ - Climatisation prêt à poser",
                description:
                  "Climatisation mono-split rapport qualité-prix, jusqu'à 35 m², WiFi intégré",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "999",
                priceCurrency: "EUR",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Pack Premium - Climatisation prêt à poser",
                description:
                  "Climatisation mono-split haut de gamme, jusqu'à 50 m², purificateur intégré",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "1499",
                priceCurrency: "EUR",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        name: "Installe ta Clim",
        url: "https://installetaclim.fr",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "C'est compliqué d'installer une clim soi-même ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pas du tout. Nos packs prêt à poser sont conçus pour être installés sans connaissances particulières. Vous recevez un guide pas à pas, des tutoriels vidéo, et notre équipe est joignable par téléphone.",
            },
          },
          {
            "@type": "Question",
            name: "Combien de temps faut-il pour recevoir un devis ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Moins de 48h. Vous remplissez un formulaire en 2 minutes, et on vous envoie une estimation claire et détaillée.",
            },
          },
          {
            "@type": "Question",
            name: "Vos prix sont-ils vraiment moins chers ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Oui, en moyenne 30 à 40% moins chers qu'un devis artisan classique. En simplifiant le parcours et en réduisant les intermédiaires.",
            },
          },
          {
            "@type": "Question",
            name: "Est-ce que je dois poser une journée pour la visite technique ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Non. On fait tout à distance : un échange en visio de 15 minutes suffit pour valider les détails techniques. Vous pouvez le faire le soir après le travail.",
            },
          },
          {
            "@type": "Question",
            name: "Les produits sont-ils de qualité ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolument. On ne travaille qu'avec des marques reconnues et nos installateurs sont certifiés RGE QualiPAC. Chaque installation est garantie minimum 5 ans.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Installe ta Clim",
    description:
      "Guides, conseils et astuces pour bien choisir, installer et entretenir votre climatisation.",
    url: "https://installetaclim.fr/blog",
    publisher: {
      "@type": "Organization",
      name: "Installe ta Clim",
      url: "https://installetaclim.fr",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
