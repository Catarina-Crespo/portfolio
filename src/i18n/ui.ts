/**
 * UI TRANSLATIONS
 * ---------------
 * All static site copy lives here, keyed by locale. Work content itself
 * (videos, photos, descriptions) lives in src/content/ instead — this file
 * is only for chrome: nav labels, section titles, buttons, etc.
 *
 * To add a new string: add the key under both `en` and `pt`, then read it
 * with t('your.key') inside any page/component (see src/i18n/utils.ts).
 */
export const languages = {
  en: 'English',
  pt: 'Português',
} as const;

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.filming': 'Filming',
    'nav.photography': 'Photography',
    'nav.stopmotion': 'Stop Motion',
    'nav.other': 'Other Works',
    'nav.about': 'About Me',
    'nav.contact': 'Contact Me',
    'nav.menu': 'Menu',
    'nav.close': 'Close menu',
    'nav.langSwitch': 'Switch to Portuguese',

    'common.watch': 'Watch',
    'common.play': 'Play',
    'common.viewProject': 'View project',
    'common.viewGallery': 'View gallery',
    'common.comingSoon': 'Coming soon',
    'common.backToTop': 'Back to top',
    'common.close': 'Close',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.allWork': 'See all work',
    'common.getInTouch': 'Get in touch',
    'common.readMore': 'Read more',

    'home.eyebrow': 'Showreel — 2026',
    'home.title': "Stories, framed and\ncut to the beat.",
    'home.subtitle':
      'I’m {name}, a {role} working across film, photography and stop motion — from first frame to final grade.',
    'home.cta.primary': 'Watch the reel',
    'home.cta.secondary': 'See the work',
    'home.highlight.eyebrow': 'Now Playing',
    'home.highlight.title': 'Highlight Reel',
    'home.highlight.description':
      'A short cut of recent favourites — interviews, short films, events and a bit of stop motion, all in one take.',
    'home.disciplines.eyebrow': 'What I do',
    'home.disciplines.title': 'Four crafts, one eye',
    'home.disciplines.filming.title': 'Filming',
    'home.disciplines.filming.desc': 'Interviews, short films and videoclips, shot and edited end to end.',
    'home.disciplines.photography.title': 'Photography',
    'home.disciplines.photography.desc': 'Events and landscapes, chasing light worth keeping.',
    'home.disciplines.stopmotion.title': 'Stop Motion',
    'home.disciplines.stopmotion.desc': 'Frame-by-frame worlds built from LEGO and everything else.',
    'home.disciplines.other.title': 'Other Works',
    'home.disciplines.other.desc': '3D design, motion graphics and the odd side project.',
    'home.selected.eyebrow': 'Selected Work',
    'home.selected.title': 'Recently in the edit bay',
    'home.stats.eyebrow': 'By the numbers',
    'home.stats.years': 'Years behind the camera',
    'home.stats.projects': 'Projects delivered',
    'home.stats.events': 'Events covered',
    'home.stats.frames': 'Stop-motion frames shot',
    'home.cta.footer.title': "Got a story worth telling?",
    'home.cta.footer.desc': "I'm currently booking new projects — let's talk about yours.",

    'filming.eyebrow': 'Filming',
    'filming.title': 'Film & Video',
    'filming.intro':
      'Everything from sit-down interviews to short narrative work — shot, directed and edited by me.',
    'filming.interviews.title': 'Interviews',
    'filming.interviews.desc': 'Conversations shot with intention — clean audio, considered light, honest cuts.',
    'filming.shortfilms.title': 'Short Films',
    'filming.shortfilms.desc': 'Narrative and documentary short-form work.',
    'filming.videoclips.title': 'Videoclips',
    'filming.videoclips.desc': 'Music videos and performance pieces.',
    'filming.videoclips.empty': 'New videoclips are in production — check back soon.',

    'photography.eyebrow': 'Photography',
    'photography.title': 'Photography',
    'photography.intro':
      'A running archive of events and landscapes — shot on location, sequenced here as a contact sheet.',
    'photography.events.title': 'Events',
    'photography.events.desc': 'Coverage from live events, day-of galleries.',
    'photography.landscape.title': 'Landscape',
    'photography.landscape.desc': 'Quiet frames from wherever the light was good.',

    'stopmotion.eyebrow': 'Stop Motion',
    'stopmotion.title': 'Stop Motion',
    'stopmotion.intro':
      'One frame at a time. It started as a hobby, but I finally turned into a small LEGO filmography — reels, shorts and a couple of proper films.',
    'stopmotion.filter.all': 'All',
    'stopmotion.filter.other': 'Other',
    'stopmotion.filter.lego': 'LEGO',
    'stopmotion.format.reel': 'Reel',
    'stopmotion.format.short-film': 'Short Film',
    'stopmotion.format.film': 'Film',
    'stopmotion.format.upcoming': 'Upcoming',
    'stopmotion.upcoming.title': 'In Production',
    'stopmotion.upcoming.desc': 'The next one is currently on the animation table.',
    'stopmotion.vertical.title': 'Shorts & Reels',
    'stopmotion.vertical.desc': 'Vertical cuts, made for phones — swipe or scroll through.',

    'home.testimonials.eyebrow': 'Testimonials',
    'home.testimonials.title': 'What people say',

    'other.eyebrow': 'Other Works',
    'other.title': 'Other Works',
    'other.intro': 'The work that doesn’t sit neatly in film, photo or stop motion.',
    'other.3d.title': '3D Design',
    'other.3d.desc': 'Modeling, texturing and rendering.',
    'other.motion.title': 'Motion Graphics',
    'other.motion.desc': 'Animated titles, explainers and identity work.',
    'other.design.title': 'Design Projects',
    'other.design.desc': 'Graphic design and visual identity work on the side.',

    'about.eyebrow': 'About',
    'about.title': 'About Me',
    'about.intro':
      "I'm {name} — I make things with cameras, light and far too many browser tabs full of reference footage.",
    'about.bio.p1':
      'I started out filming friends on a hand-me-down camera and never really stopped. These days that curiosity has turned into a practice that moves between documentary interviews, short films, event photography and, when the schedule allows, weeks of patient, frame-by-frame stop motion.',
    'about.bio.p2':
      'What ties it together is pacing — how a cut, a frame or a single beat of movement can change how something feels. I care as much about the edit as I do about the shoot itself.',
    'about.skills.title': 'Tools & Skills',
    'about.timeline.title': 'A Rough Timeline',
    'about.cta.title': "Like what you see?",
    'about.cta.desc': "Let's make something together.",

    'contact.eyebrow': 'Contact',
    'contact.title': 'Contact Me',
    'contact.intro':
      "Have a project in mind, or just want to say hi? My inbox is open — I try to reply within a couple of days.",
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send message',
    'contact.form.sending': 'Opening your email client…',
    'contact.direct.title': 'Direct',
    'contact.social.title': 'Elsewhere',
    'contact.location.title': 'Based in',

    'footer.rights': 'All rights reserved.',
    'footer.made': 'Built frame by frame.',

    'meta.home.description':
      'Portfolio of a filmmaker and visual storyteller working across film, photography and stop motion.',
    'meta.filming.description': 'Interviews, short films and videoclips.',
    'meta.photography.description': 'Event and landscape photography.',
    'meta.stopmotion.description': 'LEGO stop-motion films.',
    'meta.other.description': '3D design, motion graphics and design projects.',
    'meta.about.description': 'A little about who is behind the camera.',
    'meta.contact.description': 'Get in touch about a project.',
  },
  pt: {
    'nav.home': 'Início',
    'nav.filming': 'Filmagem',
    'nav.photography': 'Fotografia',
    'nav.stopmotion': 'Stop Motion',
    'nav.other': 'Outros Trabalhos',
    'nav.about': 'Sobre Mim',
    'nav.contact': 'Contacte-me',
    'nav.menu': 'Menu',
    'nav.close': 'Fechar menu',
    'nav.langSwitch': 'Mudar para Inglês',

    'common.watch': 'Ver',
    'common.play': 'Reproduzir',
    'common.viewProject': 'Ver projeto',
    'common.viewGallery': 'Ver galeria',
    'common.comingSoon': 'Brevemente',
    'common.backToTop': 'Voltar ao topo',
    'common.close': 'Fechar',
    'common.next': 'Seguinte',
    'common.previous': 'Anterior',
    'common.allWork': 'Ver todos os trabalhos',
    'common.getInTouch': 'Entre em contacto',
    'common.readMore': 'Ler mais',

    'home.eyebrow': 'Showreel — 2026',
    'home.title': 'Histórias, enquadradas\ne cortadas ao ritmo.',
    'home.subtitle':
      'Sou {name}, {role} a trabalhar em filme, fotografia e stop motion — do primeiro frame à cor final.',
    'home.cta.primary': 'Ver o showreel',
    'home.cta.secondary': 'Ver trabalhos',
    'home.highlight.eyebrow': 'A Reproduzir',
    'home.highlight.title': 'Showreel de Destaque',
    'home.highlight.description':
      'Um corte curto com os favoritos recentes — entrevistas, curtas-metragens, eventos e um pouco de stop motion, tudo numa só sequência.',
    'home.disciplines.eyebrow': 'O que faço',
    'home.disciplines.title': 'Quatro áreas, um só olhar',
    'home.disciplines.filming.title': 'Filmagem',
    'home.disciplines.filming.desc': 'Entrevistas, curtas-metragens e videoclipes, filmados e editados do início ao fim.',
    'home.disciplines.photography.title': 'Fotografia',
    'home.disciplines.photography.desc': 'Eventos e paisagens, à procura da luz que vale a pena guardar.',
    'home.disciplines.stopmotion.title': 'Stop Motion',
    'home.disciplines.stopmotion.desc': 'Mundos construídos frame a frame, em LEGO e tudo o resto.',
    'home.disciplines.other.title': 'Outros Trabalhos',
    'home.disciplines.other.desc': 'Design 3D, motion graphics e alguns projetos paralelos.',
    'home.selected.eyebrow': 'Trabalhos Selecionados',
    'home.selected.title': 'Recentemente na mesa de edição',
    'home.stats.eyebrow': 'Em números',
    'home.stats.years': 'Anos atrás da câmara',
    'home.stats.projects': 'Projetos entregues',
    'home.stats.events': 'Eventos cobertos',
    'home.stats.frames': 'Frames de stop motion filmados',
    'home.cta.footer.title': 'Tem uma história para contar?',
    'home.cta.footer.desc': 'Estou a aceitar novos projetos — vamos falar sobre o seu.',

    'filming.eyebrow': 'Filmagem',
    'filming.title': 'Filme & Vídeo',
    'filming.intro':
      'Desde entrevistas a curtas-metragens narrativas — filmado, realizado e editado por mim.',
    'filming.interviews.title': 'Entrevistas',
    'filming.interviews.desc': 'Conversas filmadas com intenção — áudio limpo, luz pensada, cortes honestos.',
    'filming.shortfilms.title': 'Curtas-Metragens',
    'filming.shortfilms.desc': 'Trabalhos narrativos e documentais de curta duração.',
    'filming.videoclips.title': 'Videoclipes',
    'filming.videoclips.desc': 'Videoclipes musicais e peças de performance.',
    'filming.videoclips.empty': 'Novos videoclipes estão em produção — volte em breve.',

    'photography.eyebrow': 'Fotografia',
    'photography.title': 'Fotografia',
    'photography.intro':
      'Um arquivo contínuo de eventos e paisagens — fotografado no local, aqui organizado como uma folha de contacto.',
    'photography.events.title': 'Eventos',
    'photography.events.desc': 'Cobertura de eventos ao vivo, galerias do próprio dia.',
    'photography.landscape.title': 'Paisagem',
    'photography.landscape.desc': 'Enquadramentos tranquilos de onde a luz estava boa.',

    'stopmotion.eyebrow': 'Stop Motion',
    'stopmotion.title': 'Stop Motion',
    'stopmotion.intro':
      'Um frame de cada vez. Começou como um hobby, mas acabou por se transformar numa pequena filmografia LEGO — reels, curtas e alguns filmes a sério.',
    'stopmotion.filter.all': 'Todos',
    'stopmotion.filter.other': 'Outros',
    'stopmotion.filter.lego': 'LEGO',
    'stopmotion.format.reel': 'Reel',
    'stopmotion.format.short-film': 'Curta-Metragem',
    'stopmotion.format.film': 'Filme',
    'stopmotion.format.upcoming': 'Brevemente',
    'stopmotion.upcoming.title': 'Em Produção',
    'stopmotion.upcoming.desc': 'O próximo está atualmente na mesa de animação.',
    'stopmotion.vertical.title': 'Shorts & Reels',
    'stopmotion.vertical.desc': 'Cortes verticais, feitos para telemóvel — deslize ou percorra.',

    'home.testimonials.eyebrow': 'Testemunhos',
    'home.testimonials.title': 'O que dizem as pessoas',

    'other.eyebrow': 'Outros Trabalhos',
    'other.title': 'Outros Trabalhos',
    'other.intro': 'O trabalho que não se encaixa bem em filme, foto ou stop motion.',
    'other.3d.title': 'Design 3D',
    'other.3d.desc': 'Modelação, texturização e renderização.',
    'other.motion.title': 'Motion Graphics',
    'other.motion.desc': 'Títulos animados, explicativos e trabalho de identidade.',
    'other.design.title': 'Projetos de Design',
    'other.design.desc': 'Design gráfico e identidade visual como projetos paralelos.',

    'about.eyebrow': 'Sobre',
    'about.title': 'Sobre Mim',
    'about.intro':
      'Sou {name} — faço coisas com câmaras, luz e demasiados separadores do browser cheios de imagens de referência.',
    'about.bio.p1':
      'Comecei por filmar amigos com uma câmara emprestada e nunca mais parei. Hoje essa curiosidade tornou-se numa prática que passa por entrevistas documentais, curtas-metragens, fotografia de eventos e, quando a agenda permite, semanas de stop motion, frame a frame.',
    'about.bio.p2':
      'O que liga tudo isto é o ritmo — como um corte, um enquadramento ou um único movimento pode mudar a forma como algo é sentido. Preocupo-me tanto com a edição como com a própria filmagem.',
    'about.skills.title': 'Ferramentas & Competências',
    'about.timeline.title': 'Um Percurso Resumido',
    'about.cta.title': 'Gostou do que viu?',
    'about.cta.desc': 'Vamos criar algo juntos.',

    'contact.eyebrow': 'Contacto',
    'contact.title': 'Contacte-me',
    'contact.intro':
      'Tem um projeto em mente, ou só quer dizer olá? A minha caixa de entrada está aberta — costumo responder em poucos dias.',
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Assunto',
    'contact.form.message': 'Mensagem',
    'contact.form.submit': 'Enviar mensagem',
    'contact.form.sending': 'A abrir o seu email…',
    'contact.direct.title': 'Direto',
    'contact.social.title': 'Noutros Sítios',
    'contact.location.title': 'Baseado em',

    'footer.rights': 'Todos os direitos reservados.',
    'footer.made': 'Construído frame a frame.',

    'meta.home.description':
      'Portefólio de um cineasta e contador de histórias visuais, entre filme, fotografia e stop motion.',
    'meta.filming.description': 'Entrevistas, curtas-metragens e videoclipes.',
    'meta.photography.description': 'Fotografia de eventos e paisagem.',
    'meta.stopmotion.description': 'Filmes de stop motion em LEGO.',
    'meta.other.description': 'Design 3D, motion graphics e projetos de design.',
    'meta.about.description': 'Um pouco sobre quem está atrás da câmara.',
    'meta.contact.description': 'Entre em contacto sobre um projeto.',
  },
} as const;
