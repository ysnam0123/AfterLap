import ConstructorHeader from '../sectionHeader/ConstructorHeader';
import DriverStandingsHeader from '../sectionHeader/DriverStandingsHeader';
import ConstructorStandingsSkeleton from './ConstructorStandingsSkeleton';
import DriverStandingsSkeleton from './DriverStandingsSkeleton';

export default function RankingSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <ConstructorHeader />
          <ConstructorStandingsSkeleton />
        </div>
        <div>
          <DriverStandingsHeader />
          <DriverStandingsSkeleton />
        </div>
      </div>
    </>
  );
}
