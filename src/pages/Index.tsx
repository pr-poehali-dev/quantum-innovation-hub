import ArcGalleryHero from "@/components/ArcGalleryHero";

const games = [
  {
    icon: "https://cdn.poehali.dev/projects/52a0b466-79d2-4d9c-8c72-58f1d3bf200a/files/2114e26a-ff27-47ec-9f43-beefb8c947b0.jpg",
    title: "Blade of Legends",
    url: "#",
  },
  {
    icon: "https://cdn.poehali.dev/projects/52a0b466-79d2-4d9c-8c72-58f1d3bf200a/files/6b32b0c0-d844-44cc-8c26-54af29c06c7f.jpg",
    title: "Star Blaster",
    url: "#",
  },
  {
    icon: "https://cdn.poehali.dev/projects/52a0b466-79d2-4d9c-8c72-58f1d3bf200a/files/8fbe7d80-eece-4fa4-99ae-a8c3f362d3ff.jpg",
    title: "Rune Puzzle",
    url: "#",
  },
  {
    icon: "https://cdn.poehali.dev/projects/52a0b466-79d2-4d9c-8c72-58f1d3bf200a/files/8f6b7d4d-efdb-403d-b1d6-8c407ce9792f.jpg",
    title: "Turbo Race",
    url: "#",
  },
  {
    icon: "https://cdn.poehali.dev/projects/52a0b466-79d2-4d9c-8c72-58f1d3bf200a/files/d118385b-ab8d-49d8-8e37-6fb734fd5e7c.jpg",
    title: "Dead Zone",
    url: "#",
  },
  {
    icon: "https://cdn.poehali.dev/projects/52a0b466-79d2-4d9c-8c72-58f1d3bf200a/files/16f86071-de77-49c3-940e-29ffb9c4bfff.jpg",
    title: "Castle Siege",
    url: "#",
  },
  {
    icon: "https://cdn.poehali.dev/projects/52a0b466-79d2-4d9c-8c72-58f1d3bf200a/files/f6f0952d-7958-4e5f-9c8b-53ca6ccac653.jpg",
    title: "Happy Farm",
    url: "#",
  },
];

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background">
      <ArcGalleryHero
        games={games}
        logoText="GameDev Studio"
        title="Создаю игры, в которые хочется играть"
        subtitle="Мобильные и компьютерные игры — от идеи до релиза в магазинах приложений"
        startAngle={20}
        endAngle={160}
        radiusLg={480}
        radiusMd={360}
        radiusSm={260}
        cardSizeLg={120}
        cardSizeMd={100}
        cardSizeSm={80}
        className="pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24"
      />
    </main>
  );
};

export default Index;
