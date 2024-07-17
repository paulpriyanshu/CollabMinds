import React from 'react';

const Modal = ({ isOpen, children }:any) => {
  if (!isOpen) return null;

  return (
    <div className=" flex justify-center items-center fixed inset-0  bg-white bg-opacity-50">
      <div className="shadow-lg">

     
        {children}
      </div>
    </div>
  );
};

export default Modal;
