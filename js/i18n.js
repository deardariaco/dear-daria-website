// Dear Daria — i18n system. French is the default and primary language.
window.DearDaria = window.DearDaria || {};

DearDaria.LANGS = ['fr', 'en', 'de'];
DearDaria.LANG_LABELS = { fr: 'Français', en: 'English', de: 'Deutsch' };

DearDaria.TRANSLATIONS = {
  fr: {
    // Nav
    nav_home: 'Accueil',
    nav_suites: 'Suites de Mariage',
    nav_jackets: 'Pochettes d\u2019Invitation',
    nav_collections: 'Collections',
    nav_shop: 'Boutique',
    nav_bespoke: 'Sur Mesure',
    nav_info: 'Infos',

    // Common / product labels
    label_bundle: 'Suite de Mariage',
    label_sleeve: 'Pochette d\u2019Invitation',
    label_place_card: 'Marque-Place',
    label_rsvp: 'Carte RSVP',
    label_save_the_date: 'Save the Date',
    label_menu: 'Menu',
    label_glass_tag: '\u00c9tiquette \u00e0 Verre',
    label_other: 'Invitation',
    view_collection: 'Voir la Collection',
    pieces_available: 'pi\u00e8ces disponibles',
    piece_available: 'pi\u00e8ce disponible',
    shop_on_etsy: 'Acheter sur Etsy',
    inquire_to_order: 'Demander un Devis',
    request_custom_color: 'Demander une Autre Couleur',
    also_in_collection: '\u00c9galement dans cette collection',
    personalize_collection: 'Personnaliser cette Collection',
    view_available_pieces: 'Voir les Pi\u00e8ces Disponibles',
    whats_included: 'Ce qui est inclus',
    available_pieces: 'Pi\u00e8ces Disponibles',
    gallery_label: 'Galerie',
    full_collection: 'La collection compl\u00e8te',
    closer_look: 'Un aper\u00e7u d\u00e9taill\u00e9',
    inquire: 'Demander',
    all_filter: 'Tout',
    nothing_here: 'Rien ici pour le moment',
    nothing_here_desc: 'Essayez une autre cat\u00e9gorie, ou contactez-nous pour une pi\u00e8ce sur mesure.',
    collection_not_found: 'Collection introuvable',
    product_not_found: 'Produit introuvable',
    return_collections: 'Retour aux Collections',
    return_shop: 'Retour \u00e0 la Boutique',
    every_piece_personalized: 'Chaque pi\u00e8ce est personnalis\u00e9e avec vos noms, votre texte, votre date et les d\u00e9tails de votre \u00e9v\u00e9nement.',

    // Home
    home_eyebrow: 'Suisse \u2014 Atelier Cr\u00e9atif',
    home_title: 'Dear Daria',
    home_lede: 'Papeterie de mariage et d\u2019\u00e9v\u00e9nement, fa\u00e7onn\u00e9e \u00e0 la main en Suisse. Choisissez une collection existante, adaptez-la \u00e0 vos couleurs, ou faites cr\u00e9er un mod\u00e8le enti\u00e8rement sur mesure.',
    btn_explore_collections: 'Explorer les Collections',
    btn_create_bespoke: 'Cr\u00e9er du Sur Mesure',
    featured_eyebrow: 'Collections Signature',
    featured_title: 'L\u00e0 o\u00f9 chaque suite commence',
    featured_lede: 'Une s\u00e9lection de nos designs les plus appr\u00e9ci\u00e9s \u2014 chacun personnalisable, adaptable \u00e0 vos couleurs, ou point de d\u00e9part d\u2019une cr\u00e9ation sur mesure.',
    view_all_collections: 'Voir Toutes les Collections',
    signature_eyebrow: 'La Signature Dear Daria',
    jackets_title: 'Pochettes &amp; Enveloppes d\u2019Invitation',
    jackets_text: 'Nos invitations s\u2019ouvrent comme le jour lui-m\u00eame \u2014 en couches, avec soin, un brin th\u00e9\u00e2trales. Chaque pochette et enveloppe peut \u00eatre personnalis\u00e9e avec votre texte et, selon les mod\u00e8les, adapt\u00e9e \u00e0 une autre palette de couleurs.',
    btn_explore_jackets: 'Explorer les Pochettes',
    suites_eyebrow: 'Compl\u00e8te &amp; Coordonn\u00e9e',
    suites_title: 'Suites de Mariage',
    suites_text: 'De l\u2019invitation au marque-place, une suite coordonn\u00e9e porte une seule histoire \u00e0 travers chaque pi\u00e8ce du jour \u2014 save the date, RSVP, menu, et les d\u00e9tails entre les deux.',
    btn_explore_suites: 'Explorer les Suites',

    // Make It Yours
    myo_eyebrow: 'Trois Fa\u00e7ons de Commencer',
    myo_title: 'Faites-le Vôtre',
    myo1_eyebrow: '01 \u2014 Personnalisez',
    myo1_title: 'Un Mod\u00e8le Existant',
    myo1_text: 'Choisissez un design Dear Daria existant et personnalisez le texte, les noms, la date, le format et les autres d\u00e9tails de votre \u00e9v\u00e9nement.',
    myo2_eyebrow: '02 \u2014 Recolor',
    myo2_title: 'Choisissez Votre Palette',
    myo2_text: 'Un mod\u00e8le existant peut \u00eatre adapt\u00e9 \u00e0 la palette de votre mariage ou \u00e9v\u00e9nement, avec un autre cardstock et d\u2019autres couleurs d\u2019illustration.',
    myo3_eyebrow: 'Un Service \u00c0 Part',
    myo3_title: 'Cr\u00e9ation Sur Mesure',
    myo3_text: 'Un tout nouveau design de papeterie, cr\u00e9\u00e9 sp\u00e9cialement pour votre \u00e9v\u00e9nement \u2014 de la premi\u00e8re conversation jusqu\u2019\u00e0 la production finale.',
    myo3_includes_label: 'Ce service peut inclure :',
    myo3_li1: 'La d\u00e9finition de la direction cr\u00e9ative g\u00e9n\u00e9rale',
    myo3_li2: 'Le choix de la palette de couleurs',
    myo3_li3: 'Le choix du papier et du cardstock',
    myo3_li4: 'La cr\u00e9ation de motifs floraux, botaniques ou illustratifs enti\u00e8rement nouveaux',
    myo3_li5: 'Le d\u00e9veloppement de la pochette ou de l\u2019enveloppe d\u2019invitation',
    myo3_li6: 'La conception des pi\u00e8ces de papeterie assorties',
    myo3_li7: 'L\u2019affinement du design avec vous',
    myo3_li8: 'La pr\u00e9paration compl\u00e8te pour la production finale',
    myo3_cta: 'Commencer une Demande Sur Mesure',

    // Collections page
    collections_eyebrow: 'L\u2019Atelier Complet',
    collections_title: 'Collections',
    collections_lede: 'Chaque famille de design Dear Daria, des motifs botaniques \u00e9pur\u00e9s aux invitations interactives \u00e0 volets. Chaque collection peut \u00eatre personnalis\u00e9e, et certains mod\u00e8les peuvent \u00eatre recolor\u00e9s selon votre palette.',

    // Invitation jackets page
    ij_eyebrow: 'La Signature Dear Daria',
    ij_title: 'Pochettes &amp; Enveloppes d\u2019Invitation',
    ij_lede: 'Un moment d\u2019ouverture en couches pour vos invit\u00e9s. Chaque pochette et enveloppe est personnalis\u00e9e avec votre texte, et certains mod\u00e8les sont disponibles dans plusieurs coloris.',
    browse_designs: 'Parcourir les Mod\u00e8les',
    every_jacket_sleeve: 'Toutes les pochettes &amp; enveloppes',

    // Wedding suites page
    ws_eyebrow: 'Compl\u00e8te &amp; Coordonn\u00e9e',
    ws_title: 'Suites de Mariage',
    ws_lede: 'Une seule histoire, port\u00e9e \u00e0 travers chaque pi\u00e8ce du jour. Les suites peuvent inclure l\u2019invitation, le save the date, le RSVP, le menu, le marque-place et la doublure d\u2019enveloppe \u2014 chaque collection ne contient pas n\u00e9cessairement toutes les pi\u00e8ces.',
    browse_suites: 'Parcourir les Suites',
    every_suite: 'Toutes les suites coordonn\u00e9es',

    // Shop page
    shop_eyebrow: 'Achat Direct',
    shop_title: 'Boutique',
    shop_lede: 'Chaque pi\u00e8ce peut \u00eatre personnalis\u00e9e avec vos noms, votre texte et votre date. Filtrez par cat\u00e9gorie pour trouver exactement ce qu\u2019il vous faut.',

    // Bespoke page
    bespoke_eyebrow: 'Cr\u00e9\u00e9 Sp\u00e9cialement Pour Vous',
    bespoke_title: 'Sur Mesure',
    bespoke_lede: 'Un tout nouveau design, pens\u00e9 autour de votre lieu, de votre saison, de vos noms. Chaque cr\u00e9ation sur mesure commence par une conversation.',
    btn_start_inquiry: 'Commencer une Demande',
    process_eyebrow: 'Le Processus',
    process_title: 'Quatre \u00e9tapes vers votre suite',
    step1_title: 'Parlez-moi de votre \u00e9v\u00e9nement',
    step1_text: 'Partagez votre lieu, votre saison, vos couleurs, vos fleurs, l\u2019atmosph\u00e8re souhait\u00e9e et vos besoins en papeterie.',
    step2_title: 'Cr\u00e9ation',
    step2_text: 'Un concept de papeterie est d\u00e9velopp\u00e9 sp\u00e9cialement autour de votre \u00e9v\u00e9nement.',
    step3_title: 'Affinement',
    step3_text: 'La typographie, les couleurs, le texte et les d\u00e9tails sont affin\u00e9s avec vous.',
    step4_title: 'Production',
    step4_text: 'La papeterie finale est soigneusement pr\u00e9par\u00e9e, d\u00e9coup\u00e9e et produite \u00e0 la main.',
    inquire_eyebrow: 'Commencez Ici',
    inquire_title: 'Parlez-nous de votre journ\u00e9e',
    field_name: 'Votre Nom / Vos Noms',
    field_email: 'Email',
    field_date: 'Date de l\u2019\u00e9v\u00e9nement',
    field_venue: 'Lieu',
    field_details: 'Parlez-nous de votre \u00e9v\u00e9nement',
    field_details_placeholder: 'Couleurs, fleurs, atmosph\u00e8re, inspirations, et les pi\u00e8ces que vous recherchez...',
    btn_send_inquiry: 'Envoyer la Demande',
    submit_note_bespoke: 'Merci \u2014 votre demande a bien \u00e9t\u00e9 re\u00e7ue. Dear Daria vous r\u00e9pondra bient\u00f4t.',

    // Info page
    info_eyebrow: 'Informations',
    info_title: 'Infos',
    about_eyebrow: '\u00c0 Propos',
    about_title: 'Un petit atelier suisse, fait \u00e0 la main',
    about_text1: 'Dear Daria est un atelier de papeterie bas\u00e9 en Suisse, cr\u00e9ant des articles en papier pens\u00e9s avec soin pour les mariages et les c\u00e9l\u00e9brations importantes. Chaque collection associe illustration, typographie, papier et d\u00e9tails soigneusement r\u00e9fl\u00e9chis \u2014 avec la possibilit\u00e9 de personnaliser un mod\u00e8le existant ou de cr\u00e9er quelque chose enti\u00e8rement sur mesure.',
    about_text2: 'Chaque pi\u00e8ce est r\u00e9alis\u00e9e avec le souci du d\u00e9tail : bords d\u00e9coup\u00e9s au laser, pochettes en couches, et invitations interactives \u00e0 volets qui invitent \u00e0 s\u2019ouvrir lentement.',
    hiw_eyebrow: 'Comment \u00e7a Marche',
    hiw_title: 'De la d\u00e9couverte \u00e0 votre bo\u00eete aux lettres',
    hiw1_title: 'Choisissez',
    hiw1_text: 'Parcourez les Collections ou la Boutique, et choisissez un mod\u00e8le \u2014 ou lancez une demande Sur Mesure.',
    hiw2_title: 'Personnalisez',
    hiw2_text: 'Partagez vos noms, votre texte, la date, la langue et tout ajustement de couleur.',
    hiw3_title: 'Validez',
    hiw3_text: 'Une maquette num\u00e9rique est pr\u00e9par\u00e9e pour votre approbation avant le d\u00e9but de la production.',
    hiw4_title: 'Production &amp; Livraison',
    hiw4_text: 'Votre papeterie est soigneusement produite et exp\u00e9di\u00e9e, avec des d\u00e9lais confirm\u00e9s pour chaque commande.',
    custom_eyebrow: 'Personnalisation',
    custom_title: 'Trois fa\u00e7ons de le faire v\u00f4tre',
    custom1_eyebrow: 'Personnalisez',
    custom1_title: 'Un Mod\u00e8le Existant',
    custom1_text: 'Les noms, le texte, la date, la langue et les d\u00e9tails de l\u2019\u00e9v\u00e9nement peuvent \u00eatre personnalis\u00e9s sur n\u2019importe quelle collection.',
    custom2_eyebrow: 'Recolor',
    custom2_title: 'Choisissez Vos Couleurs',
    custom2_text: 'Certaines collections peuvent \u00eatre adapt\u00e9es \u00e0 un autre cardstock et une autre palette de couleurs d\u2019illustration.',
    custom3_eyebrow: 'Cr\u00e9ez',
    custom3_title: 'Un Design Sur Mesure',
    custom3_text: 'Un tout nouveau design peut \u00eatre cr\u00e9\u00e9 sp\u00e9cialement pour votre \u00e9v\u00e9nement \u2014 <a href="bespoke.html" style="text-decoration:underline;">commencez ici</a>.',
    pro_eyebrow: 'Pour les Professionnels du Mariage',
    pro_title: 'Collaboration, de wedding planner \u00e0 wedding planner',
    pro_text: 'Dear Daria collabore avec des wedding planners, graphistes et professionnels de l\u2019\u00e9v\u00e9nementiel sur des mariages individuels, des projets \u00e9ditoriaux et des besoins de papeterie sur mesure \u2014 personnalisation de collections, papeterie sur mesure, suites coordonn\u00e9es, couleurs et quantit\u00e9s personnalis\u00e9es.',
    pro_cta: 'Prendre Contact',
    other_eyebrow: 'Au-Del\u00e0 des Mariages',
    other_title: 'Autres C\u00e9l\u00e9brations',
    other_text: 'Naissances, bapt\u00eames, f\u00eates de naissance, anniversaires, d\u00eeners priv\u00e9s, anniversaires et autres occasions importantes \u2014 Dear Daria cr\u00e9e \u00e9galement de la papeterie au-del\u00e0 du jour du mariage.',
    other_cta: 'Lancer une demande sur mesure',
    faq_eyebrow: 'FAQ',
    faq_title: 'Questions Fr\u00e9quentes',
    faq1_q: 'Combien de temps prend une commande ?',
    faq1_a: 'Les d\u00e9lais varient selon la collection et la quantit\u00e9. Les commandes personnalis\u00e9es n\u00e9cessitent g\u00e9n\u00e9ralement une \u00e9tape de validation avant la production ; les cr\u00e9ations sur mesure commencent par une conversation autour du design. Les d\u00e9lais exacts sont confirm\u00e9s pour chaque commande.',
    faq2_q: 'Puis-je changer la couleur d\u2019une collection ?',
    faq2_a: 'Certaines collections peuvent \u00eatre adapt\u00e9es \u00e0 un autre cardstock et une autre couleur d\u2019illustration. Tous les mod\u00e8les ne permettent pas toutes les couleurs \u2014 demandez-nous lors de votre prise de contact et nous confirmerons ce qui est possible.',
    faq3_q: 'Livrez-vous en dehors de la Suisse ?',
    faq3_a: 'Oui. Dear Daria exp\u00e9die \u00e0 l\u2019international ; les options et frais de livraison sont confirm\u00e9s \u00e0 la commande ou sur demande pour les cr\u00e9ations sur mesure.',
    faq4_q: 'Que comprend une suite de mariage ?',
    faq4_a: 'Les suites peuvent inclure une pochette ou enveloppe d\u2019invitation, l\u2019invitation, le save the date, le RSVP, une carte de d\u00e9tails, le menu, le marque-place et la doublure d\u2019enveloppe. Chaque collection ne contient pas n\u00e9cessairement toutes les pi\u00e8ces \u2014 la page de chaque collection indique ce qui est disponible.',
    faq5_q: 'Puis-je commander une seule pi\u00e8ce plut\u00f4t qu\u2019une suite compl\u00e8te ?',
    faq5_a: 'Oui. Les pi\u00e8ces individuelles, y compris les save the dates, cartes RSVP, menus et marque-places, peuvent \u00eatre command\u00e9es s\u00e9par\u00e9ment via la Boutique.',
    contact_eyebrow: 'Contact',
    contact_title: 'Dites Bonjour',
    field_message: 'Message',
    btn_send_message: 'Envoyer le Message',
    submit_note_contact: 'Merci de nous avoir contact\u00e9s \u2014 Dear Daria vous r\u00e9pondra bient\u00f4t.',
    contact_or: 'Ou \u00e9crivez directement \u00e0',

    // Footer
    footer_tagline: 'Papeterie de mariage et d\u2019\u00e9v\u00e9nement, fa\u00e7onn\u00e9e \u00e0 la main en Suisse.',
    footer_explore: 'Explorer',
    footer_studio: 'Atelier',
    footer_contact: 'Nous Contacter',
    footer_professionals: 'Pour les Professionnels',
    footer_about: '\u00c0 Propos',
    footer_faq: 'FAQ',
    footer_rights: 'Fa\u00e7onn\u00e9 en Suisse.',
    footer_note: 'Con\u00e7u avec soin, une suite \u00e0 la fois.',
  },

  en: {
    nav_home: 'Home', nav_suites: 'Wedding Suites', nav_jackets: 'Invitation Jackets',
    nav_collections: 'Collections', nav_shop: 'Shop', nav_bespoke: 'Bespoke', nav_info: 'Info',

    label_bundle: 'Wedding Suite', label_sleeve: 'Invitation Sleeve', label_place_card: 'Place Card',
    label_rsvp: 'RSVP Card', label_save_the_date: 'Save the Date', label_menu: 'Menu',
    label_glass_tag: 'Glass Tag', label_other: 'Invitation',
    view_collection: 'View Collection', pieces_available: 'pieces available', piece_available: 'piece available',
    shop_on_etsy: 'Shop on Etsy', inquire_to_order: 'Inquire to Order', request_custom_color: 'Request a Custom Color',
    also_in_collection: 'Also in this collection', personalize_collection: 'Personalize This Collection',
    view_available_pieces: 'View Available Pieces', whats_included: 'What\u2019s included', available_pieces: 'Available Pieces',
    gallery_label: 'Gallery', full_collection: 'The full collection', closer_look: 'A closer look', inquire: 'Inquire',
    all_filter: 'All', nothing_here: 'Nothing here yet', nothing_here_desc: 'Try a different category, or get in touch about a bespoke piece.',
    collection_not_found: 'Collection not found', product_not_found: 'Product not found',
    return_collections: 'Return to Collections', return_shop: 'Return to Shop',
    every_piece_personalized: 'Every piece is personalized with your names, wording, date and event details.',

    home_eyebrow: 'Switzerland \u2014 Est. Studio', home_title: 'Dear Daria',
    home_lede: 'Handmade wedding &amp; event stationery, designed and crafted in Switzerland. Choose an existing collection, adapt it to your colors, or commission something entirely your own.',
    btn_explore_collections: 'Explore the Collections', btn_create_bespoke: 'Create Something Bespoke',
    featured_eyebrow: 'Signature Collections', featured_title: 'Where every suite begins',
    featured_lede: 'A selection of our most-loved designs \u2014 each one available to personalize, recolor, or open as a starting point for something bespoke.',
    view_all_collections: 'View All Collections',
    signature_eyebrow: 'The Dear Daria Signature', jackets_title: 'Invitation Jackets &amp; Sleeves',
    jackets_text: 'Our invitations open like the day itself \u2014 layered, considered, a little theatrical. Every jacket and sleeve design can be personalized with your wording and, where available, adapted to a different color palette.',
    btn_explore_jackets: 'Explore Jackets &amp; Sleeves',
    suites_eyebrow: 'Complete &amp; Coordinated', suites_title: 'Wedding Suites',
    suites_text: 'From the invitation to the place card, a coordinated suite carries one story through every piece of the day \u2014 save the date, RSVP, menu, and the details in between.',
    btn_explore_suites: 'Explore Wedding Suites',

    myo_eyebrow: 'Three Ways to Begin', myo_title: 'Make It Yours',
    myo1_eyebrow: '01 \u2014 Personalize', myo1_title: 'An Existing Design',
    myo1_text: 'Choose an existing Dear Daria design and personalize the wording, names, dates, format and other details for your event.',
    myo2_eyebrow: '02 \u2014 Recolor', myo2_title: 'Choose Your Palette',
    myo2_text: 'An existing design can be adapted to your wedding or event palette, with a different cardstock and artwork color combination.',
    myo3_eyebrow: 'A Service of Its Own', myo3_title: 'Bespoke Creation',
    myo3_text: 'A completely new stationery design, created especially for your event \u2014 from the first conversation through to final production.',
    myo3_includes_label: 'This service can include:',
    myo3_li1: 'Defining the overall creative direction', myo3_li2: 'Choosing the color palette',
    myo3_li3: 'Choosing paper and cardstock', myo3_li4: 'Creating completely new floral, botanical or illustrative concepts',
    myo3_li5: 'Developing the invitation jacket or sleeve', myo3_li6: 'Designing the accompanying stationery pieces',
    myo3_li7: 'Refining the design together with you', myo3_li8: 'Preparing everything for final production',
    myo3_cta: 'Start a Bespoke Inquiry',

    collections_eyebrow: 'The Full Studio', collections_title: 'Collections',
    collections_lede: 'Every Dear Daria design family, from clean-lined botanicals to interactive gatefold invitations. Each collection can be personalized, and selected designs can be recolored to your palette.',

    ij_eyebrow: 'The Dear Daria Signature', ij_title: 'Invitation Jackets &amp; Sleeves',
    ij_lede: 'A layered opening moment for your guests. Every jacket and sleeve is personalized with your wording, and selected designs are available across multiple colorways.',
    browse_designs: 'Browse Designs', every_jacket_sleeve: 'Every jacket &amp; sleeve',

    ws_eyebrow: 'Complete &amp; Coordinated', ws_title: 'Wedding Suites',
    ws_lede: 'One story, carried through every piece of the day. Suites can include the invitation, save the date, RSVP, menu, place card and envelope liner \u2014 not every collection includes every piece.',
    browse_suites: 'Browse Suites', every_suite: 'Every coordinated collection',

    shop_eyebrow: 'Purchase Directly', shop_title: 'Shop',
    shop_lede: 'Every piece can be personalized with your names, wording and date. Filter by category to find exactly what your suite needs.',

    bespoke_eyebrow: 'Made Specifically For You', bespoke_title: 'Bespoke',
    bespoke_lede: 'A completely new design, considered around your venue, your season, your names. Every bespoke commission begins with a conversation.',
    btn_start_inquiry: 'Start an Inquiry', process_eyebrow: 'The Process', process_title: 'Four steps to your suite',
    step1_title: 'Tell me about your event', step1_text: 'Share your venue, season, colors, flowers, atmosphere and stationery requirements.',
    step2_title: 'Design', step2_text: 'A stationery concept is developed specifically around your event.',
    step3_title: 'Refinement', step3_text: 'Typography, colors, wording and details are refined together with you.',
    step4_title: 'Production', step4_text: 'The final stationery is carefully prepared, cut and produced by hand.',
    inquire_eyebrow: 'Start Here', inquire_title: 'Tell me about your day',
    field_name: 'Your Name(s)', field_email: 'Email', field_date: 'Event Date', field_venue: 'Venue / Location',
    field_details: 'Tell me about your event', field_details_placeholder: 'Colors, flowers, atmosphere, inspirations, and which pieces you\u2019re looking for...',
    btn_send_inquiry: 'Send Inquiry', submit_note_bespoke: 'Thank you \u2014 your inquiry has been noted. Dear Daria will be in touch shortly.',

    info_eyebrow: 'Studio Info', info_title: 'Info',
    about_eyebrow: 'About', about_title: 'A small Swiss studio, made by hand',
    about_text1: 'Dear Daria is a Switzerland-based stationery studio creating thoughtfully designed paper goods for weddings and meaningful celebrations. Each collection combines illustration, typography, paper and carefully considered details \u2014 with the possibility to personalize an existing design or create something entirely bespoke.',
    about_text2: 'Every piece is made with an eye for craftsmanship: die-cut edges, layered jackets, and interactive gatefold invitations that ask to be opened slowly.',
    hiw_eyebrow: 'How It Works', hiw_title: 'From browsing to your mailbox',
    hiw1_title: 'Choose', hiw1_text: 'Browse the Collections or Shop, and choose a design \u2014 or start a Bespoke inquiry.',
    hiw2_title: 'Personalize', hiw2_text: 'Share your names, wording, date, language and any color adjustments.',
    hiw3_title: 'Proof', hiw3_text: 'A digital proof is prepared for your approval before production begins.',
    hiw4_title: 'Production &amp; Delivery', hiw4_text: 'Your stationery is carefully produced and shipped, with timelines confirmed per order.',
    custom_eyebrow: 'Customization', custom_title: 'Three ways to make it yours',
    custom1_eyebrow: 'Personalize', custom1_title: 'An Existing Design',
    custom1_text: 'Names, wording, dates, language and event details can be personalized on any collection.',
    custom2_eyebrow: 'Recolor', custom2_title: 'Choose Your Colors',
    custom2_text: 'Selected collections can be adapted to another cardstock and artwork color palette.',
    custom3_eyebrow: 'Commission', custom3_title: 'A Bespoke Design',
    custom3_text: 'A completely new design can be commissioned specifically for your event \u2014 <a href="bespoke.html" style="text-decoration:underline;">start here</a>.',
    pro_eyebrow: 'For Wedding Professionals', pro_title: 'Collaboration, planner to planner',
    pro_text: 'Dear Daria collaborates with wedding planners, graphic designers and event professionals on individual weddings, editorial projects and custom stationery requirements \u2014 including collection customization, bespoke stationery, coordinated suites, custom colors and quantities.',
    pro_cta: 'Get in Touch',
    other_eyebrow: 'Beyond Weddings', other_title: 'Other Celebrations',
    other_text: 'Births, baptisms, baby celebrations, anniversaries, private dinners, birthdays and other meaningful occasions \u2014 Dear Daria also creates stationery beyond the wedding day.',
    other_cta: 'Start a bespoke inquiry',
    faq_eyebrow: 'FAQ', faq_title: 'Frequently Asked',
    faq1_q: 'How long does an order take?', faq1_a: 'Timelines vary by collection and quantity. Personalized orders typically require a proofing round before production; bespoke commissions begin with a design conversation. Exact timelines are confirmed per order.',
    faq2_q: 'Can I change the color of a collection?', faq2_a: 'Selected collections can be adapted to a different cardstock and artwork color. Not every design supports every color \u2014 ask when you inquire and we\u2019ll confirm what\u2019s possible.',
    faq3_q: 'Do you ship outside Switzerland?', faq3_a: 'Yes. Dear Daria ships internationally; shipping options and costs are confirmed at checkout or by inquiry for bespoke orders.',
    faq4_q: 'What\u2019s included in a wedding suite?', faq4_a: 'Suites can include an invitation jacket or sleeve, invitation, save the date, RSVP, details card, menu, place card and envelope liner. Not every collection includes every piece \u2014 each collection page lists what\u2019s available.',
    faq5_q: 'Can I order a single piece rather than a full suite?', faq5_a: 'Yes. Individual pieces, including save the dates, RSVP cards, menus and place cards, can be ordered on their own through the Shop.',
    contact_eyebrow: 'Contact', contact_title: 'Say Hello', field_message: 'Message',
    btn_send_message: 'Send Message', submit_note_contact: 'Thank you for reaching out \u2014 Dear Daria will reply soon.',
    contact_or: 'Or write directly to',

    footer_tagline: 'Handmade wedding &amp; event stationery, designed and crafted in Switzerland.',
    footer_explore: 'Explore', footer_studio: 'Studio', footer_contact: 'Get in Touch',
    footer_professionals: 'For Professionals', footer_about: 'About', footer_faq: 'FAQ',
    footer_rights: 'Handmade in Switzerland.', footer_note: 'Designed with care, one suite at a time.',
  },

  de: {
    nav_home: 'Start', nav_suites: 'Hochzeits-Sets', nav_jackets: 'Einladungsh\u00fcllen',
    nav_collections: 'Kollektionen', nav_shop: 'Shop', nav_bespoke: 'Ma\u00dfanfertigung', nav_info: 'Info',

    label_bundle: 'Hochzeits-Set', label_sleeve: 'Einladungsh\u00fclle', label_place_card: 'Platzkarte',
    label_rsvp: 'RSVP-Karte', label_save_the_date: 'Save the Date', label_menu: 'Men\u00fckarte',
    label_glass_tag: 'Glasanh\u00e4nger', label_other: 'Einladung',
    view_collection: 'Kollektion Ansehen', pieces_available: 'St\u00fccke verf\u00fcgbar', piece_available: 'St\u00fcck verf\u00fcgbar',
    shop_on_etsy: 'Bei Etsy Kaufen', inquire_to_order: 'Anfrage Senden', request_custom_color: 'Andere Farbe Anfragen',
    also_in_collection: 'Auch in dieser Kollektion', personalize_collection: 'Diese Kollektion Personalisieren',
    view_available_pieces: 'Verf\u00fcgbare St\u00fccke Ansehen', whats_included: 'Was enthalten ist', available_pieces: 'Verf\u00fcgbare St\u00fccke',
    gallery_label: 'Galerie', full_collection: 'Die gesamte Kollektion', closer_look: 'Ein n\u00e4herer Blick', inquire: 'Anfragen',
    all_filter: 'Alle', nothing_here: 'Hier gibt es noch nichts', nothing_here_desc: 'Versuchen Sie eine andere Kategorie oder kontaktieren Sie uns f\u00fcr eine Ma\u00dfanfertigung.',
    collection_not_found: 'Kollektion nicht gefunden', product_not_found: 'Produkt nicht gefunden',
    return_collections: 'Zur\u00fcck zu Kollektionen', return_shop: 'Zur\u00fcck zum Shop',
    every_piece_personalized: 'Jedes St\u00fcck wird mit Ihren Namen, Ihrem Text, Datum und Veranstaltungsdetails personalisiert.',

    home_eyebrow: 'Schweiz \u2014 Atelier', home_title: 'Dear Daria',
    home_lede: 'Handgefertigte Hochzeits- und Eventpapeterie, entworfen und hergestellt in der Schweiz. W\u00e4hlen Sie eine bestehende Kollektion, passen Sie sie farblich an, oder lassen Sie ein v\u00f6llig individuelles Design entwerfen.',
    btn_explore_collections: 'Kollektionen Entdecken', btn_create_bespoke: 'Ma\u00dfanfertigung Erstellen',
    featured_eyebrow: 'Signature-Kollektionen', featured_title: 'Wo jedes Set beginnt',
    featured_lede: 'Eine Auswahl unserer beliebtesten Designs \u2014 jedes personalisierbar, farblich anpassbar oder Ausgangspunkt f\u00fcr eine Ma\u00dfanfertigung.',
    view_all_collections: 'Alle Kollektionen Ansehen',
    signature_eyebrow: 'Die Dear Daria Signatur', jackets_title: 'Einladungsh\u00fcllen',
    jackets_text: 'Unsere Einladungen \u00f6ffnen sich wie der Tag selbst \u2014 vielschichtig, durchdacht, ein wenig theatralisch. Jede H\u00fclle kann mit Ihrem Text personalisiert und, sofern verf\u00fcgbar, in einer anderen Farbpalette gestaltet werden.',
    btn_explore_jackets: 'H\u00fcllen Entdecken',
    suites_eyebrow: 'Vollst\u00e4ndig &amp; Abgestimmt', suites_title: 'Hochzeits-Sets',
    suites_text: 'Von der Einladung bis zur Platzkarte erz\u00e4hlt ein abgestimmtes Set eine Geschichte durch jedes St\u00fcck des Tages \u2014 Save the Date, RSVP, Men\u00fckarte und die Details dazwischen.',
    btn_explore_suites: 'Hochzeits-Sets Entdecken',

    myo_eyebrow: 'Drei Wege zu Beginnen', myo_title: 'Machen Sie es zu Ihrem',
    myo1_eyebrow: '01 \u2014 Personalisieren', myo1_title: 'Ein Bestehendes Design',
    myo1_text: 'W\u00e4hlen Sie ein bestehendes Dear-Daria-Design und personalisieren Sie Text, Namen, Datum, Format und weitere Details f\u00fcr Ihre Veranstaltung.',
    myo2_eyebrow: '02 \u2014 Recolor', myo2_title: 'W\u00e4hlen Sie Ihre Farbpalette',
    myo2_text: 'Ein bestehendes Design kann an die Farbpalette Ihrer Hochzeit oder Veranstaltung angepasst werden, mit einer anderen Kartonfarbe und Illustrationsfarbe.',
    myo3_eyebrow: 'Ein Eigener Service', myo3_title: 'Ma\u00dfgeschneiderte Kreation',
    myo3_text: 'Ein v\u00f6llig neues Papeterie-Design, speziell f\u00fcr Ihre Veranstaltung entworfen \u2014 vom ersten Gespr\u00e4ch bis zur finalen Produktion.',
    myo3_includes_label: 'Dieser Service kann beinhalten:',
    myo3_li1: 'Festlegung der kreativen Gesamtrichtung', myo3_li2: 'Wahl der Farbpalette',
    myo3_li3: 'Wahl von Papier und Karton', myo3_li4: 'Entwicklung v\u00f6llig neuer floraler, botanischer oder illustrativer Konzepte',
    myo3_li5: 'Entwicklung der Einladungsh\u00fclle', myo3_li6: 'Gestaltung der begleitenden Papeterie-St\u00fccke',
    myo3_li7: 'Verfeinerung des Designs gemeinsam mit Ihnen', myo3_li8: 'Vollst\u00e4ndige Vorbereitung f\u00fcr die finale Produktion',
    myo3_cta: 'Ma\u00dfanfertigung Anfragen',

    collections_eyebrow: 'Das Gesamte Atelier', collections_title: 'Kollektionen',
    collections_lede: 'Jede Dear-Daria-Designfamilie, von klar-linigen botanischen Motiven bis zu interaktiven Falteinladungen. Jede Kollektion kann personalisiert werden, ausgew\u00e4hlte Designs auch farblich angepasst.',

    ij_eyebrow: 'Die Dear Daria Signatur', ij_title: 'Einladungsh\u00fcllen',
    ij_lede: 'Ein vielschichtiger \u00d6ffnungsmoment f\u00fcr Ihre G\u00e4ste. Jede H\u00fclle wird mit Ihrem Text personalisiert, ausgew\u00e4hlte Designs sind in mehreren Farbvarianten erh\u00e4ltlich.',
    browse_designs: 'Designs Durchsuchen', every_jacket_sleeve: 'Alle Einladungsh\u00fcllen',

    ws_eyebrow: 'Vollst\u00e4ndig &amp; Abgestimmt', ws_title: 'Hochzeits-Sets',
    ws_lede: 'Eine Geschichte, erz\u00e4hlt durch jedes St\u00fcck des Tages. Sets k\u00f6nnen Einladung, Save the Date, RSVP, Men\u00fckarte, Platzkarte und Umschlageinlage enthalten \u2014 nicht jede Kollektion enth\u00e4lt jedes St\u00fcck.',
    browse_suites: 'Sets Durchsuchen', every_suite: 'Alle abgestimmten Kollektionen',

    shop_eyebrow: 'Direkt Kaufen', shop_title: 'Shop',
    shop_lede: 'Jedes St\u00fcck kann mit Ihren Namen, Text und Datum personalisiert werden. Filtern Sie nach Kategorie, um genau das zu finden, was Ihr Set braucht.',

    bespoke_eyebrow: 'Speziell F\u00fcr Sie Gemacht', bespoke_title: 'Ma\u00dfanfertigung',
    bespoke_lede: 'Ein v\u00f6llig neues Design, abgestimmt auf Ihren Ort, Ihre Jahreszeit, Ihre Namen. Jede Ma\u00dfanfertigung beginnt mit einem Gespr\u00e4ch.',
    btn_start_inquiry: 'Anfrage Starten', process_eyebrow: 'Der Prozess', process_title: 'Vier Schritte zu Ihrem Set',
    step1_title: 'Erz\u00e4hlen Sie mir von Ihrer Veranstaltung', step1_text: 'Teilen Sie Ort, Jahreszeit, Farben, Blumen, Atmosph\u00e4re und Papeterie-Anforderungen mit.',
    step2_title: 'Design', step2_text: 'Ein Papeterie-Konzept wird speziell f\u00fcr Ihre Veranstaltung entwickelt.',
    step3_title: 'Verfeinerung', step3_text: 'Typografie, Farben, Text und Details werden gemeinsam mit Ihnen verfeinert.',
    step4_title: 'Produktion', step4_text: 'Die finale Papeterie wird sorgf\u00e4ltig vorbereitet, geschnitten und von Hand produziert.',
    inquire_eyebrow: 'Hier Beginnen', inquire_title: 'Erz\u00e4hlen Sie mir von Ihrem Tag',
    field_name: 'Ihr(e) Name(n)', field_email: 'E-Mail', field_date: 'Veranstaltungsdatum', field_venue: 'Ort',
    field_details: 'Erz\u00e4hlen Sie mir von Ihrer Veranstaltung', field_details_placeholder: 'Farben, Blumen, Atmosph\u00e4re, Inspirationen und welche St\u00fccke Sie suchen...',
    btn_send_inquiry: 'Anfrage Senden', submit_note_bespoke: 'Danke \u2014 Ihre Anfrage wurde erfasst. Dear Daria meldet sich bald bei Ihnen.',

    info_eyebrow: 'Atelier-Info', info_title: 'Info',
    about_eyebrow: '\u00dcber Uns', about_title: 'Ein kleines Schweizer Atelier, handgefertigt',
    about_text1: 'Dear Daria ist ein Papeterie-Atelier mit Sitz in der Schweiz, das durchdacht gestaltete Papierwaren f\u00fcr Hochzeiten und bedeutende Feiern schafft. Jede Kollektion vereint Illustration, Typografie, Papier und sorgf\u00e4ltig \u00fcberlegte Details \u2014 mit der M\u00f6glichkeit, ein bestehendes Design zu personalisieren oder etwas v\u00f6llig Ma\u00dfgeschneidertes zu schaffen.',
    about_text2: 'Jedes St\u00fcck wird mit Liebe zum Detail gefertigt: lasergeschnittene Kanten, mehrschichtige H\u00fcllen und interaktive Falteinladungen, die zum langsamen \u00d6ffnen einladen.',
    hiw_eyebrow: 'So Funktioniert Es', hiw_title: 'Vom St\u00f6bern bis zu Ihrem Briefkasten',
    hiw1_title: 'W\u00e4hlen', hiw1_text: 'Durchsuchen Sie Kollektionen oder Shop und w\u00e4hlen Sie ein Design \u2014 oder starten Sie eine Ma\u00dfanfertigungs-Anfrage.',
    hiw2_title: 'Personalisieren', hiw2_text: 'Teilen Sie Namen, Text, Datum, Sprache und gew\u00fcnschte Farbanpassungen mit.',
    hiw3_title: 'Freigabe', hiw3_text: 'Ein digitaler Entwurf wird zur Freigabe vorbereitet, bevor die Produktion beginnt.',
    hiw4_title: 'Produktion &amp; Lieferung', hiw4_text: 'Ihre Papeterie wird sorgf\u00e4ltig produziert und versandt, mit best\u00e4tigten Lieferzeiten pro Bestellung.',
    custom_eyebrow: 'Personalisierung', custom_title: 'Drei Wege, es zu Ihrem zu machen',
    custom1_eyebrow: 'Personalisieren', custom1_title: 'Ein Bestehendes Design',
    custom1_text: 'Namen, Text, Datum, Sprache und Veranstaltungsdetails k\u00f6nnen auf jeder Kollektion personalisiert werden.',
    custom2_eyebrow: 'Recolor', custom2_title: 'W\u00e4hlen Sie Ihre Farben',
    custom2_text: 'Ausgew\u00e4hlte Kollektionen k\u00f6nnen an eine andere Kartonfarbe und Illustrationsfarbpalette angepasst werden.',
    custom3_eyebrow: 'Beauftragen', custom3_title: 'Ein Ma\u00dfgeschneidertes Design',
    custom3_text: 'Ein v\u00f6llig neues Design kann speziell f\u00fcr Ihre Veranstaltung in Auftrag gegeben werden \u2014 <a href="bespoke.html" style="text-decoration:underline;">hier beginnen</a>.',
    pro_eyebrow: 'F\u00fcr Hochzeitsprofis', pro_title: 'Zusammenarbeit, Planer zu Planer',
    pro_text: 'Dear Daria arbeitet mit Hochzeitsplanern, Grafikdesignern und Eventprofis an individuellen Hochzeiten, redaktionellen Projekten und ma\u00dfgeschneiderten Papeterie-Anforderungen zusammen \u2014 einschlie\u00dflich Kollektionsanpassung, Ma\u00dfanfertigung, abgestimmten Sets sowie individuellen Farben und Mengen.',
    pro_cta: 'Kontakt Aufnehmen',
    other_eyebrow: 'Jenseits von Hochzeiten', other_title: 'Weitere Feiern',
    other_text: 'Geburten, Taufen, Babyfeiern, Jubil\u00e4en, private Dinner, Geburtstage und andere bedeutende Anl\u00e4sse \u2014 Dear Daria gestaltet auch Papeterie jenseits des Hochzeitstages.',
    other_cta: 'Ma\u00dfanfertigungs-Anfrage starten',
    faq_eyebrow: 'FAQ', faq_title: 'H\u00e4ufige Fragen',
    faq1_q: 'Wie lange dauert eine Bestellung?', faq1_a: 'Die Lieferzeiten variieren je nach Kollektion und Menge. Personalisierte Bestellungen erfordern in der Regel eine Freigaberunde vor der Produktion; Ma\u00dfanfertigungen beginnen mit einem Design-Gespr\u00e4ch. Genaue Zeitr\u00e4ume werden pro Bestellung best\u00e4tigt.',
    faq2_q: 'Kann ich die Farbe einer Kollektion \u00e4ndern?', faq2_a: 'Ausgew\u00e4hlte Kollektionen k\u00f6nnen an eine andere Kartonfarbe und Illustrationsfarbe angepasst werden. Nicht jedes Design unterst\u00fctzt jede Farbe \u2014 fragen Sie bei Ihrer Anfrage nach, und wir best\u00e4tigen, was m\u00f6glich ist.',
    faq3_q: 'Versenden Sie au\u00dferhalb der Schweiz?', faq3_a: 'Ja. Dear Daria versendet international; Versandoptionen und -kosten werden beim Checkout oder auf Anfrage f\u00fcr Ma\u00dfanfertigungen best\u00e4tigt.',
    faq4_q: 'Was ist in einem Hochzeits-Set enthalten?', faq4_a: 'Sets k\u00f6nnen eine Einladungsh\u00fclle, Einladung, Save the Date, RSVP, Detailkarte, Men\u00fckarte, Platzkarte und Umschlageinlage enthalten. Nicht jede Kollektion enth\u00e4lt jedes St\u00fcck \u2014 jede Kollektionsseite listet auf, was verf\u00fcgbar ist.',
    faq5_q: 'Kann ich ein einzelnes St\u00fcck statt eines ganzen Sets bestellen?', faq5_a: 'Ja. Einzelne St\u00fccke, einschlie\u00dflich Save the Dates, RSVP-Karten, Men\u00fckarten und Platzkarten, k\u00f6nnen einzeln \u00fcber den Shop bestellt werden.',
    contact_eyebrow: 'Kontakt', contact_title: 'Sagen Sie Hallo', field_message: 'Nachricht',
    btn_send_message: 'Nachricht Senden', submit_note_contact: 'Danke f\u00fcr Ihre Nachricht \u2014 Dear Daria antwortet bald.',
    contact_or: 'Oder schreiben Sie direkt an',

    footer_tagline: 'Handgefertigte Hochzeits- und Eventpapeterie, entworfen und hergestellt in der Schweiz.',
    footer_explore: 'Entdecken', footer_studio: 'Atelier', footer_contact: 'Kontakt',
    footer_professionals: 'F\u00fcr Profis', footer_about: '\u00dcber Uns', footer_faq: 'FAQ',
    footer_rights: 'Handgefertigt in der Schweiz.', footer_note: 'Mit Sorgfalt gestaltet, ein Set nach dem anderen.',
  },
};

