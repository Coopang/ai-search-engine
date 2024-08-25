"use client";
import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Button from "./Button";
import { Icons } from "./Icons";
import { useFormik } from "formik";
import ProgressBar from "./ProgressBar";

type Props = {};

const QueryBuilder = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const ChevronRightIcon = Icons["chevronRight"];

  const toggleModal = () => {
    setOpen((open) => !open);
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {},
  });

  const increaseStep = () => {
    if (step < 3) {
      setStep((step) => step + 1);
    }
  };

  const decreaseStep = () => {
    if (step > 0) {
      setStep((step) => step - 1);
    }
  };

  return (
    <div className="m-auto space-y-3">
      <p className="text-xl text-main-wine font-bold text-center">
        Not sure what you want? Let us{" "}
        <span className="text-main-green underline underline-offset-2">
          help!
        </span>
      </p>
      {/* <button
        onClick={toggleModal}
        className="flex items-center text-center justify-center underline m-auto"
      >
        Try our search assistant
        <ChevronRightIcon size={15} />
      </button> */}
      <Dialog open={open} onClose={toggleModal}>
        <DialogBackdrop className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-[800px] max-h-full  max-w-full space-y-4 bg-white dark:bg-black-light shadow-1 rounded-lg p-10">
            <ProgressBar step={step} />
            <form onSubmit={formik.handleSubmit}>
              <div className="my-5">
                {step === 0 ? (
                  <Step0 />
                ) : step === 1 ? (
                  <Step1 />
                ) : step === 2 ? (
                  <Step2 />
                ) : (
                  <Step3 />
                )}
              </div>
              <div className="flex justify-between items-center w-full">
                <Button onClick={decreaseStep} intent="outlineWine">
                  Go Back
                </Button>
                <Button onClick={increaseStep} intent="outlineWine">
                  Next
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default QueryBuilder;

const Step0 = () => {
  return <div></div>;
};

const Step1 = () => {
  return <div></div>;
};

const Step2 = () => {
  return <div></div>;
};
const Step3 = () => {
  return <div></div>;
};
