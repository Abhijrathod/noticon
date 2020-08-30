/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { Loader } from 'notion-ui';
import UploadIconContext, { useUploadIconContext } from './context';
import { STEPS } from './constant';
import ChooseSource from './ChooseSource';
import ImageCrop from './ImageCrop';
import EditMetaData from './EditMetaData';
import { Noticon } from '../../types';

interface UploadIconProps {
  closeModal: () => void;
  unshightIcon: (icon: Noticon) => void;
}

export default function UploadIcon(props: UploadIconProps): JSX.Element {
  const { closeModal, unshightIcon } = props;
  const context = useUploadIconContext();
  const [step, setStep] = React.useState(context.step);
  const [cloudinaryTempUrl, setCloudinaryTempUrl] = React.useState(
    context.cloudinaryTempUrl,
  );
  const [loading, setLoading] = React.useState(context.loading);
  const [croppedImg, setCroppedImg] = React.useState(context.croppedImg);
  const [croppedImgUrl, setCroppedImgUrl] = React.useState(
    context.croppedImgUrl,
  );

  return (
    <UploadIconContext.Provider
      value={{
        step,
        setStep,
        cloudinaryTempUrl,
        setCloudinaryTempUrl,
        croppedImg,
        setCroppedImg,
        croppedImgUrl,
        setCroppedImgUrl,
        loading,
        setLoading,
        closeModal,
        unshightIcon,
      }}
    >
      {loading ? (
        <ModalLoader />
      ) : (
        <>
          {step === STEPS.chooseSource && <ChooseSource />}
          {step === STEPS.cropImage && <ImageCrop />}
          {step === STEPS.editMetaData && <EditMetaData />}
        </>
      )}
    </UploadIconContext.Provider>
  );
}

const ModalLoader = styled(Loader.ParentFull)`
  left: 0;
  top: 0;
`;
