export const GALLERY_CONTENT = {
  "weddings": {
    "description": '<div class="headlineOfTextInDescription">Svadobná fotografia — to je viac než len obyčajný obrázok.</div><div class="contentOfTextInDescription"> Je to spomienka na váš výnimočný deň, plná emócií, lásky a radosti. Mojím cieľom je zachytiť prirodzené momenty, nežné dotyky a aj tie najmenšie detaily, ktoré spolu vytvárajú váš jedinečný príbeh.</div> <div class="headlineOfTextInDescription">Ako to prebieha?</div><div class="contentOfTextInDescription">Približne mesiac pred svadbou sa stretneme, aby sme spoločne prešli harmonogram dňa, vaše priania a dôležité momenty, ktoré chcete mať zachytené na fotografiách. Takáto príprava pomáha urobiť svadobný deň pokojnejším a príjemnejším — vy si ho môžete naplno užiť bez zbytočného stresu.</div> <div class="headlineOfTextInDescription">Skvelé odporúčanie — predsvadobné fotenie (tzv. "love story")</div> <div class="contentOfTextInDescription">Počas tejto krátkej a uvoľnenej fotenia zažijete, ako prebieha spolupráca so mnou, a zároveň vzniknú krásne fotografie, ktoré môžete použiť na svadbe — v oznámeniach, výzdobe alebo ako prezentáciu. Po fotení si spolu sadneme, prejdeme všetky detaily, vaše očakávania a doladíme harmonogram dňa. Tento zážitok nám pomôže lepšie sa spoznať, čo výrazne znižuje stres počas svadobného dňa — aspoň v tomto smere sa budete cítiť uvoľnenejšie.</div>',
    "tips": [
      '<div class="headlineOfTipInDescription">Pripravte si detaily dopredu.</div> <div class="contentOfTipInDescription">Prstienky, pozvánky, parfum, topánky či svadobnú kyticu si pripravte na jedno miesto. Ušetríme čas a ja ich môžem krásne nafotiť ešte pred obliekaním.</div>',
      '<div class="headlineOfTipInDescription">Zastavte sa.</div><div class="contentOfTipInDescription">Počas dňa si vedome doprajte chvíľku len pre seba. Uvedomte si, že ten deň je o vás dvoch – nie len o programe. Tie najkrajšie momenty vznikajú práve v týchto tichých, úprimných okamihoch.</div>',
      '<div class="headlineOfTipInDescription">Nechajte si viac času na prípravy.</div><div class="contentOfTipInDescription">Ráno vždy letí rýchlejšie, ako sa zdá. Zarezervujte si aspoň o 15–20 minút viac, ako si myslíte, že potrebujete – pre pokoj a pohodu.</div>',
      '<div class="headlineOfTipInDescription">Nebojte sa emócií.</div><div class="contentOfTipInDescription">Plač, smiech, objatia – to všetko tvorí silné a nezabudnuteľné fotografie a zábery. Byť autentický = byť krásny.</div>',
      '<div class="headlineOfTipInDescription">Dôverujte svojmu fotografovi.</div><div class="contentOfTipInDescription">Niektoré pózy alebo miesta môžu na prvý pohľad pôsobiť zvláštne, ale výsledok bude stáť za to. Niekedy ten najnudnejší múr dá najkrajšiu fotku.</div>',
      '<div class="headlineOfTipInDescription">Zlatá hodina je váš priateľ.</div><div class="contentOfTipInDescription">Plánujte párové fotenie na čas pred západom slnka – svetlo bude mäkké, teplé a veľmi lichotivé.</div>',
      '<div class="headlineOfTipInDescription">Majte plán B.</div><div class="contentOfTipInDescription">Ak svadba je vonku, myslite aj na dáždniky, prístrešok alebo alternatívnu lokalitu – aby vás počasie nezaskočilo.</div>',
      '<div class="headlineOfTipInDescription">Foťme aj s hosťami.</div><div class="contentOfTipInDescription">Nezabudnite si vytvoriť zoznam ľudí, s ktorými chcete spoločnú fotku. V svadobnom zhone sa ľahko na niekoho zabudne.</div>'
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