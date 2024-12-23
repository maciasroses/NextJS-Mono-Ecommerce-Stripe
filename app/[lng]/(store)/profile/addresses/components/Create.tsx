"use client";

import {
  GenericInput,
  Modal,
  SubmitButton,
  Toast,
} from "@/app/shared/components";
import { useModal, useResolvedTheme } from "@/app/shared/hooks";
import { Plus } from "@/app/shared/icons";
import { IAddressState } from "@/app/shared/interfaces";
import { createNewAddress } from "@/app/shared/services/address/controller";
import { cn } from "@/app/shared/utils/cn";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const Create = () => {
  const theme = useResolvedTheme();
  const { isOpen, onOpen, onClose } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialState: IAddressState = {
    message: "",
    errors: {},
  };

  const [error, action] = useFormState(createNewAddress, initialState);
  const { errors } = error ?? {};

  useEffect(() => {
    if (error && error.message === "OK") {
      Toast({
        theme,
        type: "success",
        message: "Address created successfully",
      });
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChangeIsSubmitting = (value: boolean) => {
    setIsSubmitting(value);
  };

  return (
    <>
      <button className="group text-blue-600" onClick={onOpen}>
        <Plus size="size-8" customClass="group-hover:text-blue-300" />
      </button>
      <Modal isOpen={isOpen} onClose={onClose} isForSideBar={false}>
        <h1 className="text-xl md:text-4xl">Create new address</h1>
        {error?.message && error?.message !== "OK" && (
          <p className="text-red-600">{error?.message}</p>
        )}
        <form action={action}>
          <fieldset
            disabled={isSubmitting}
            className={cn(isSubmitting && "opacity-50")}
          >
            <div className="flex flex-col gap-2">
              <GenericInput
                id="fullName"
                ariaLabel="Full name"
                type="text"
                placeholder="John Doe Doe"
                error={errors?.fullName}
                autoComplete="off"
              />
              <GenericInput
                id="address1"
                ariaLabel="Address 1"
                type="text"
                placeholder="1234 Main St"
                error={errors?.address1}
                autoComplete="off"
              />
              <GenericInput
                id="address2"
                ariaLabel="Address 2"
                type="text"
                placeholder="Apartment, studio, or floor"
                error={errors?.address2}
                autoComplete="off"
              />
              <GenericInput
                id="city"
                ariaLabel="City"
                type="text"
                placeholder="City"
                error={errors?.city}
                autoComplete="off"
              />
              <GenericInput
                id="state"
                ariaLabel="State"
                type="text"
                placeholder="State"
                error={errors?.state}
                autoComplete="off"
              />
              <GenericInput
                id="zipCode"
                ariaLabel="Zip code"
                type="text"
                placeholder="Zip code"
                error={errors?.zipCode}
                autoComplete="off"
              />
              <GenericInput
                id="country"
                ariaLabel="Country"
                type="text"
                placeholder="Country"
                error={errors?.country}
                autoComplete="off"
              />
              <GenericInput
                id="phoneNumber"
                ariaLabel="Phone number"
                type="text"
                placeholder="Phone number"
                error={errors?.phoneNumber}
                autoComplete="off"
              />
              <GenericInput
                id="additionalInfo"
                ariaLabel="Additional info"
                type="textarea"
                placeholder="Additional info"
                error={errors?.additionalInfo}
                autoComplete="off"
              />
              <div className="flex gap-2">
                <GenericInput
                  id="isDefault"
                  ariaLabel="Mark as default address"
                  type="checkbox"
                />
              </div>
            </div>
            <div className="text-center mt-4 w-full">
              <SubmitButton
                title="Create"
                handleChangeIsSearching={handleChangeIsSubmitting}
              />
            </div>
          </fieldset>
        </form>
      </Modal>
    </>
  );
};

export default Create;
