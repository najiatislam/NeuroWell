import React from 'react';

const Wrapper = ({ children }) => {
  return (
    <div className='px-4 md:px-10 lg:px-20'>
      {children}
    </div>
  );
};

export default Wrapper;
