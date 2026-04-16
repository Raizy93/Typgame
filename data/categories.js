'use strict';

/**
 * data/categories.js – Staal Woordenlijst Groep 7
 * Alle categorieën met bijbehorende woorden.
 * Woorden worden gefilterd op typeerbaarheid (alleen letters a-z/A-Z).
 */

function _fw(list) {
  return [...new Set(list.filter(w =>
    typeof w === 'string' &&
    w.length >= 3 &&
    /^[a-zA-Z]+$/.test(w)
  ))];
}

const Categories = {

  "Zingwoord": _fw([
    "angel","angst","behangen","belangrijk","brengen","dringen","Engeland",
    "gevangene","haringen","Hengelo","hengsel","ingang","jongen","langzaam",
    "lengte","mengsel","mustang","opbrengst","ophangen","slinger","stengel",
    "voorganger","voorrang","wringen","zangeres","zwanger","aanmoediging",
    "begeleiding","behandeling","bekeuring","beschaving","bereiding","bevolking",
    "beweging","bezichtiging","Efteling","Groningen","herinnering","kleding",
    "koning","koningin","leiding","lieveling","ligging","omgeving","omleiding",
    "ontmoeting","opening","overhoring","mening","nieuweling","regering",
    "rekening","reservering","richting","riolering","schemering","spanning",
    "stemming","tekening","uitbreiding","uitnodiging","verdieping","vergissing",
    "vergroting","verlichting","verrassing","verrijking","versnelling",
    "verspilling","vertraging","vervelling","verzameling","vestiging",
    "Vlissingen","vluchteling","voorstelling","wijziging","wrijving",
    "afvalverwerking","gaswinning","houtbewerking","ontwikkelingslanden",
    "spaarrekening","spijsvertering","weersverwachting","wereldbevolking"
  ]),

  "Luchtwoord": _fw([
    "achteruit","berichten","bergachtig","berucht","bezocht","dichtbij",
    "dochter","gedichten","gekocht","gerechten","gevechten","gewicht","grachten",
    "kinderachtig","machteloos","nachtegaal","ochtend","raadselachtig","rechtop",
    "richting","tachtig","terecht","uitzicht","Utrecht","verplicht","verrichten",
    "verwachten","zenuwachtig","archeoloog","archief","archieven","lachen",
    "lichaam","techniek","technisch","bouwtechniek","hemellichamen","kooktechniek",
    "lachspiegel","lichaamstemperatuur","knipperlichten","lichtsnelheid",
    "chemie","christelijk","chronisch","chrysant","giechelen","goochelaar"
  ]),

  "Plankwoord": _fw([
    "anker","banken","bedankt","bedenken","dankbaar","donker","enkelvoud",
    "Enkhuizen","Frankrijk","inschenken","jonkvrouw","klinker","koninklijk",
    "koninkrijk","linksaf","medeklinker","onafhankelijk","ondanks","plankton",
    "sprinkhanen","stinken","verzonken","Vinkeveen","wankelen"
  ]),

  "Eer/Oor/Eur": _fw([
    "controleer","eergisteren","eerlijk","heerlijk","meervoud","meneer",
    "neerslag","oneerlijk","onweer","sfeer","tekeergaan","veertien","verkeer",
    "verkeerd","vleermuizen","wanneer","behoorlijk","beoordelen","doorlopen",
    "Doornroosje","doorzichtig","eekhoorns","enzovoort","gehoor","hoorn",
    "kantoor","koorts","meteoor","noord","Noorwegen","ongestoord","schoorsteen",
    "soort","voorlezer","voorouders","voorraad","voorrang","voorruit",
    "voorstelling","Amersfoort","Apeldoorn","auteur","beurt","conducteur",
    "coureur","directeur","kleur","inspecteur","interieur","gouverneur",
    "monteur","regisseur","scheur","sleur","actueel","beeld","eventueel",
    "fluweel","geheel","heelal","individueel","juweel","momenteel","onderdeel",
    "procentueel","ritueel","visueel","teddybeer","veerkrachtig","voorhoofd",
    "voorjaar","rozengeur","meelwormpjes","paringsritueel","luchtverkeersleider"
  ]),

  "Langermaakwoord": _fw([
    "altijd","Ameland","avond","beluisterd","benauwd","benieuwd","buitenland",
    "Duitsland","eiland","Engeland","enkelvoud","Friesland","geduld","Gelderland",
    "gemengd","gemiddeld","gereedschap","Groenland","Holland","honderd","iemand",
    "misverstand","Nederland","ochtend","ontzettend","platteland","raadsel",
    "spannend","standaard","tulband","uitstekend","vanavond","verkeerd",
    "verliefd","voedzaam","wedstrijd","wereld","woedend","Zeeland","zeldzaam",
    "abonnement","afkomst","agent","apart","apparaat","artiest","asfalt",
    "beschuit","beslist","beurt","bijeenkomst","Brabant","bruiloft","docent",
    "cement","charmant","compleet","compliment","componist","concert","consument",
    "constant","contact","couplet","deodorant","dirigent","dominant","emigrant",
    "etiket","experiment","fabrikant","geschikt","helft","herfst","hyacint",
    "immigrant","imposant","interessant","irritant","journalist","kandidaat",
    "klimaat","krokant","limiet","muzikant","pamflet","pastel","perfect",
    "sponsor","standaard","tegenwoordig","temperatuur","toernooi","trompet",
    "turbine","twintig","uitzondering","vakkundig","grondwet","handbagage",
    "ijzertijd","landbouwsector","muntthee","natuurgebied","razendsnel",
    "spinnenweb","thuisfront","thuiswedstrijd","verbodsbord","werkgelegenheid"
  ]),

  "Achtervoegsel": _fw([
    "aankondigen","aanmoedigen","akelig","bergachtig","bevestigen","bezichtigen",
    "bezuinigen","doorzichtig","draaierig","drassig","driftig","droevig",
    "dromerig","duizelig","eeuwig","eigenaardig","eindigen","fleurig","geduldig",
    "geestig","gelukkig","geneeskrachtig","geniepig","gevoelig","geweldig",
    "gewichtig","gezellig","giftig","glibberig","grappig","griezelig","gunstig",
    "handig","harig","hebberig","heilig","heldhaftig","hevig","hongerig",
    "hoogmoedig","humeurig","ijverig","jeugdig","kleurig","kleverig","koppig",
    "krachtig","kundig","lastig","levendig","lollig","luidruchtig","machtig",
    "nauwkeurig","nieuwsgierig","nuttig","onstuimig","pittig","plechtig",
    "plezierig","regelmatig","roestig","rumoerig","spoedig","statig",
    "tegenwoordig","twintig","uitnodigen","vakkundig","veilig","verdediger",
    "verkondigen","vernietigen","vervaardigen","volledig","waardig","wollig",
    "zalig","zenuwachtig","zonnig","zorgvuldig","zuinig",
    "aannemelijk","aantrekkelijk","afgrijselijk","afstandelijk","afschuwelijk",
    "avontuurlijk","behoorlijk","belachelijk","besmettelijk","dagelijks",
    "eerlijk","eigenlijk","eindelijk","erbarmelijk","fatsoenlijk","feestelijk",
    "figuurlijk","gemakkelijk","gemeenschappelijk","gevaarlijk","gruwelijk",
    "hartelijk","heerlijk","huiselijk","huishoudelijk","huwelijk","jaarlijks",
    "klaaglijk","koninklijk","kwalijk","landelijk","lelijk","maatschappelijk",
    "menselijk","misselijk","moeilijk","natuurlijk","nauwelijks","noorderlijk",
    "onafhankelijk","openlijk","pijnlijk","smakelijk","stedelijk","tamelijk",
    "tijdelijk","toegankelijk","uiterlijk","verantwoordelijk","vermakelijk",
    "verrukkelijk","verschrikkelijk","vreselijk","vriendelijk","vrolijk",
    "waarschijnlijk","wekelijks","werkelijk","westelijk","wonderlijk",
    "zakelijk","zuidelijk"
  ]),

  "Verkleinwoord": _fw([
    "bedankje","berichtje","broodje","chipje","concertje","eendje","gebakje",
    "gedichtje","hartje","ijsje","kindje","lichtje","liedje","meisje",
    "optochtje","portretje","restaurantje","schelpje","servetje","speculaasje",
    "sprintje","stadje","tabletje","vriendje","woordjes","bureautje",
    "cadeautje","cirkeltje","eentje","eitje","fonteintje","heuveltje",
    "kleurtje","krantje","taartje","ballonetje","belletje","bloemetje",
    "bolletjes","bommetje","celletje","gezinnetje","hotelletje","karretjes",
    "kippetje","kommetje","lammetje","mannetje","poppetje","slabbetje",
    "spinnetjes","spionnetje","stemmetjes","sterretje","vlaggetje",
    "vriendinnetje","weggetje","zonnetje","dingetje","gangetje","jongetje",
    "slangetje","wandelingetje","sneeuwklokjes","theeblaadjes","meelwormpjes"
  ]),

  "Korte klank": _fw([
    "aardappelen","abonnement","allerlei","alles","allicht","Assen","attent",
    "ballon","bakkerij","batterij","beginnen","bestemming","cellen","cello",
    "collectie","courgettes","fossiel","gammel","geheimzinnig","gelukkig",
    "gemiddeld","gespannen","gevallen","glitters","grappig","hebberig","helling",
    "herrie","hobby","Holland","immigrant","intelligent","kajakken","kikkers",
    "kudde","ligging","lolly","officieel","officier","rillingen","sappig",
    "schrikken","sinaasappels","sorry","terras","vergezellen","verklappen",
    "verrassen","verrukkelijk","versnellen","gaswinning","glazenwasser",
    "immuunsysteem","knipperlichten","politiemannen","spinnenweb","essentieel",
    "intelligent","maatschappij","oppervlak","paddenstoel","pakket","perron",
    "platteland","puppy","Russisch","schatting"
  ]),

  "Lange klank": _fw([
    "Afrika","Afrikanen","akelig","Ameland","Amersfoort","Apeldoorn","apotheek",
    "arena","arend","aannemelijk","Arabier","avond","bacterie","beleven",
    "beoordelen","beweging","bewoners","bibliotheek","biologisch","bovendien",
    "Brabant","dagelijks","definitie","digitaal","dirigeren","docent","dominant",
    "douane","emotioneel","enorm","enzovoort","ervaring","etiket","evenaar",
    "eveneens","evenement","examen","exotisch","expositie","finale","fluweel",
    "furieus","garage","geloven","genezen","geniaal","glazuur","globe","gratie",
    "Groningen","haringen","helaas","horizon","huwelijk","idealen","imitatie",
    "indianen","insmeren","journalist","joviaal","juweel","kajakken","kastelen",
    "kleding","kleverig","komisch","konijnen","koraal","krokant","kwaliteit",
    "lading","ledikant","lelijk","lenig","lezing","lianen","lichamen","logisch",
    "loket","lotion","marathon","medicijn","meteor","microfoon","modieus",
    "motor","muziek","muzikant","najaar","Nederland","negeren","nomaden",
    "Noorwegen","notitie","oceanen","oktober","olifant","omgeving","Pasen",
    "piramide","Pluto","podium","positie","positief","probleem","procent",
    "producent","provincie","relatie","riskeren","schaduw","schemering",
    "serieus","sirene","slagerij","slalom","smederij","speciaal","sprakeloos",
    "stadion","statig","tafereel","talloze","tapir","tekening","telefoon",
    "televisie","temperatuur","tevreden","fotokopieen","hemellichamen",
    "honingmeloen","paradijsvogel","razendsnel","rozengeur","spaarrekening",
    "spijsvertering","waterreservoir","wereldeconomie"
  ]),

  "Aai/Ooi/Oei": _fw([
    "aaien","baaien","bloeien","haaien","draaierig","gesnoeid","glooien",
    "knoeien","kraaien","lawaai","moeilijk","moeizaam","nooit","omdraaien",
    "ontdooien","ooievaar","opgroeien","saaie","sproeien","strooien","toernooi",
    "uitwaaien","vermoeid","waaien","vloeistof","bloesem","boeket","groeit"
  ]),

  "Eeuw/Ieuw": _fw([
    "eeuw","eeuwig","leeuwerik","meeuwen","middeleeuwen","schreeuwen","sneeuwen",
    "spreeuwen","kieuwen","nieuweling","nieuwsgierig","opnieuw","benieuwd",
    "leeuwin","kapotsneeuw"
  ]),

  "Tropisch woord": _fw([
    "agrarisch","akoestisch","alfabetisch","allergisch","Arabisch","archeologisch",
    "atletisch","automatisch","chemisch","democratisch","dramatisch","dynamisch",
    "economisch","elektrisch","exotisch","fantastisch","gigantisch","historisch",
    "hysterisch","komisch","kosmisch","kritisch","logisch","magisch","magnetisch",
    "medisch","optimistisch","Perzisch","praktisch","ritmisch","romantisch",
    "Russisch","statisch","synthetisch","technisch","thematisch","theoretisch",
    "toeristisch","tragisch","tropisch","typisch","vegetarisch"
  ]),

  "Kilowoord": _fw([
    "activiteit","artikel","assistent","assortiment","bibliotheek","biologisch",
    "bizarre","carnivoren","centimeter","citroen","combinatie","competitie",
    "compliment","conditie","definitie","diamant","dieet","digitaal","dinosaurus",
    "diploma","directeur","dirigent","diverse","emigrant","epicentrum","etiket",
    "expeditie","experiment","expositie","fabrikant","familie","februari",
    "festival","finale","gigantisch","giraf","gitaar","grandioos","helikopter",
    "horizon","horizontaal","ideaal","illustratie","imitatie","immigrant",
    "improviseren","indianen","individueel","insecten","inspecteur","internaat",
    "inventief","jubileum","kandidaat","kantine","kapitein","klarinet","klimaat",
    "kliniek","kritiek","kritisch","kwaliteit","lampion","ledikant","lianen",
    "limiet","limonade","lucifer","macaroni","machine","machinist","marine",
    "maximaal","maximum","media","medicijn","meditatie","microfoon","microscoop",
    "millimeter","minimaal","minimum","minister","minuut","modieus","muzikant",
    "niveau","notitie","officier","olifant","optimist","organiseren","pagina",
    "paprika","piano","piloot","piraat","piramide","pistool","podium","politie",
    "politiek","positie","positief","president","privé","radio","religie",
    "repetitie","riolering","riool","risico","ritueel","rivaal","rivier",
    "safari","schorpioen","serieus","sigaar","sinaasappel","sirene","siroop",
    "situatie","souvenir","speciaal","spinazie","spion","spiraal","stadion",
    "studio","tapir","televisie","territorium","titel","toernooi","turbine",
    "uniform","universum","variatie","viaduct","video","virus","vitamine","viool"
  ]),

  "Centwoord": _fw([
    "accent","ambulance","cel","cello","cellulose","Celsius","cement","cent",
    "centimeter","ceremonie","cijfer","cilinder","circa","circus","cirkel",
    "citroen","concentreren","concert","docent","decibel","decimaal","felicitatie",
    "financieel","hyacint","lucifer","medicijn","oceaan","officier","ontcijferen",
    "pincet","precies","principe","procent","producent","provinciaal","publiceren",
    "recept","succes","vaccin","concertgebouw","poolcirkel","succesvolle"
  ]),

  "Theewoord": _fw([
    "apotheek","bibliotheek","discotheek","marathon","methode","mythe",
    "mythologie","stethoscoop","sympathiek","synthetisch","theater","thee",
    "thema","thematisch","theorie","therapie","thermometer","thermostaat",
    "lichtterapie","muntthee","thuisfront","thuiswedstrijd","theeblaadjes",
    "symfonieorkest"
  ]),

  "Chefwoord": _fw([
    "affiche","architect","brunch","capuchon","chantage","charmant","chef",
    "chemie","chemicus","chic","chimpansee","chocolade","chirurg","douchen",
    "ketchup","lunch","machine","machinist","manchetten","marcheren",
    "nonchalant","parachute","poncho","rechercheur","boormachine",
    "manchetknopje","rekenmachine","stoomachine"
  ]),

  "Garagewoord": _fw([
    "asperges","baggage","camouflage","chantage","collage","energie","etage",
    "etalage","garage","genie","horloge","massage","manege","passage",
    "passagier","percentage","personage","plantage","rapportage","ravage",
    "rouge","spionage","stage","handbagаge","sportmassage"
  ]),

  "Lollywoord": _fw([
    "analyse","cycloon","dynamo","dynamisch","dyslexie","fysiotherapie","gym",
    "gymnastiek","hobby","hyacint","hysterisch","koolhydraten","lobby","lolly",
    "mythe","mythologie","mysterie","olympisch","pony","puppy","pyjama","royaal",
    "rugby","symbool","symfonie","sympathiek","synthetisch","systeem","trendy",
    "type","typen","typisch","xylofoon","yoga","yoghurt","hobbykok","teddybeer"
  ]),

  "Routewoord": _fw([
    "camouflage","couplet","coupon","coureur","courgette","douane","douche",
    "journalist","gouverneur","retour","rouge","route","routine","silhouet",
    "souvenir","tour","toernooi","troubadour","autoroute","routebeschrijving"
  ]),

  "Caféwoord": _fw([
    "depot","detail","niveau","plateau","schema","bureau","cadeau","tableau",
    "buurtcafe","eetcafe","lunchcafe","satésaus","treincoupé"
  ]),

  "Voorvoegsel": _fw([
    "bedenken","beleven","bereiken","beschermen","bewegen","bezorgen",
    "beginnen","bereiden","belonen","benutten","beoordelen","berichten",
    "besluiten","bespreken","bestuderen","betalen","betreden","bevatten",
    "bevragen","beweren","beziten",
    "vergeten","verklaren","vermaken","verwijzen","verzamelen","verbeteren",
    "vernieuwen","vervangen","verkennen","verdienen","vertrouwen","verbinden",
    "verdiepen","vergroten","verhogen","verkopen","verlichten","verminderen",
    "verrijken","verschuiven","versterken","vertellen","verwijderen",
    "ontdekken","ontmoeten","ontvangen","ontwikkelen","ontsnappen","ontkomen",
    "ontwerpen","ontwijken","onthullen","ontbreken","ontlopen","ontregelen",
    "herdenken","herhalen","herstellen","herzien","herinneren","herbouwen",
    "herkennen","hervatten","herbeginnen","hergebruiken","herleven","hernoemen",
    "misverstand","mislukken","misbruik","misleiden","mislukt","misgunnen"
  ]),

  "Politiewoord": _fw([
    "politie","actie","conditie","collectie","competitie","definitie",
    "emotie","expeditie","expositie","fictie","fractie","functie",
    "infectie","informatie","inspectie","instructie","inventie","reactie",
    "relatie","repetitie","revolutie","situatie","traditie","variatie",
    "promotie","portie","positie","sectie","natie","notitie","operatie",
    "productie","reductie","selectie","injectie","constructie","attractie",
    "demonstratie","educatie","evaluatie","formatie","generatie","imitatie",
    "medicatie","meditatie","motivatie","navigatie","organisatie",
    "presentatie","publicatie","spectatie","vibratie","adaptatie","adoptie",
    "communicatie","concentratie","confiscatie","conversatie","cooperatie",
    "decoratie","dictatie","duplicatie","eliminatie","faciliteit","fascinatie",
    "federatie","fixatie","fondatie","graduatie","hospitalisatie","imitatie",
    "initiatie","integratie","interpretatie","intimidatie","investigatie",
    "invitatie","isolatie","iteratie","legioen","liberatie","locatie",
    "moderatie","mutatie","nominatie","occupatie","participatie","plagiaat",
    "populatie","processie","proclamatie","proportie","provocatie"
  ]),

  "Colawoord": _fw([
    "cola","code","cobra","cocon","coma","concert","contact","contract",
    "computer","controleren","combinatie","constructie","consumptie",
    "collectie","competitie","compliment","conditie","conducteur",
    "congres","correct","corridor","cosmos","couleur","courant",
    "couvert","corpus","cornet","corvee","coupure","creatie",
    "crisis","criteria","crypte","cactus","calorie","camera","camping",
    "campus","canal","capaciteit","cargo","catalog","categorie",
    "causaal","centraal","centreren","circulaire","citadel","citaat",
    "commissie","communicatie","concentratie","conclusie","conferentie",
    "confiscatie","conjunctuur","context","continueren","controle"
  ]),

  "Taxiwoord": _fw([
    "taxi","extra","exact","complex","textiel","luxe","maximum","index",
    "reflex","paradox","expeditie","exotisch","examen","expositie",
    "experiment","expert","extensie","extern","excursie","excellentie",
    "exclusief","exemplaar","exercitie","executie","examineren",
    "exploderen","exploreren","exporteren","exposeren","extensief",
    "extraordinair","matrix","prefix","suffix","latex","sphinx",
    "hexagon","oxyde","flexibel","reflexief","annexeren","taxateur",
    "taxichauffeur","taximeter","exactheid","complexiteit","luxueus"
  ]),

  "Militairwoord": _fw([
    "militair","populair","vulgair","solitair","familiair","elementair",
    "commentaar","documentair","functionair","honorair","humaan",
    "kamenier","komisaris","ordinair","planetair","primair","revolutionair",
    "salutair","sanitair","seculair","solidair","spectaculair","subsidiair",
    "veterinair","voluntair","auxiliair","complementair","memorair",
    "singulier","speciaal","structurair","territoriaal","tropisch",
    "uniformair","veteraan","vitaal"
  ]),

  "Trottoirwoord": _fw([
    "trottoir","reservoir","boudoir","pissoir","directoire","armoire",
    "mémoire","humoir","glamour","labour","velour","tambour","contour",
    "detour","four","iour","iour","rigour","savour","splendour",
    "ardour","colour","favour","flavour","valour","vapour","vigour",
    "honour","humour","labour","neighbour"
  ]),

  "Tremawoord": _fw([
    "actueel","eventueel","individueel","procentueel","visueel","ritueel",
    "momenteel","officieel","essentieel","financieel","emotioneel",
    "traditioneel","professioneel","sensationeel","nationeel","rationeel",
    "informatief","creatief","educatief","effectief","definitief",
    "primitief","progressief","representatief","selectief","sportief",
    "objectief","subjectief","alternatief","conservatief","decoratief",
    "demonstratief","descriptief","detectief","negatiefwoord"
  ]),

  "Eiwoord": _fw([
    "trein","klein","meisje","rein","meid","plein","geheim","heilig",
    "steil","weide","zeilen","feiten","leiden","peilen","reizen","sein",
    "bereiken","bewijzen","dreinen","eindelijk","eindig","feit","geit",
    "heiligdom","keien","kleingeld","kleigrond","lei","leidend",
    "peil","reinigen","reinheid","steile","treinreis","treinstation",
    "weiden","zeiltocht","eigenlijk","eigenaar","einde","eindig",
    "geheimzinnig","heilzaam","kleinood","leidraad","meisjesachtig",
    "richtlijn","tegelijk","verkleinen","verleiden","vermeiden",
    "versteil","inrichten","bereiding","bewijsvoering","beïnvloeden"
  ]),

  "Ijwoord": _fw([
    "zijn","bij","wij","ijs","dijk","rijk","mijn","prijs","blij","vrij",
    "wijs","bijdrage","bijzonder","blijven","fijn","grijs","kijk","lijn",
    "pijn","rij","vijf","vijver","wijn","wijzen","zwijgen","bijhouden",
    "bijkomen","drijven","grijpen","krijgen","lijden","rijden","schrijven",
    "spijt","stijgen","tijger","vrijheid","vrijwillig","wijsheid","zijden",
    "bijdehand","bijgeloof","bijkomst","bijproduct","dijk","dijkbewaker",
    "dijkbewaking","dijkbreuk","eindelijk","fijnmazig","grijsaard",
    "grijskop","ijsberg","ijskoude","ijsvrij","kleindier","klijsteek",
    "lijfwacht","mijnbouw","mijnwerker","prijslijst","prijsvraag",
    "rijkdom","rijksweg","rijksoverheid","schrijfwijze","stijfkop",
    "tijdelijk","tijdgeest","vrijdag","vrijgezel","vrijplaats",
    "bakkerij","slagerij","drukkerij","smederij","brouwerij","schilderij",
    "toverij","visserij","wasserij","nijverheid","herijken","bezwijken",
    "grijpbaar","hijsen","knijpen","lijmen","nijpen","prijzen","rijmen",
    "snijden","spijkeren","vijlen","wijden","zwijmel"
  ]),

  "Auwoord": _fw([
    "augurk","auto","aula","auteur","automaat","autoriteit","augustus",
    "applaus","fauna","gauw","laurier","lauw","rauw","saus","pauw",
    "dauw","kauw","blauw","goudkleurig","aasgier","claus","draussen",
    "flauw","glauw","grauw","grauwe","grauwig","klauw","klauwen",
    "klauwig","krauw","krauwen","lauwheid","lauwtjes","mausoleum",
    "nautisch","nauw","nauwelijks","nauwkeurig","nauwsluitend",
    "pauper","pauselijk","rauwheid","sauteren","schrauwen",
    "slauwig","stauros","tautologie","traurig","traumatisch",
    "aubergine","auditorium","auteursrecht","autocorrectie",
    "autofabrikant","autogarage","automobilist","autorisatie",
    "autorally","autostrade","autonoom"
  ]),

  "Ouwoord": _fw([
    "oud","goud","koud","stout","zout","trouw","vrouw","bouw","schouw",
    "gebouw","goudvis","houd","houten","koudheid","oudheid","ouderwets",
    "ouders","stoutmoedig","touwklimmen","trouwring","vrouwelijk",
    "zoutzee","voud","woud","inhoud","aanhoud","berouw","vertrouw",
    "gewoud","tovenaar","bouwen","bouwwerk","bouwgrond","bouwkunst",
    "bouwplaats","bouwproject","douw","gedouw","goudkleurig","goudsmid",
    "goudstuk","houden","houding","houtsoort","houtvester","koudfront",
    "koudstaal","moud","oudoom","oudtante","rouwen","rouwband","rouwstoet",
    "schouderbreedte","schouderklop","schoudertas","schoudergewricht",
    "stouterd","stoutheld","trouwakte","trouwbelofte","trouwboekje",
    "trouwceremoie","trouwdag","vrouwenarts","vrouwenkiesrecht",
    "vrouwonvriendelijk","zoutmeer","zoutoplossing","zoutwater",
    "zoutvlakte","zouttransport","boudewijn","goudgeel","koudebloedig",
    "loudspreker","oudgediende","overtrouw","samenbouw","woudloper"
  ]),

  "Leenwoord": _fw([
    "bureau","champagne","chauffeur","chocolade","computer","cowboy",
    "curry","design","disco","euro","film","folder","hobby","hotel",
    "humor","internet","jazz","jogging","jury","karate","kiosk","laser",
    "lift","lobby","logo","manager","menu","mode","monitor","motel",
    "niveau","nylon","park","pauze","pizza","poster","radio","record",
    "robot","rugby","safari","sandwich","ski","sofa","sport","steak",
    "stress","taxi","team","ticket","tofu","training","trend","tunnel",
    "uniform","video","villa","virus","whisky","yoga","appartement",
    "balkon","banaan","biscuit","bonjour","budget","buffet","casino",
    "champagne","chique","code","collega","concert","deadline","depot",
    "detail","detective","document","dossier","envelop","espresso",
    "festival","finale","formule","garage","genre","gratis","grill",
    "guide","hapje","inkognito","interface","interview","jeans",
    "karate","laptop","limousine","lounge","machine","maraton","menu",
    "oase","opera","original","parket","passage","pedicure","penalty",
    "persoon","piano","platform","polite","premiere","procedure",
    "profiel","programma","project","protocol","quiz","regime","relax",
    "routine","scenario","service","sjaal","slogan","snack","souvenir",
    "sponsor","sprint","stadion","sticker","studio","subject","suite",
    "sushi","symfonie","tactiek","tarief","techniek","tempo","terrein",
    "theater","thema","ticket","toerisme","toornament","transfer","trio",
    "turbo","type","vakantie","variete","verse","vitamine","vlam",
    "western","wifi","winkel","workshop","xenofobie","xylofoon","zone"
  ]),

};
