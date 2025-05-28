export const GALLERY_CONTENT = {
  "weddings": {
    "description": "<strong>Svadobná fotografia — to je viac než len obyčajný obrázok.</strong></br> Je to spomienka na váš výnimočný deň, plná emócií, lásky a radosti. Mojím cieľom je zachytiť prirodzené momenty, nežné dotyky a aj tie najmenšie detaily, ktoré spolu vytvárajú váš jedinečný príbeh.</br> <strong>Ako to prebieha?</strong></br> Približne mesiac pred svadbou sa stretneme, aby sme spoločne prešli harmonogram dňa, vaše priania a dôležité momenty, ktoré chcete mať zachytené na fotografiách. Takáto príprava pomáha urobiť svadobný deň pokojnejším a príjemnejším — vy si ho môžete naplno užiť bez zbytočného stresu.</br> <strong>Skvelé odporúčanie — predsvadobné fotenie (tzv. 'love story')</strong></br> Počas tejto krátkej a uvoľnenej fotenia zažijete, ako prebieha spolupráca so mnou, a zároveň vzniknú krásne fotografie, ktoré môžete použiť na svadbe — v oznámeniach, výzdobe alebo ako prezentáciu. Po fotení si spolu sadneme, prejdeme všetky detaily, vaše očakávania a doladíme harmonogram dňa.</br> Tento zážitok nám pomôže lepšie sa spoznať, čo výrazne znižuje stres počas svadobného dňa — aspoň v tomto smere sa budete cítiť uvoľnenejšie.",
    "tips": [
      "<strong>Pripravte si detaily dopredu.</strong></br> Prstienky, pozvánky, parfum, topánky či svadobnú kyticu si pripravte na jedno miesto. Ušetríme čas a ja ich môžem krásne nafotiť ešte pred obliekaním.",
      "<strong>Zastavte sa.</strong></br> Počas dňa si vedome doprajte chvíľku len pre seba. Uvedomte si, že ten deň je o vás dvoch – nie len o programe. Tie najkrajšie momenty vznikajú práve v týchto tichých, úprimných okamihoch.",
      "<strong>Nechajte si viac času na prípravy.</strong></br> Ráno vždy letí rýchlejšie, ako sa zdá. Zarezervujte si aspoň o 15–20 minút viac, ako si myslíte, že potrebujete – pre pokoj a pohodu.",
      "<strong>Nebojte sa emócií.</strong></br> Plač, smiech, objatia – to všetko tvorí silné a nezabudnuteľné fotografie a zábery. Byť autentický = byť krásny.",
      "<strong>Dôverujte svojmu fotografovi.</strong></br> Niektoré pózy alebo miesta môžu na prvý pohľad pôsobiť zvláštne, ale výsledok bude stáť za to. Niekedy ten najnudnejší múr dá najkrajšiu fotku.",
      "<strong>Zlatá hodina je váš priateľ.</strong></br> Plánujte párové fotenie na čas pred západom slnka – svetlo bude mäkké, teplé a veľmi lichotivé.",
      "<strong>Majte plán B.</strong></br> Ak svadba je vonku, myslite aj na dáždniky, prístrešok alebo alternatívnu lokalitu – aby vás počasie nezaskočilo.",
      "<strong>Foťme aj s hosťami.</strong></br> Nezabudnite si vytvoriť zoznam ľudí, s ktorými chcete spoločnú fotku. V svadobnom zhone sa ľahko na niekoho zabudne."
    ]
  },
  "portrait": {
    "description": "",
    "tips": ["", "", ""]
  },
  "love-story": {
    "description": "",
    "tips": ["", "", ""]
  },
  "family": {
    "description": "",
    "tips": ["", "", ""]
  },
  "studio": {
    "description": "",
    "tips": ["", "", ""]
  },
  "pregnancy": {
    "description": "",
    "tips": ["", "", ""]
  },
  "babies": {
    "description": "",
    "tips": ["", "", ""]
  }
} as const;

export type GalleryContentType = keyof typeof GALLERY_CONTENT;