DearDaria.getLang = function () {
  return localStorage.getItem('dd_lang') || 'fr';
};

DearDaria.setLang = function (lang) {
  localStorage.setItem('dd_lang', lang);
  DearDaria.applyTranslations();
};

DearDaria.t = function (key) {
  const lang = DearDaria.getLang();
  return (DearDaria.TRANSLATIONS[lang] && DearDaria.TRANSLATIONS[lang][key]) || DearDaria.TRANSLATIONS.fr[key] || key;
};

DearDaria.applyTranslations = function () {
  const lang = DearDaria.getLang();
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = DearDaria.t(key);
    if (el.hasAttribute('data-i18n-placeholder')) {
      el.setAttribute('placeholder', val);
    } else if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const [attr, key] = el.getAttribute('data-i18n-attr').split(':');
    el.setAttribute(attr, DearDaria.t(key));
  });
  // re-render any dynamic grids that depend on language (product/collection labels)
  if (DearDaria.reRenderDynamic) DearDaria.reRenderDynamic();
};

DearDaria.renderLangSwitcher = function (mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const current = DearDaria.getLang();
  mount.innerHTML = DearDaria.LANGS.map(
    (l) => `<button class="lang-btn ${l === current ? 'active' : ''}" data-lang="${l}">${l.toUpperCase()}</button>`
  ).join('');
  mount.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      DearDaria.setLang(btn.dataset.lang);
      DearDaria.renderLangSwitcher(mountId);
    });
  });
};
