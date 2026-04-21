import ArcGalleryHero from "@/components/ArcGalleryHero";

const games = [
  { icon: "", title: "", url: "" },
  { icon: "", title: "", url: "" },
  {
    icon: "https://cdn.poehali.dev/files/ac1a2aac-def7-45af-aee8-7ca9bd6b27e8.png",
    title: "TotAL RPG",
    url: "https://www.rustore.ru/catalog/app/com.tzargamestudio.endless",
  },
  {
    icon: "https://cdn.poehali.dev/files/2a555167-b25c-4951-be14-0385f08b8ee9.png",
    title: "Волны и Порох",
    url: "https://www.rustore.ru/catalog/app/com.Vopere.BoansandNopox",
  },
  { icon: "", title: "", url: "" },
  { icon: "", title: "", url: "" },
  { icon: "", title: "", url: "" },
];

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background">
      <ArcGalleryHero
        games={games}
        logoImage="https://cdn.poehali.dev/files/5640461a-5dd2-451e-b9e0-5ffae55ae80d.png"
        logoText="Игры в опере"
        title="Создаём игры, в которые хочется играть"
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