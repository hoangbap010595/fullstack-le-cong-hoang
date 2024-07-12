import { useCallback, useContext, useEffect, useMemo } from "react";
import { Form } from "../ui/forms/form";
import * as yup from "yup";
import { SwapAmmountInput } from "./types";
import Input from "../ui/forms/input";
import { Button } from "@headlessui/react";
import { SubmitHandler } from "react-hook-form";
import usePrices from "../../hooks/use-prices";
import { TokenContext } from "./context";
import Decimal from "decimal.js";

const inputValidationSchema = yup.object().shape({
  inputAmount: yup.number().min(0),
  outputAmount: yup.number().min(0),
});

const Swap = () => {
  const {
    tokenIn,
    tokenOut,
    inputAmount,
    outputAmount,
    setInputAmount,
    setOutputAmount,
  } = useContext(TokenContext);

  const { data: dataPrices } = usePrices();

  const onSubmit: SubmitHandler<SwapAmmountInput> = useCallback(() => {
    alert("You received: $" + outputAmount);
  }, [outputAmount]);

  const priceByTokenIn = useMemo(() => {
    if (!tokenIn || !dataPrices) return;

    return dataPrices
      .filter((price) => price.currency === tokenIn.name)
      .shift();
  }, [dataPrices, tokenIn]);

  useEffect(() => {
    if (!dataPrices) return;
    if (!tokenIn) return;
    if (!priceByTokenIn) return;

    const price = new Decimal(priceByTokenIn.price);
    const outAmount = price.mul(inputAmount || 0).toNumber();

    setOutputAmount(outAmount);
  }, [
    dataPrices,
    priceByTokenIn,
    tokenIn,
    tokenOut,
    inputAmount,
    outputAmount,
    setOutputAmount,
  ]);

  return (
    <div className="bg-white/10 rounded-3xl px-6 pt-10 pb-8 dark:bg-dark-300 sm:px-8 lg:p-12">
      <h5 className="font-bold text-3xl mb-10">Swap</h5>
      <div className="relative z-10 flex items-center">
        <div className="w-full shrink-0 text-left md:w-[680px]">
          <Form<SwapAmmountInput>
            onSubmit={onSubmit}
            validationSchema={inputValidationSchema}
            className="space-y-4 lg:space-y-5"
          >
            {({ register, formState: { errors } }) => (
              <>
                <div>
                  <Input
                    id="inputAmount"
                    label="Amount to send"
                    nickName="IN"
                    {...register("inputAmount")}
                    error={errors.inputAmount?.message}
                    onChange={(value) => setInputAmount(value)}
                    value={inputAmount}
                  />
                  <p className="my-2">
                    Price:{" "}
                    <span className="font-bold text-green-500">
                      {priceByTokenIn?.price}
                    </span>
                  </p>
                </div>
                <Input
                  id="outAmount"
                  label="Amount to receive"
                  nickName="OUT"
                  {...register("outputAmount")}
                  error={errors.outputAmount?.message}
                  onChange={(value) => setOutputAmount(value)}
                  value={outputAmount}
                  showTokenPicker={false}
                />

                <div className="flex items-center justify-center gap-2">
                  <Button
                    type="submit"
                    className="inline-flex items-center gap-2 w-full justify-center rounded-md bg-green-500 hover:bg-green-400 py-6 px-10 mt-5 text-xl font-semibold text-white"
                  >
                    CONFIRM SWAP
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Swap;
