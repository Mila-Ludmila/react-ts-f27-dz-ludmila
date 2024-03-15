interface ICity {
  name: string;
  country: string;
  founded: number | string;
  population: number | string;
  photos: string[];
  weather: { description: string; icon: string }[];
}

interface IChildComponent {
  city: ICity;
  info: ICity;
}

function convertToPhotoObject(photo: string): { src: string } {
  return { src: photo };
}

export default function ChildComponent({
  city,
  info,
}: IChildComponent): JSX.Element {
  const cityInfo = {
    name: "Odesa",
    country: "Ukraine",
    founded: 1795,
    population: 1010537,
    photos: ["/photos/Потьомкінські_сходи_11.jpg",
  ],
    weather: [{ description: "Sunny", icon: "01d" }],
  };
  const cityData = city || info || cityInfo;

  return (
    <div>
      <h1>{cityData.name}</h1>
      <h2>{cityData.country}</h2>
      <p>Founded: {cityData.founded}</p>
      <p>Population: {cityData.population}</p>
      {cityData.photos &&
        cityData.photos.length > 0 &&
        cityData.photos.map((photo) => (
          <img key={photo} src={convertToPhotoObject(photo).src} alt="City" />
        ))}
    </div>
  );
}
