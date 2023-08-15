import React from 'react'

export default function MainTitle({children}) {
  return (
      <div>
          <h2 className="text-center font-bold text-3xl mt-6">{children}</h2>
      </div>
  );
}
