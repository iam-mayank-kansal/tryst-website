// Event data

export const events = {
    day1: [
      {
        title: "Nrityaang - UTHAAN (Solo Classical Dance)",
        time: "10:15 AM - 11:30 AM",
        venue: "Auditorium",
        description: "Elegance meets tradition! Witness mesmerizing classical moves in a solo spectacle.",
        registrationLink: "https://forms.gle/BonDTesEN9sAcoSQ8" // For UTHAAN
      },
      {
        title: "MRIDANG (Group Folk Dance)",
        time: "11:45 AM - 1:15 PM",
        venue: "Auditorium",
        description: "Vibrant beats, colorful swirls—folk tales come alive in this electrifying dance battle!",
        registrationLink: "https://forms.gle/YeM5Usg2oorNmNK88" // For MRIDANG
      },
      {
        title: "Advaitaa - Nazaat (Western Solo Dance)",
        time: "2:00 PM - 3:30 PM",
        venue: "Auditorium",
        description: "One stage, one performer, infinite energy! Get ready for jaw-dropping Western moves!"
      },
      {
        title: "Inaayat (Western Group Dance)",
        time: "3:45 PM - 6:00 PM",
        venue: "Auditorium",
        description: "Teamwork, passion, and flawless moves—watch groups own the dance floor!"
      },
      {
        title: "Shades (Street Play Competition)",
        time: "10:00 AM - 3:00 PM",
        venue: "Shades Lawn",
        description: "Unfiltered. Unapologetic. Street theatre that makes you think, feel, and act!"
      },
      {
        title: "DebSoc (Debate Competition)",
        time: "10:00 AM - 5:00 PM",
        venue: "Seminar Room",
        description: "Fiery arguments, razor-sharp wit—only the best debater will rise to the top!"
      },
      {
        title: "Maniera: Atrang Rangmanch (Art Exhibition)",
        time: "11:00 AM - 3:00 PM",
        venue: "Lecture Hall 1",
        description: "A creative explosion of colors, strokes, and imagination—an artist's paradise!",
        registrationLink: "https://linktr.ee/ManieraKmv"
      },
      {
        title: "Chitrakala (Solo Painting Competition)",
        time: "11:00 AM - 2:00 PM",
        venue: "LT-1",
        description: "One canvas, one vision—watch artists bring their thoughts to life!"
      },
      {
        title: "Kala Sangini (Duo Painting Competition)",
        time: "11:00 AM - 2:00 PM",
        venue: "LT-3",
        description: "Two minds, one masterpiece! A fusion of creativity like never before!"
      },
      {
        title: "Illuminati (Competitions)",
        time: "9:00 AM - 6:00 PM",
        venue: "Lecture Hall-2",
        description: "From brain teasers to skill battles—only the sharpest minds will win!"
      },
      {
        title: "Vagmita (Literary Events)",
        time: "9:00 AM - 5:00 PM",
        venue: "LT-4",
        description: "Where words weave magic—poetry, storytelling, and literature at its best!",
        registrationLink: "https://linktr.ee/PoetryVagmita?utm_source=linktree_admin_share"
      },
      {
        title: "Anhad (Battle of Bands)",
        time: "10:00 AM - 1:00 PM",
        venue: "Amphitheatre",
        description: "Drums rolling, guitars roaring—bands clash in a high-voltage musical war!"
      },
      {
        title: "Performance Showcase",
        time: "2:00 PM - 4:30 PM",
        venue: "Amphitheatre",
        description: "Surprise acts, guest stars, and pure entertainment—don't miss the magic!"
      }
    ],
    day2: [
      {
        title: "Shades – Mime Competition",
        time: "10:00 AM - 12:00 PM",
        venue: "Auditorium",
        description: "Actions speak louder than words—watch silent stories come to life!"
      },
      {
        title: "Naksh – Envogue (Group Fashion Competition)",
        time: "2:00 PM - 5:00 PM",
        venue: "Auditorium",
        description: "Strut, slay, and own the runway—fashion meets passion!"
      },
      {
        title: "DebSoc – Panel Discussion & Awards",
        time: "10:00 AM - 12:00 PM",
        venue: "Seminar Room",
        description: "Intellect meets debate—witness insights, ideas, and inspiration."
      },
      {
        title: "Illuminati – Photography Competitions",
        time: "9:00 AM - 5:00 PM",
        venue: "Lecture Hall 1 & 2",
        description: "Freeze the moment, frame the magic—where every click tells a story!"
      },
      {
        title: "Vagmita – Poetry Slam",
        time: "10:00 AM - 12:00 PM",
        venue: "LT 4",
        description: "Verses with voices, emotions that echo!",
        registrationLink: "https://forms.gle/e1LacJugmYVU81kj9"
      },
      {
        title: "Anhad – Final Performances",
        time: "12:00 PM - 2:00 PM",
        venue: "Amphitheatre",
        description: "Melodies, magic, and musical mastery—witness the grand finale!"
      }
    ]
  };

