import React, {
    Fragment,
    useCallback,
    //useEffect,
    useRef,
    useState,
  } from "react";
  
  import { Dialog, Transition } from "@headlessui/react";

  import { shortAddress } from "../utils/shortAddress"
  
  import Image from "next/image";
  import successIcon from "../public/success_icon.png";
  import errorIcon from "../public/error_icon.png";
  
  
  const AlertModal = ({ ...props }) => {
    let {
      title,
      body,
      isModalClosable,
      alertModalType,
      alertAssociatedWallet,
      isOpen,
      onClose,
      nounsBalance,
    } = props;
  
    const [dialogSelection, setDialogSelection] = useState(0);
  
  
    let imageBlock;
  
    if (alertModalType === "error") {
      title = "Error";
      body = "please try again later";
      imageBlock = (
        <div className="flex overflow-hidden justify-center items-center p-0 m-0 w-20 h-20 align-baseline  border-0 box-border">
          <Image
            className="cursor-auto rounded-md items-center origin-center"
            src={errorIcon}
            width="210"
            height="200"
            alt="nounimg"
          />
        </div>
      );
    }
  
    if (alertModalType === "wallet_disconnected") {
      title = "Error";
      body = "please connect your wallet and try again";
      imageBlock = (
        <div className="flex overflow-hidden justify-center items-center p-0 m-0 w-20 h-20 align-baseline  border-0 box-border">
          <Image
            className="cursor-auto rounded-md items-center origin-center"
            src={errorIcon}
            width="210"
            height="200"
            alt="nounimg"
          />
        </div>
      );
    }
  
    if (alertModalType === "success") {
      title = "Success!";
      body = "Thank you for delegating to nouncil.eth";
      imageBlock = (
        <div className="flex overflow-hidden justify-center items-center p-0 m-0 w-20 h-20 align-baseline  border-0 box-border">
          <Image
            className="cursor-auto rounded-md items-center origin-center"
            src={successIcon}
            width="210"
            height="200"
            alt="nounimg"
          />
        </div>
      );
    }
  
    if (alertModalType === "empty_noun_balance") {
      title = "Oh no!";
      body = `The connected wallet ${shortAddress(alertAssociatedWallet)} does not hold any nouns to delegate`;
      imageBlock = (
        <div className="flex overflow-hidden justify-center items-center p-0 m-0 w-20 h-20 align-baseline bg-amber-400 border-0 box-border">
          🥺
        </div>
      );
    }
  
    function modal() {
      return (
        <>
          {isOpen ? (
            <div className="max-w-full bg-stone-300 flex overflow-hidden relative flex-col p-0 m-0 w-64 tracking-wide text-left text-black align-baseline rounded-3xl border border-white border-solid md:w-64">
              <div className="p-0 m-0 text-left align-baseline border-0 box-border">
                <div className="flex flex-col p-0 m-0 text-black align-baseline border-0 box-border">
                  <div className="p-4 m-0 align-baseline border-0 box-border">
                    <div className="flex flex-col gap-3 justify-center items-center p-0 m-2 text-center align-baseline border-0 box-border">
                      <div className="absolute p-0 m-0 align-baseline border-0 box-border will-change-transform"></div>
                      <div className="p-0 m-0 align-baseline border-0 box-border">
                        <div
                          className="overflow-hidden relative p-0 m-0 w-20 h-20 align-baseline rounded-full border-0 select-none box-border"
                          aria-hidden="true"
                        >
                          <div className="flex overflow-hidden absolute justify-center items-center p-0 m-0 w-20 h-20 text-4xl align-baseline rounded-full border-0 select-none box-border will-change-transform">
                            {imageBlock}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-0 p-0 m-0 align-baseline border-0 box-border">
                        <div className="p-0 m-0 align-baseline border-0 box-border">
                          <h1
                            className="p-0 m-0 body font-sans text-lg font-extrabold leading-6 align-baseline border-0 box-border "
                            id="rk_profile_title"
                          >
                            {title}
                          </h1>
                        </div>
                        <div className="p-0 m-0 align-baseline border-0 box-border">
                          <h1
                            className="p-0 m-0 text-black font-sans text-sm font-semibold leading-4 align-baseline border-0 box-border"
                            id="rk_profile_title"
                          >
                            {body}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 p-0 mx-px mt-4 mb-px align-baseline border-0 box-border">
                      <button
                        className="flex relative justify-center items-center  bg-white p-2 m-0 w-full font-sans text-black align-baseline bg-none rounded-xl border-0 appearance-none cursor-pointer box-border will-change-transform"
                        type="button"
                        onClick={closeModal}
                      >
                        <div className="flex flex-col gap-px justify-center items-center px-0 pt-px pb-0 m-0 w-full align-baseline border-0 box-border">
                          <div className="p-0 m-0 align-baseline border-0 box-border"></div>
                          <div className="p-0 m-0 align-baseline border-0 box-border">
                            <div className="p-0 m-0 text-xs font-semibold leading-4 align-baseline border-0 box-border">
                              Ok
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      );
    }
  
    function closeModal() {
      if (props.isModalClosable) {
        props.setIsOpen(false);
        console.error("Can close");
  
        setDialogSelection(0);
      } else {
        console.error("Cant close");
      }
    }
  
    function openModal() {
      props.setIsOpen(true);
    }
  
    const cancelButtonRef = useRef();
  
    return (
      <>
        <Transition appear show={props.isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto flex flex-col justify-center items-center"
            onClose={closeModal}
            initialFocus={cancelButtonRef}
          >
            <div className="absolute top-1 right-1" ref={cancelButtonRef}>
              <button
                type="button"
                className="inline-flex justify-center px-2 py-1 text-sm font-medium text-gray-200 bg-gray-900 border border-transparent rounded hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={closeModal}
              >
                X
              </button>
            </div>
  
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
              </Transition.Child>
  
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="bg-transparent inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-background-gray-color rounded-2xl">
                  {modal()}
  
                  <br />
  
                  <div className="mt-2">{props.children}</div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  };
  
  export default AlertModal;
  