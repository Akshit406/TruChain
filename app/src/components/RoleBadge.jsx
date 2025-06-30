import React from 'react';

const RoleBadge = ({ address }) => {
  if (!address || address === '0x0000000000000000000000000000000000000000') {
    return null;
  }

  return (
    <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
      {`${address.substring(0, 6)}...${address.substring(38)}`}
    </span>
  );
};

export default RoleBadge;