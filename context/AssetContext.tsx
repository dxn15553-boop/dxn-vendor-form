import React, { useState, useEffect, createContext, useContext } from 'react';
import { DEFAULT_ASSETS } from '../constants';

type AssetContextType = {
  assets: typeof DEFAULT_ASSETS;
  updateAsset: (key: keyof typeof DEFAULT_ASSETS, value: string) => void;
  resetAssets: () => void;
};

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (!context) throw new Error('useAssets must be used within AssetProvider');
  return context;
};

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem('dxn_custom_assets');
    if (saved) {
      const parsed = JSON.parse(saved);
      const divisionKeys: (keyof typeof DEFAULT_ASSETS)[] = ['DIV_NUTRA', 'DIV_COFFEE', 'DIV_COSMETICS', 'DIV_KOMBUCHA', 'DIV_WETFOOD', 'DIV_AGRO'];
      divisionKeys.forEach(key => {
        if (!parsed[key] || parsed[key].includes('cloudinary') || parsed[key].includes('/public/') || parsed[key].includes('facility.jpg') || parsed[key] === '/coffee/cocozhi.png' || parsed[key] === '/cosmetics/cosmetics.png' || parsed[key] === '/agro/veg_minus.jpeg' || parsed[key] === '/agro/veg_minus.png') {
          parsed[key] = DEFAULT_ASSETS[key];
        }
      });
      return { ...DEFAULT_ASSETS, ...parsed };
    }
    return DEFAULT_ASSETS;
  });

  useEffect(() => {
    localStorage.setItem('dxn_custom_assets', JSON.stringify(assets));
  }, [assets]);

  const updateAsset = (key: keyof typeof DEFAULT_ASSETS, value: string) => {
    setAssets(prev => ({ ...prev, [key]: value }));
  };

  const resetAssets = () => {
    setAssets(DEFAULT_ASSETS);
    localStorage.removeItem('dxn_custom_assets');
  };

  return (
    <AssetContext.Provider value={{ assets, updateAsset, resetAssets }}>
      {children}
    </AssetContext.Provider>
  );
};
