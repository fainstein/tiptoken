"use client";

import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { NewCampaign } from "../../../types/campaign";
import { useAccount } from "wagmi";
import { networkList } from "@/constants/networks";
import useWalletService from "@/hooks/services/useWalletService";
import { useSnackbar } from "notistack";
import { useScopedI18n } from "@/locales/client";
import { Address } from "viem";
import CCLogo from "@/ui/images/cc-logo";
import MultipleSelectNetwork from "./multiple-select-network";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import { GetCampaignNameValidation } from "@/types/requests";
import { CheckCircleRounded, ErrorRounded } from "@mui/icons-material";

interface CreateCampaignFormProps {
  handlePostCampaign: (campaign: NewCampaign) => Promise<string>;
}

const CreateCampaignForm = ({
  handlePostCampaign,
}: CreateCampaignFormProps) => {
  const [selectedChains, setSelectedChains] = React.useState<string[]>(
    Object.keys(networkList)
  );
  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [goalCC, setGoalCC] = React.useState("");
  const [CCValue, setCCValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const { address: wagmiAddress } = useAccount();
  const [owner, setOwner] = React.useState<Address>();
  const walletService = useWalletService();
  const snackbar = useSnackbar();
  const t = useScopedI18n("create.form");
  const router = useRouter();
  const [isNameAvailable, setIsNameAvailable] =
    React.useState<GetCampaignNameValidation["isValid"]>(null);
  const { debouncedValue: debouncedName } = useDebounce(name, 3000);
  const [isLoadingNameValidation, setIsLoadingNameValidation] =
    React.useState(false);

  React.useEffect(() => {
    setOwner(wagmiAddress);
  }, [wagmiAddress]);

  React.useEffect(() => {
    const validateName = async () => {
      if (debouncedName) {
        const validation = await axios<GetCampaignNameValidation>(
          "api/campaign-name",
          {
            params: {
              name: debouncedName,
            },
          }
        );
        setIsNameAvailable(validation.data.isValid);
      }
      setIsLoadingNameValidation(false);
    };

    validateName();
  }, [debouncedName]);

  const btnState = React.useMemo<{ disabled: boolean; title: string }>(() => {
    if (!owner) {
      return { disabled: true, title: t("button.connect") };
    } else if (selectedChains.length === 0) {
      return { disabled: true, title: t("button.no-chains") };
    } else if (!name || !+CCValue) {
      return { disabled: true, title: t("button.sign") };
    }

    return { disabled: false, title: t("button.sign") };
  }, [owner, selectedChains, name, CCValue, t]);

  const handleCreateCampaign = async () => {
    if (!name || selectedChains.length === 0 || !owner || !+CCValue) {
      return;
    }

    const allowedChainIds = selectedChains.map((chainId) => Number(chainId));

    try {
      const { signature, message } =
        await walletService.getWalletVerifyingSignature();
      setIsLoading(true);

      const campaignName = await handlePostCampaign({
        name,
        allowedChainIds,
        signature,
        cafeCryptoUnit: +CCValue,
        goalCC: +goalCC > 0 ? +goalCC : null,
        owner,
        description,
        endDate: null,
        message,
        title,
      });
      router.push(`/campaign/${campaignName}`);
    } catch (e) {
      console.error(e);
      snackbar.enqueueSnackbar({
        variant: "error",
        message: (e as Error).message,
      });
      setIsLoading(false);
    }
  };

  const handleCcValueChange = (newValue: string) => {
    const inputRegex = RegExp(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/);
    if (inputRegex.test(newValue) || newValue === "") {
      setCCValue(newValue);
    }
  };

  const handleNameChange = (newValue: string) => {
    if (newValue !== name) {
      setIsLoadingNameValidation(!!newValue);
      setName(newValue);
      setIsNameAvailable(null);
    }
  };

  const validationResult = isLoadingNameValidation ? (
    <CircularProgress />
  ) : isNameAvailable === null ? (
    <></>
  ) : isNameAvailable ? (
    <CheckCircleRounded />
  ) : (
    <ErrorRounded />
  );

  const disableFormControls =
    isLoadingNameValidation || isNameAvailable === false;

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={3}
      maxWidth="sm"
    >
      <FormControl variant="outlined">
        <TextField
          id="campaignName"
          label={t("ccname")}
          value={name}
          onChange={(e) => handleNameChange(e.target.value.replace(/\s/g, ""))}
          InputProps={{
            endAdornment: validationResult,
          }}
          error={isNameAvailable === false}
        />
        <FormHelperText>
          {isNameAvailable === false
            ? t("ccname.notavailable")
            : `cafecrypto.com/${name.toLowerCase()}`}
        </FormHelperText>
      </FormControl>
      <FormControl variant="outlined">
        <TextField
          id="campaignTitle"
          label={t("cctitle")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={disableFormControls}
        />
      </FormControl>
      <MultipleSelectNetwork
        selectedChains={selectedChains}
        setSelectedChains={setSelectedChains}
        disabled={disableFormControls}
      />
      <FormControl variant="outlined">
        <InputLabel
          htmlFor="CCValue"
          sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
        >
          {t("ccvalue", {
            img: <CCLogo />,
          })}
        </InputLabel>
        <OutlinedInput
          id="CCValue"
          label={t("ccvalue", {
            img: <CCLogo />,
          })}
          inputProps={{ min: 1, step: 1 }}
          endAdornment={<InputAdornment position="end">USD</InputAdornment>}
          value={CCValue}
          onChange={(e) => handleCcValueChange(e.target.value)}
          disabled={disableFormControls}
        />
        <FormHelperText>{t("ccvalue-helper")}</FormHelperText>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="goalCC">{t("goal")}</InputLabel>
        <OutlinedInput
          id="goalCC"
          label={t("goal")}
          inputProps={{ min: 1, step: 1 }}
          endAdornment={
            <InputAdornment position="end">
              <CCLogo />
            </InputAdornment>
          }
          value={goalCC}
          onChange={(e) => setGoalCC(e.target.value.replace(/[^0-9]/g, ""))}
          disabled={disableFormControls}
        />
        {goalCC && (
          <FormHelperText>
            {t("goal-helper", {
              goal: +goalCC * +CCValue,
            })}
          </FormHelperText>
        )}
      </FormControl>
      <TextField
        id="multiline-message"
        label={t("description")}
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={disableFormControls}
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleCreateCampaign}
        disabled={isLoading || btnState.disabled || disableFormControls}
      >
        {isLoading ? <CircularProgress /> : btnState.title}
      </Button>
    </Box>
  );
};

export default CreateCampaignForm;