export interface Artist {
    id: number;
    name: string;
    genre: string;
    image: string;
    bio: string;
}

export const artists: Artist[] = [
    {
        id: 1,
        name: "B PRAAK",
        genre: "Pop",
        image: "/artist/BPRAAK.png",
        bio: "B PRAAK is a celebrated playback singer and music composer in Bollywood, known for his soulful voice and hit songs like 'Mann Bharryaa' and 'Filhall'. He is extremely popular among the youth.",
    },
    {
        id: 2,
        name: "Jassie Gill",
        genre: "Punjabi",
        image: "/artist/jassie_gill.jpg",
        bio: "Jassie Gill is a popular Punjabi singer and actor, famous for his melodious voice and energetic performances in both music and films. His songs like 'Patiala Peg' and 'Leke Pehla Pehla Pyaar' are youth favorites.",
    },
    {
        id: 3,
        name: "Milind Gaba",
        genre: "Pop",
        image: "/artist/milind_gaba.webp",
        bio: "Milind Gaba is a well-known Indian singer and music composer, recognized for his catchy tunes and vibrant stage presence. His songs like 'She Don't Know' and 'High Rated Gabru' are widely loved by young audiences.",
    },
    {
        id: 4,
        name: "IKKA",
        genre: "Hip Hop",
        image: "/artist/Ikka.jpg",
        bio: "IKKA is a renowned Indian rapper and lyricist known for his impactful verses and contributions to the Indian hip-hop scene. His collaborations with artists like Badshah and Divine make him a favorite among the youth.",
    },
    {
        id: 5,
        name: "NIKK",
        genre: "Pop",
        image: "/artist/nikk.jpg",
        bio: "NIKK is a rising star in the music industry, known for her versatile voice and captivating performances. Her recent hits have made her a popular choice among young listeners.",
    },
    {
        id: 6,
        name: "Antariksi",
        genre: "Electronic",
        image: "/artist/Antariksh.jpg",
        bio: "Antariksi is known for blending electronic beats with classical Indian music, creating a unique fusion experience that has captivated audiences worldwide. Her experimental sound appeals to the younger generation.",
    },
];

export const infoCards = [
    {
        icon: "MapPin",
        title: "Venue",
        description: "Keshav Mahavidyalaya Campus, Delhi University North Campus",
    },
    {
        icon: "Calendar",
        title: "Dates & Time",
        description: "April 21-22, 2025 | 10:00 AM - 10:00 PM",
    },
    {
        icon: "Music",
        title: "Event Highlights",
        description: "Live Performances, Dance Competitions, Hackathon, Food Festival",
    },
];

export const galleryImages = {
    "2024": [
        "/gallery/gallery_2024_2.jpg",
        "/gallery/gallery_2024_9.jpg",
        "/gallery/gallery_2024_8.jpg",
        "/gallery/gallery_2024_3.jpg",
        "/gallery/gallery_2024_4.jpg",
        "/gallery/gallery_2024_7.jpg",
        "/gallery/gallery_2024_5.jpg",
        "/gallery/gallery_2024_6.jpg",
        "/gallery/gallery_2024_1.jpg",
    ],
    "2023": [
        "/gallery/gallery_2024_8.jpg",
        "/gallery/gallery_2024_3.jpg",
        "/gallery/gallery_2024_9.jpg",
        "/gallery/gallery_2024_5.jpg",
        "/gallery/gallery_2024_7.jpg",
        "/gallery/gallery_2024_1.jpg",
        "/gallery/gallery_2024_4.jpg",
        "/gallery/gallery_2024_6.jpg",
        "/gallery/gallery_2024_2.jpg",
    ],
    "2022": [
        "/gallery/gallery_2024_2.jpg",
        "/gallery/gallery_2024_3.jpg",
        "/gallery/gallery_2024_7.jpg",
        "/gallery/gallery_2024_9.jpg",
        "/gallery/gallery_2024_8.jpg",
        "/gallery/gallery_2024_4.jpg",
        "/gallery/gallery_2024_5.jpg",
        "/gallery/gallery_2024_6.jpg",
        "/gallery/gallery_2024_1.jpg",
    ],
};