import { UIUser } from '@/types/user';
import Image from 'next/image';

interface PageProps {
  userData: UIUser;
  className: string;
}

export default function UserProfile({ userData, className }: PageProps) {
  return (
    <>
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="h-6.5 w-6.5 overflow-hidden rounded-full">
          {userData.avatar ? (
            <Image
              src={userData.avatar}
              alt="profile"
              width={26}
              height={26}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-6.5 w-6.5 rounded-full bg-gray-500"></div>
          )}
        </div>
        {/* <h1 className="text-[15px] font-semibold">{userData.name}</h1> */}
      </div>
    </>
  );
}
