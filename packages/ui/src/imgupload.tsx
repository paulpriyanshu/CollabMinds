import React from 'react';

interface UploadComponentProps {
  className: string;
  ready: boolean;
  isUploading: boolean;
  labelContent: React.ReactNode;
  buttonContent: React.ReactNode;
  allowedContent: React.ReactNode;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  className,
  ready,
  isUploading,
  labelContent,
  buttonContent,
  allowedContent,
}) => {
  const state = isUploading ? 'uploading' : (ready ? 'ready' : 'readying');

  return (
    <div className={className} data-state={state}>
      <svg data-ut-element="upload-icon" data-state={state}>
        {/* SVG content goes here */}
      </svg>
      <label data-ut-element="label" data-state={state}>
        {labelContent}
        <input disabled={!ready} />
      </label>
      <div data-ut-element="allowed-content" data-state={state}>
        {allowedContent}
      </div>
      <button
        data-ut-element="button"
        data-state={state}
        disabled={isUploading}
      >
        {buttonContent}
      </button>
    </div>
  );
};

export default UploadComponent;
