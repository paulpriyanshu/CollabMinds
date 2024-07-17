import React from 'react';
import { useRouter } from 'next/navigation';

interface MenuCardsProps {
  page?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const MenuCards: React.FC<MenuCardsProps> = ({ page, children, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (page) {
      router.push(`/${page}`);
    }
  };

  return (
    <button onClick={handleClick} className='m-5 mt-5 cursor-pointer p-3 px-20 hover:bg-slate-800 rounded-2xl text-center text-2xl'>
      {children}
    </button>
  );
};

export default MenuCards;
