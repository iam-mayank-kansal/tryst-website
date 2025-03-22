export const events = {
    day1: [
        {
            title: "Hackathon",
            time: "10:00 AM - 8:00 PM",
            venue: "Computer Lab",
            description: "24-hour coding competition to build innovative solutions.",
        },
        {
            title: "Battle of Bands",
            time: "4:00 PM - 7:00 PM",
            venue: "Main Stage",
            description: "Music competition featuring the best college bands.",
        },
        {
            title: "Art Exhibition",
            time: "11:00 AM - 6:00 PM",
            venue: "Art Gallery",
            description: "Showcase of student artwork from across universities.",
        },
    ],
    day2: [
        {
            title: "Dance Competition",
            time: "2:00 PM - 5:00 PM",
            venue: "Auditorium",
            description: "Solo and group dance performances across various styles.",
        },
        {
            title: "Fashion Show",
            time: "6:00 PM - 8:00 PM",
            venue: "Main Stage",
            description: "Student designers showcase their creative collections.",
        },
        {
            title: "Treasure Hunt",
            time: "11:00 AM - 3:00 PM",
            venue: "Campus Wide",
            description: "Team-based competition to solve clues and find treasures.",
        },
    ],
    day3: [
        {
            title: "Celebrity Performance",
            time: "7:00 PM - 10:00 PM",
            venue: "Main Stage",
            description: "Special performance by a surprise celebrity artist.",
        },
        {
            title: "Debate Competition",
            time: "1:00 PM - 4:00 PM",
            venue: "Conference Hall",
            description: "Inter-college debate on contemporary topics.",
        },
        {
            title: "Award Ceremony",
            time: "5:00 PM - 6:30 PM",
            venue: "Auditorium",
            description: "Closing ceremony and distribution of prizes to winners.",
        },
    ],
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
        description: "March 15-17, 2025 | 10:00 AM - 10:00 PM",
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