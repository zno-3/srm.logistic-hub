import React from "react";
import { styled } from "@mui/material/styles";
import CloseSvg from "../../assets/icons/close.svg";
import DeletePhotoSvg from "../../assets/icons/delete-img-btn.svg";
import AddDocSvg from "../../assets/icons/add-doc.svg";
import { Dialog, DialogTitle } from "@mui/material";

export const AddDocModal = ({ open, title, onClose, arr, addImg, state, setState }) => {

  const deleteImg = (img) => {
    setState(state.filter(it => it !== img));
  }
  return (
    <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      555
    </Dialog>
    
   {/*
   
    <Wrapper>
      <ModalWindow>
        <Title>{title}</Title>
        <CloseBtn onClick={closeModal}>
          <img src={CloseSvg} alt="Close" />
        </CloseBtn>
        <ImagesWrapper>
          {arr?.map((it, index) => {
            return (
              <DeleteImgBtn key={index} onClick={() => deleteImg(it)}>
                <img className="doc-img" src={it} alt="img" />
                <img className="delete-icon" src={DeletePhotoSvg} alt="Delete img" />
              </DeleteImgBtn>
            );
          })}
          <button onClick={addImg}>
            <img src={AddDocSvg} alt="Add document" />
          </button>
        </ImagesWrapper>
      </ModalWindow>
    </Wrapper> 
   */}   
    
    </>

  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWindow = styled.div`
  position: relative;
  background-color: #fff;
  width: 80%;
  border-radius: 16px;
  padding: 20px;
  padding-bottom: 60px;
`;

const Title = styled.h1`
  color: #0e1c36;
  font-size: 24px;
  margin-bottom: 70px;
  font-family: Fixel-Regular;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px;
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  @media (max-width: 400px) {
    justify-content: center;
  }
`;

const DeleteImgBtn = styled.button`
  position: relative;
  height: 170px;
  width: 250px;

  .delete-img {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .doc-img {
    border-radius: 10px;
    height: 170px;
    width: 250px;
    object-fit: cover;
  }

  .delete-icon {
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;
