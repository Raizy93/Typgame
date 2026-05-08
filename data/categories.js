'use strict';

/**
 * data/categories.js – SpellingSecurity
 * Gegenereerd vanuit: Woordenlijst per categorie.json
 *
 * Alle 34 categorieën zijn opgenomen. Woorden met accenten (é),
 * trema's (ë/ï/ü), apostrofs (auto's), koppeltekens (auto-export)
 * én spaties ('s avonds) zijn toegestaan. Spelers typen die tekens
 * via de speciale-tekens balk of via hun fysiek toetsenbord.
 *
 * _fw() filtert: a-z/A-Z + é ë ï ü + apostrof + koppelteken + spatie,
 *                minimaal 3 tekens, geen duplicaten
 */

function _fw(list) {
  return [...new Set(list.filter(w =>
    typeof w === 'string' &&
    w.length >= 3 &&
    /^[a-zA-ZéëïüÉËÏÜ'\- ]+$/.test(w)
  ))];
}

const Categories = {

  "Hakwoord": _fw([
    "angel","angst","belangrijk","brengen","dringen","Engeland","gemengd",
    "gevangen","haringen","ingang","jongen","langzaam","lengte","mengsel",
    "opbrengen","opbrengst","ophangen","swingende","tekening","triangel",
    "vergadering","verzekering","voorbereiding","voorganger","voorrang",
    "wringen","zangeres","zwanger"
  ]),

  "Zingwoord": _fw([
    "aandoening","begeleiding","behandeling","bereiding","beschaving",
    "bevolking","beweging","bezichtiging","kleding","koning","koningin",
    "leerling","leiding","lieveling","oefening","oplichting","rekening",
    "reservering","richting","samenstelling","spanning","stemming",
    "uitbreiding","verdieping","vergissing","vergroting","verlichting",
    "verrassing"
  ]),

  "Luchtwoord": _fw([
    "architect","bericht","boerderijwinkel","gedicht","gewicht","gezicht",
    "kachel","kuchen","lachen","lichaam","licht","luchtfoto","luchtreiziger",
    "lunchgerecht","och","pech","recht","techniek","toch","uitzicht",
    "verkeersbericht","verplicht","voorzichtig","vruchtbare","wintervachten",
    "zich"
  ]),

  "Plankwoord": _fw([
    "afhankelijk","anker","banken","bedankt","bedenken","dankbaar","donker",
    "drinken","Frankrijk","inschenken","jonkvrouw","klinker","knikker",
    "koninklijk","linker","linksaf","medeklinker","ondanks","plankenkoorts",
    "rinkelen","springen","stinken","verzonken","Vinkeveen","wankelen",
    "winkels","zwenken"
  ]),

  "Eer-oor-eur-woord": _fw([
    "acteur","amateur","behoorlijk","beoordelen","chauffeur","controleer",
    "couleur","directeur","doorlopen","eekhoorns","eerlijk","eerst","gehoor",
    "inspecteur","interieur","kantoor","kleur","Noorwegen","ongehoord",
    "schoorsteen","sleur","voornamelijk","voorrang","voorstelling",
    "waterleiding","weersverwachting"
  ]),

  "Aai-ooi-oei-woord": _fw([
    "aai","bemoeial","bemoeien","boeien","dooier","gloeien","groeien","haai",
    "hooikoorts","knoeien","kraai","lawaai","loeiend","moeizaam","mooi",
    "ooievaar","prooi","roeien","saai","snoeien","sproeien","taai",
    "toernooi","vloeiend"
  ]),

  "Eeuw-ieuw-woord": _fw([
    "eeuwen","kieuwen","leeuw","leeuwen","nieuwbouwwijk","nieuwe",
    "nieuweling","nieuwjaarsdag","nieuwkoop","nieuws","nieuwsgierig",
    "nieuwsgierigheid","opnieuw","schreeuwde","schreeuwen","schreeuwerig",
    "sneeuw","sneeuwballen","sneeuwklokjes","sneeuwstorm","spreeuwen",
    "vernieuwen","vernieuwing","Zeeuws"
  ]),

  "Langmaakwoord": _fw([
    "deodorant","dominant","experiment","journalist","logopedist","loket",
    "machinist","muzikant","Nederland","ochtend","ontzettend","piloot",
    "platteland","procent","project","raadsel","rapport","spannend",
    "sprankelend","standaard","tandarts","uitstekend","vanavond","verkeerd",
    "vermoedelijk","woedend","Zeeland","zeldzaam"
  ]),

  "Voorvoegsel": _fw([
    "bedanken","begeleider","begrijpen","behalen","behoorlijk",
    "bekeuringen","beloning","beroemd","beschrijven","bespreken",
    "bestemming","bevestigen","beweging","bezitten","gebied","gebruiken",
    "geduldig","geleidelijk","gemeente","gereedschap","geschiedenis",
    "gevangenis","gewoon","ontdekken","onthouden","ontmoeten","ontsnappen",
    "veranderen","verbazen","verdedigen","verduidelijken","vergadering",
    "verhalen","verhouding","verlichting","verminderen","vermoeden",
    "verrassen","verslag","verzorgen"
  ]),

  "Klankgroepenwoord": _fw([
    "bananen","beginnen","boter","getallen","gewone","jager","kamer",
    "kanonnen","kapotte","limonade","meter","minuten","moderne","muzikaal",
    "notulen","pakket","papieren","piloten","raketten","salade","sigaren",
    "telefoneren","tomaten","vitamine"
  ]),

  "Verkleinwoord": _fw([
    "aardappelslaatje","afbeeldinkje","agendaatje","armpje","autootje",
    "ballonnetje","bedankje","beeldje","beestje","belletje","beloninkje",
    "berichtje","beweginkje","bloemetje","bodempje","bolletjes","bommetje",
    "boterhammetje","botjes","brilletje","broodje","bruggetje","bureautje",
    "cadeautje","cameraatje","celletje","cellootje","chipje","chocolaatje",
    "cijfertje","cirkeltje","citroenschijfje","collegaatje","concertje",
    "dingetje","eekhoorntjesbrood","eendje","eentje","eitje","elastiekje",
    "erwtjes","Eskimootje","eurootje","extraatje","filmpje","fonteintje",
    "fotootje","gangetje","gebakje","gedichtje","gerechtje","gezinnetje",
    "gorillaatje","harinkje","hartje","hellinkje","helmpje","heuveltje",
    "hobootje","hotelletje","hyenaatje","iglootje","ijsje","jongetje",
    "kalfje","kameleonnetje","kanootje","karretjes","karweitje","kassaatje",
    "kettinkje","kilootje","kindje","kippetje","kleurtje","kommaatje",
    "kommetje","kraantje","krakelingetje","kringetje","kwaleltjes",
    "kwartiertje","laatje","lamaatje","lammetjes","leeuwtje","lichtje",
    "liedje","lieveheersbeestjes","logootje","manchetknoopje","mangootje",
    "mannetje","meelwormpjes","meisje","menuutje","mobieltje","museumpje",
    "naampje","nieuwtje","ommetje","onderdeeltje","optochtje","pandaatje",
    "papiertje","paprikaatje","parapluutje","partijtje","peutertje",
    "pianootje","pindaatje","pleistertje","podiumpje","poppetje","portretje",
    "prieeltje","prooitje","puddinkje","pyjamaatje","radiootje",
    "restaurantje","retourtje","rijmpje","rillinkje","ringetje","riviertje",
    "schelpje","schemaatje","schilderijtje","schuttinkje","servetje",
    "slaatje","slabbetje","slangetje","sleuteltje","sluitinkjes",
    "sneeuwklokjes","speculaasje","spinnetjes","spionnetje","spreeuwtje",
    "sprintje","sprongetje","stadje","stationnetje","stemmetjes","sterretje",
    "stormpje","tabletje","tangetje","tapijtje","tartaartje","telefoontje",
    "terrasje","theatertje","theeblaadjes","touwtjes","trommeltje",
    "vergissinkje","verrassinkje","verwarminkje","vlaggetje","vlooitje",
    "vriendinnetje","vriendje","vrouwtje","wandelingetje","weggetje",
    "winterkoninkje","woninkje","woordjes","wormpje","yoghurtijsje","zalfje",
    "zebraatje","zomerkoninkjes","zonnetje","zwijntje"
  ]),

  "Achtervoegsel": _fw([
    "aankondigen","aanmoedigen","aannemelijk","aantrekkelijk","adellijke",
    "afgrijselijk","afschuwelijk","afstandelijk","akelig","angstig",
    "avontuurlijk","behoorlijk","belachelijk","bergachtig","besmettelijk",
    "bevestigen","bezichtigen","bezuinigen","dagelijks","doorzichtig",
    "draaierig","drassig","driftig","droevig","dromerig","duizelig",
    "eerlijk","eeuwig","eigenaardig","eigenlijk","eindelijk","eindigen",
    "erbarmelijk","fatsoenlijk","feestelijk","feitelijk","figuurlijk",
    "fleurige","geduldig","geestig","geldig","gelukkig","gemakkelijk",
    "gemakkelijker","gemeenschappelijk","geneeskrachtig","geniepig",
    "gevaarlijk","gevoelig","geweldig","gewichtig","gezellige","giftig",
    "glibberig","grappig","griezelig","grondig","gruwelijk","gunstig",
    "handig","harig","hartelijk","hebberig","heerlijke","heilig",
    "heldhaftig","hevig","hongerig","hoogmoedig","hoogwaardig","huiselijk",
    "huishoudelijk","humeurig","huwelijk","ijverig","jaarlijks","jeugdig",
    "keurig","klaaglijk","kleverig","knapperig","koninklijk","koppig",
    "krachtig","krakkemikkig","kundig","kunstig","kwalijk","landelijk",
    "lastig","lelijk","levendig","lollig","luchtig","luidruchtig",
    "maatschappelijk","machtig","makkelijk","menselijk","misselijk",
    "moeilijk","natuurlijk","nauwelijks","nauwkeurig","nieuwsgierig",
    "noordelijk","nuttig","onafhankelijk","onmiddellijk","onstuimig",
    "onvermijdelijke","oostelijk","openlijk","partijdig","pijnlijk",
    "pijnlijke","pittig","plechtig","plezierig","prachtige","raadselachtig",
    "regelmatig","rijkelijk","roestig","rumoerig","scheikundige","schemerig",
    "schreeuwerig","slaperig","slordig","smakelijke","smerig","spoedig",
    "statig","stedelijk","stoffig","tamelijk","tegenwoordige","tijdelijk",
    "toegankelijk","twintig","uiterlijk","uitnodigen","vakkundig","veilig",
    "verantwoordelijk","verdediger","verduidelijken","vereeuwigen",
    "verkondigen","vermakkelijk","vernietigen","verrukkelijk",
    "verschrikkelijk","vervaardigen","vierentwintig","vijandig","vlijtig",
    "volledig","voorzichtig","vorige","vreselijk","vriendelijk","vrolijke",
    "waardig","waarschijnlijk","wantrouwig","weemoedig","weinig","wekelijks",
    "werkelijk","westelijk","willekeurig","wollig","wonderlijk","zakelijk",
    "zalig","zenuwachtig","zestiger","zonnig","zorgvuldig","zuidelijk",
    "zuinig"
  ]),

  "Kilowoord": _fw([
    "abrikozen","activiteit","actrice","affiche","affiches","afhaalchinees",
    "Afrika","Amerika","Amerikaanse","Antarctica","antilopen","arriveren",
    "artikel","assistent","assortiment","auditie","Aziatisch","baviaan",
    "benzine","bespioneren","bibliotheek","bikini","biologisch","bizarre",
    "bizons","carnivoren","cavia","centiliter","centimeter","China","Chinese",
    "chirurg","citroen","citroenen","collegiaal","combinatie","commercieel",
    "competitie","compliment","conditie","Constantinopel","continent",
    "definitief","dia","diagonaal","diamant","diameter","dictatoriaal",
    "dieet","digitale","dinosaurus","diploma","directeur","dirigent",
    "dirigeren","divan","diverse","Dolfinarium","emigrant","emotioneel",
    "epicentrum","Eskimo","essentieel","etiket","expeditie","experiment",
    "expositie","fabrikant","familie","februari","feliciteren","festival",
    "figuur","file","filiaal","finaal","finale","financieel","geniaal",
    "gigantisch","giraf","gitaar","grandioos","helikopter","horizon",
    "horizontaal","hybride","ideaal","idee","idem","idool","iglo","illegaal",
    "illustratie","illustrator","imitatie","imiteren","immigrant","imperiaal",
    "improviseren","indianen","individueel","industrieel","inspiratie",
    "inspireren","internationaal","invalide","Irakees","iris","irritant",
    "irriteren","Italianen","ivoor","januari","joviaal","jubileum","juli",
    "juni","kabinet","kampioen","kandidaat","kantine","kapitein","kariboe",
    "kilo","kilogram","kilometer","kiosk","kiwi","klarinet","klimaat",
    "kliniek","koloniaal","krioelen","kritiek","kritisch","kwaliteit",
    "lampion","lawine","ledikant","liaan","lianen","libel","lila","limiet",
    "limoenen","limonade","liniaal","liter","loempia","lotion","lucifer",
    "macaroni","machine","machinist","marine","materiaal","Maxima",
    "maximaal","maximum","media","medicijn","medicijnen","meditatie",
    "mediteren","microfoon","microscoop","millimeter","mini","minimaal",
    "minimum","minister","minuut","mitella","modieus","munitie","muzikaal",
    "muzikant","nasi","nationaal","Nina","niveau","notitie","officieel",
    "officier","olifant","optimist","organiseren","pagina","paprika",
    "Patricia","piano","piloot","pion","piraat","piraterij","piste",
    "pistool","podium","politie","politiek","positie","positief","president",
    "prieel","prima","principieel","radio","regionaal","rekenmachine",
    "religie","repetitie","riolering","riool","risico","ritueel","rivaal",
    "rivier","safari","schorpioen","serieus","sigaar","silo","sinaasappel",
    "sinaasappels","sinas","sirene","siroop","situatie","ski","sociaal",
    "souvenir","souvenirwinkel","speciaal","speciaals","speciale","spinazie",
    "spion","spiraal","stadion","station","stoommachine","studio","Suriname",
    "tapir","televisie","territorium","Tine","titel","tosti","traditie",
    "traditioneel","trampoline","transpireren","triangel","tribune","trio",
    "turbine","uniform","universum","urine","variatie","via","viaduct",
    "video","Vikingen","violet","viool","virus","visite","vitamine",
    "vitamines","vitrine","vliegmachine","zigeuner"
  ]),

  "Centwoord": _fw([
    "accent","acceptabele","actrice","ambulance","balanceren","cel","cello",
    "cellulose","Celsius","cement","cent","centiliter","centimeter","centra",
    "centrale","centrum","ceremonie","cider","cijfer","cilinder","circa",
    "circus","cirkel","citroen","citroencake","citroenschijfje",
    "communiceren","concentreren","concert","concertgebouw","cruciaal",
    "december","decibel","decimaal","docent","emancipatie","encyclopedie",
    "epicentrum","fabriceren","felicitatie","financieel","gecompliceerd",
    "geconcentreerd","hyacint","identificeren","incidenteel","lancering",
    "lucifer","medicijn","musiceren","oceaan","officieel","ontcijferen",
    "openingsceremonie","Patricia","pincet","poolcirkel","precies",
    "principe","principieel","procent","producent","provinciaal","provincie",
    "publiceren","racisme","recensie","recept","sociale","specerij",
    "speciale","specialist","succes","succesvolle","technici","vaccinatie"
  ]),

  "Politiewoord": _fw([
    "accommodatie","actie","actiefilms","administratie","administratiekosten",
    "arrestatie","attractie","collectie","combinatie","communicatie",
    "competitie","conditie","consultatiebureau","democratie","discriminatie",
    "emotie","expeditie","expositie","felicitatie","functie","generatie",
    "illustratie","imitatie","infectiegevaar","informatie","installatie",
    "instructie","locatie","medicatie","melkproductie","notitie","operatie",
    "organisatie","politie","politiebureau","politiemannen","politiemensen",
    "positie","prestatie","reactie","reanimatie","reflectie",
    "reisorganisatie","repetitie","revolutie","situatie","traditie",
    "turbulentie","vakantie","variatie","vleesconsumptie"
  ]),

  "Colawoord": _fw([
    "accent","accepteren","accordeon","acrobaat","actiefilms","activiteit",
    "actrice","actueel","Antarctica","attractie","bacterie","bioscoop",
    "broeikaseffect","cactussen","cadeau","calorie","camouflage","Canada",
    "carnivoor","categorie","chemicus","chic","circa","cocon","cola",
    "collage","collega","Columbus","combinatie","commandant","commentaar",
    "competitie","compliment","componist","compost","concentratie","concert",
    "condens","conditie","conducteur","Constantinopel","constatering",
    "constructie","consumptie","contant","continent","contract","controle",
    "coupe","couplet","courgettes","creatief","crisis","cruciaal","cultuur",
    "cursus","decor","decorontwerper","democratie","dialecten","dictee",
    "direct","directeur","discriminatie","discussie","documenten",
    "ecosysteem","effect","encyclopedie","exact","excursie","excuses",
    "functie","Heracles","historicus","horeca","injectie","insecten",
    "insectenlarve","inspecteur","instructie","landbouwsector","locatie",
    "macaroni","mascara","melkproductie","microscoop","musicus","nectar",
    "octopus","perfect","pictogram","politicus","product","projector",
    "reactie","reclames","redactielid","respect","risico","script",
    "seconde","selectie","speculaasje","stethoscoop","succes","succesvolle",
    "tactiek","telescoop","truc","tuberculose","vaccinatie","verticale",
    "viaduct","vleesconsumptie","wereldeconomie"
  ]),

  "Tropisch-woord": _fw([
    "agrarisch","akoestische","alfabetisch","allergische","Arabisch",
    "archeologische","Atlantische","atletisch","automatisch","Aziatisch",
    "Belgische","Bosnisch","chemische","democratisch","dramatisch",
    "dynamisch","economisch","elektrisch","exotisch","fantastisch",
    "gigantisch","historisch","hysterisch","idealistisch","Indische",
    "komisch","kosmisch","kritisch","logisch","magisch","magnetisch",
    "medisch","optimistisch","Perzisch","praktische","ritmische",
    "romantisch","Russische","Scandinavische","specialistische","sporadisch",
    "statisch","Syrische","technische","telefonisch","thematisch",
    "theoretisch","toeristisch","tragisch","tropische","typisch",
    "vegetarische"
  ]),

  "Taxiwoord": _fw([
    "Ajax","Alex","Alexander","Beatrix","box","chatbox","claxon","complex",
    "dyslexie","exact","examen","excursie","excuses","exemplaar","exotisch",
    "expeditie","experiment","experimenteel","explosie","export","expositie",
    "expres","expressie","extra","extreem","fax","faxen","Felix","index",
    "luxe","Luxemburg","Max","maxi","Maxima","maximaal","maximum","Mexico",
    "mix","mixen","mixer","saxofoon","sfinx","taxi","textiel","wax",
    "xylofoon"
  ]),

  "Chefwoord": _fw([
    "afdelingschef","affiche","affiches","afhaalchinees","architect",
    "architectenbureau","blancheren","boormachine","brunch","capuchon",
    "chagrijnig","chantage","chanteren","charmante","chef","cheffin","chic",
    "chili","Chili","chimpansee","China","Chinese","chips","chirurg",
    "chocolade","douchen","fiche","ketchup","kopieermachine","lunch",
    "lunchen","lunchgerecht","machine","machinist","manchetknoopje",
    "manchetten","marcheren","nonchalant","parachutes","poncho",
    "rechercheur","rekenmachine","stoommachine","vliegmachine"
  ]),

  "Theewoord": _fw([
    "apotheek","Athene","bibliotheek","cantharellen","discotheek","marathon",
    "methode","muntthee","mythe","mythologie","stethoscoop","sympathiek",
    "synthetisch","theater","thee","theeblaadjes","theedoek","thema",
    "thematisch","theorie","therapie","thermometer","thermosfles",
    "thermostaat","thuis","thuisfront","thuiswedstrijd"
  ]),

  "Cadeauwoord": _fw([
    "architectenbureau","bureau","cadeau","niveau","plateau","plumeau",
    "politiebureau","reisbureau","spreekniveau","waterniveau"
  ]),

  "Routewoord": _fw([
    "autoroute","camouflage","couplet","coupon","coureur","courgette",
    "couveuse","douane","douche","douchen","gouverneur","handelsroutes",
    "journaal","journalist","retour","rouge","route","routebeschrijving",
    "routine","silhouet","sluiproute","souvenir","souvenirwinkel","tour",
    "tournee","troubadour"
  ]),

  "Garagewoord": _fw([
    "asperges","bagage","camouflage","chantage","collage","college",
    "corsage","courgettes","energie","energiebron","etage","etalage",
    "garage","genie","giraffes","handbagage","horloge","lekkage","logeren",
    "manege","massage","page","passage","passagier","percentage",
    "personages","plantages","rage","rapportage","ravage","rouge","slijtage",
    "spionage","sportmassage","stage","stellage","tatoeage","vitrage"
  ]),

  "Lollywoodwoord": _fw([
    "analyse","cycloon","dynamisch","dynamo","dynastie","dyslexie","Egypte",
    "encyclopedie","fysiotherapie","gym","gymnastiek","gymzaal","Harry",
    "hobby","hobbykok","hyacint","hybride","hyena","hysterie","hysterisch",
    "Jenny","koolhydraten","labyrint","Lelystad","lobby","lolly","mysteries",
    "mysterieuze","mythe","mythologie","Olympische","pony","puppy","pyjama",
    "pythons","royaal","rugby","sorry","symbool","symfonie","symfonieorkest",
    "sympathieke","synthetisch","Syrische","systeem","teddybeer","trendy",
    "tyfoon","type","typen","typisch","Wendy","xylofoon","yoga","yoghurt",
    "yoghurtijsje"
  ]),

  "Militairwoord": _fw([
    "autoritair","Bonaire","culinair","familiair","flair","literair",
    "meubilair","militair","miljardair","miljonairs","ordinair",
    "parlementair","populair","populaire","primair","sanitair","solidair",
    "solitaire","spectaculair","tuinmeubilair"
  ]),

  "Trottoirwoord": _fw([
    "dressoir","gasreservoir","memoires","reservoir","trottoir","urinoir",
    "waterreservoir","zoetwaterreservoir"
  ]),

  "Latijns voorvoegsel": _fw([
    "abces","abdij","abnormaal","abrupt","absent","absoluut","absorberen",
    "abstract","absurd","adjudant","adjunct","administratie",
    "administratiekosten","admiraal","advent","advertentie","advies",
    "adviezen","advocaat","object","objectief","observatie","observeren",
    "obsessive","obstakel","subcategorie","subgroep","subsidie","substantie",
    "substantieel","subtiel","subtitel","subtotaal","subtropisch"
  ]),

  "Komma-s-woord": _fw([
    "'s avonds","'s maandags","'s middags","'s morgens","'s nachts",
    "'s ochtends","'s werelds","'s winters","'s woensdags","'s zaterdags",
    "'s zomers","'s zondags"
  ]),

  "Caféwoord": _fw([
    "buurtcafé","café","comité","coupé","eetcafé","hé","José","logé",
    "lunchcafé","oké","paté","privé","privébezitting","privégebruik",
    "privéinformatie","privéterrein","René","rosé","saté","satésaus",
    "taugé","treincoupé"
  ]),

  "Komma-s-meervoud": _fw([
    "Ada's","alibi's","Anna's","ara's","arena's","auto's","banjo's",
    "bikini's","camera's","cello's","cobra's","collega's","commando's",
    "curry's","dia's","diploma's","drama's","dynamo's","echo's","Eskimo's",
    "euro's","Eva's","Evi's","extra's","farao's","flamingo's","foto's",
    "gorilla's","Hanna's","Helma's","hobby's","hobo's","hyena's","iglo's",
    "Ivo's","Jenny's","jury's","kano's","kassa's","kila's","kiwi's",
    "koala's","komma's","lama's","Lara's","Laura's","Levi's","Lizzy's",
    "lobby's","logo's","lolly's","luchtfoto's","mango's","massa's",
    "Menno's","menu's","Mo's","motto's","Nina's","oma's","Onno's","opa's",
    "opera's","orka's","Otto's","pagina's","panda's","paprika's","piano's",
    "poncho's","pony's","prisma's","puppy's","pyama's","radio's","risico's",
    "safari's","salto's","schema's","ski's","sofa's","solo's","sorry's",
    "spiermassa's","taxi's","tendra's","thema's","Tommy's","tosti's",
    "tuba's","zebra's"
  ]),

  "Koppelteken": _fw([
    "auto-export","auto-onderdeel","auto-ongeluk","bingo-opbrengst",
    "bureau-inhoud","choco-ijsje","diploma-uitreiking","ex-fruitteler",
    "ex-kandidaat","ex-kunstenares","ex-leerling","ex-man","ex-voetballer",
    "ex-vrouw","familie-uitje","gala-avond","garage-eigenaar","havo-examen",
    "havo-klas","kassa-afdeling","klaar-over","media-aandacht","mee-eten",
    "mini-jurk","na-apen","Nieuw-Zeeland","Noord-Holland","Noord-Korea",
    "Noord-Limburg","Oost-Duitsland","oud-burgemeester","oud-collega",
    "oud-militair","oud-monteur","pistache-ijs","ski-instructeur",
    "solo-optreden","thee-ei","tosti-ijzer","tv-gids","tv-programma",
    "tv-zender","wc-bril","wc-papier","West-Turkije","Zuid-Afrika",
    "Zuid-Amerika","Zuid-Europa","Zuid-Frankrijk","Zuid-Korea"
  ]),

  "Tremawoord": _fw([
    "agrariër","Argentinië","Australië","Azië","beëindigen","beïnvloedbaar",
    "beïnvloeden","België","Brazilië","Caïro","Californië","cliënt",
    "commerciële","conciërge","diëtiste","drieëndertig","drieëntwintig",
    "drieënveertig","echoën","egoïstisch","essentiële","Ethiopiër",
    "financiële","gecreëerd","geëindigd","geëmigreerd","geëmotioneerd",
    "geërfd","geëvenaard","geëxperimenteerd","geïllustreerd","geïmporteerde",
    "geïnd","geïnformeerd","geïntrigeerd","hygiëne","Indonesië","industriële",
    "ingrediënten","intuïtie","Israël","Italië","kanoën","keizerspinguïn",
    "kopiëren","maïs","Maleisië","mozaïek","notariële","Oceanië","officiële",
    "onderzeeër","oriëntatie","patiënt","pinguïn","pinguïns","poëzie",
    "principiële","reünie","ruïne","Sardinië","Servië","skiën","smeuïg",
    "Syrië","tatoeëren","terriër","tweeëndertig","tweeëntachtig",
    "tweeëntwintig","tweeënzestig","vacuüm","variëteit","vegetariër",
    "Venetië"
  ]),

  "Trema meervoud": _fw([
    "allergieën","amfibieën","bacteriën","biografieën","braderieën",
    "calorieën","categorieën","chocolaterieën","drieën","economieën",
    "energieën","epidemieën","fantasieën","filosofieën","financiën",
    "fotokopieën","galerieën","genieën","ideeën","industrieën","jaloezieën",
    "knieën","koloniën","kopieën","melodieën","moskeeën","oliën",
    "pestepidemieën","poriën","reeën","sleeën","theorieën","trofeeën",
    "tweeën","zeeën"
  ]),

  "Tussen-e": _fw([
    "apetrots","aspergesoep","beregoede","beresterk","bessensap",
    "beukenboom","bruidegom","eikenboom","elleboog","gedachtegang",
    "glazenwasser","grenzeloos","groenteboer","groentebouillon","groenteman",
    "groentesoep","kippenei","kippenhok","kippensoep","maneschijn",
    "paardenbloem","paddenstoelen","pannenkoek","perenboom","pierenbad",
    "pissebed","poppenhuis","prentenboek","pruimensap","prullenbak",
    "puntenslijper","reuzeleuk","rijstebrij","rozengeur","ruggengraat",
    "schattebout","schroevendraaier","secondewijzer","slangenbeet",
    "snottebel","zonnebloem","zonnebrand","Zonnekoning","zonnepanelen",
    "zonneschijn","zonnestelsel","zorgeloos"
  ])

};

/**
 * Originele categorienummers uit de woordenlijst.
 * Nummer 14 (Komma-s-woord) ontbreekt – die categorie bevat alleen
 * woorden met spaties en kan niet in het spel worden gebruikt.
 */
const CategoryNumbers = {
  "Hakwoord":           1,
  "Zingwoord":          2,
  "Luchtwoord":         3,
  "Plankwoord":         4,
  "Eer-oor-eur-woord":  5,
  "Aai-ooi-oei-woord":  6,
  "Eeuw-ieuw-woord":    7,
  "Langmaakwoord":      8,
  "Voorvoegsel":        9,
  "Klankgroepenwoord":  10,
  "Verkleinwoord":      11,
  "Achtervoegsel":      12,
  "Kilowoord":          13,
  "Komma-s-woord":      14,
  "Centwoord":          15,
  "Komma-s-meervoud":   16,
  "Politiewoord":       17,
  "Colawoord":          18,
  "Tropisch-woord":     19,
  "Taxiwoord":          20,
  "Chefwoord":          21,
  "Theewoord":          22,
  "Caféwoord":          23,
  "Cadeauwoord":        24,
  "Routewoord":         25,
  "Garagewoord":        26,
  "Lollywoodwoord":     27,
  "Tremawoord":         28,
  "Militairwoord":      29,
  "Koppelteken":        30,
  "Trottoirwoord":      31,
  "Tussen-e":           32,
  "Trema meervoud":     33,
  "Latijns voorvoegsel":34
};
