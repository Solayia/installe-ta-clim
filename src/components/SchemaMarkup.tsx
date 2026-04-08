export function HomePageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: "Installe ta Clim",
        description:
          "Achetez votre climatisation et installez-la vous-meme ou faites installer par nos experts certifies RGE. Devis gratuit en 2 minutes.",
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
                name: "Pack Essentiel - Climatisation pret a poser",
                description: "Climatisation mono-split entree de gamme, jusqu'a 20 m2",
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
                name: "Pack Confort+ - Climatisation pret a poser",
                description:
                  "Climatisation mono-split rapport qualite-prix, jusqu'a 35 m2, WiFi integre",
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
                name: "Pack Premium - Climatisation pret a poser",
                description:
                  "Climatisation mono-split haut de gamme, jusqu'a 50 m2, purificateur integre",
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
            name: "C'est complique d'installer une clim soi-meme ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pas du tout. Nos packs pret a poser sont concus pour etre installes sans connaissances particulieres. Vous recevez un guide pas a pas, des tutoriels video, et notre equipe est joignable par telephone.",
            },
          },
          {
            "@type": "Question",
            name: "Combien de temps faut-il pour recevoir un devis ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Moins de 48h. Vous remplissez un formulaire en 2 minutes, et on vous envoie une estimation claire et detaillee.",
            },
          },
          {
            "@type": "Question",
            name: "Vos prix sont-ils vraiment moins chers ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Oui, en moyenne 30 a 40% moins chers qu'un devis artisan classique. En simplifiant le parcours et en reduisant les intermediaires.",
            },
          },
          {
            "@type": "Question",
            name: "Est-ce que je dois poser une journee pour la visite technique ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Non. On fait tout a distance : un echange en visio de 15 minutes suffit pour valider les details techniques. Vous pouvez le faire le soir apres le travail.",
            },
          },
          {
            "@type": "Question",
            name: "Les produits sont-ils de qualite ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolument. On ne travaille qu'avec des marques reconnues et nos installateurs sont certifies RGE QualiPAC. Chaque installation est garantie minimum 5 ans.",
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
