import { Header } from '@/components/layout/Header';
import { VideoHero } from '@/components/home/VideoHero';
import { StoreList } from '@/components/stores/StoreList';
import { Footer } from '@/components/layout/Footer';
import {
  getStarredStores,
  getHighRatedStores,
  getNewStores,
  getUpcomingStores
} from '@/lib/mock-data';

export default function Home() {
  // Get stores for each section
  const starredStores = getStarredStores();
  const highRatedStores = getHighRatedStores();
  const newStores = getNewStores();
  const upcomingStores = getUpcomingStores();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <VideoHero />

        <StoreList
          title="Starred Stores"
          description="Our most popular curated stores"
          stores={starredStores}
          viewAllHref="/stores/starred"
        />

        <StoreList
          title="Highly Rated Stores"
          description="Top-rated stores loved by our customers"
          stores={highRatedStores}
          viewAllHref="/stores/top-rated"
        />

        <StoreList
          title="New Stores"
          description="Fresh additions to our marketplace"
          stores={newStores}
          viewAllHref="/stores/new"
        />

        <StoreList
          title="Upcoming Stores"
          description="Exciting stores coming soon"
          stores={upcomingStores}
          viewAllHref="/stores/upcoming"
        />
      </main>

      <Footer />
    </div>
  );
}
