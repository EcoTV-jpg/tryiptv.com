
const THE_SPORTS_DB_BASE_URL = 'https://www.thesportsdb.com/api/v1/json';

const soccerLeagueIds = [
  '4328', // English Premier League
  '4335', // Spanish La Liga
  '4331', // German Bundesliga
  '4332', // Italian Serie A
  '4334', // French Ligue 1
  '4337', // Dutch Eredivisie
  '4346', // Major League Soccer
  '4429', // FIFA World Cup
] as const;

type TheSportsDbLeague = {
  strLeague?: string | null;
  strSport?: string | null;
  strPoster?: string | null;
  strFanart1?: string | null;
  strBanner?: string | null;
};

type TheSportsDbLeagueResponse = {
  leagues?: TheSportsDbLeague[] | null;
};

export type SportEvent = {
  title: string;
  src: string;
};

const fallbackSportEvents: SportEvent[] = [
  {
    title: 'English Premier League',
    src: 'https://r2.thesportsdb.com/images/media/league/poster/67al0l1719007596.jpg',
  },
];

async function getSoccerLeague(id: string): Promise<SportEvent | null> {
  const apiKey = process.env.THE_SPORTS_DB_API_KEY ?? '123';
  const response = await fetch(
    `${THE_SPORTS_DB_BASE_URL}/${apiKey}/lookupleague.php?id=${id}`,
    { next: { revalidate: 86400 } },
  );

  if (!response.ok) {
    throw new Error(`TheSportsDB returned ${response.status} for league ${id}`);
  }

  const data = (await response.json()) as TheSportsDbLeagueResponse;
  const league = data.leagues?.[0];
  const image = league?.strPoster ?? league?.strFanart1 ?? league?.strBanner;

  if (!league?.strLeague || league.strSport !== 'Soccer' || !image) {
    return null;
  }

  return {
    title: league.strLeague,
    src: image,
  };
}

export async function getSportEvents(): Promise<SportEvent[]> {
  const results = await Promise.allSettled(soccerLeagueIds.map(getSoccerLeague));
  const events = results.flatMap((result) =>
    result.status === 'fulfilled' && result.value ? [result.value] : [],
  );

  return events.length > 0 ? events : fallbackSportEvents;
}
