import useSignUp from "@/libs/hooks/useSignUp";
import SignUpForm from "./register";

export default function RegistrationContainer() {
  const {
    details,
    setSelectedBranchId,
    branchOptions,
    isFormValid,
    isPasswordInvalid,
  } = useSignUp();
  return (
    <>
      <SignUpForm
        branchOptions={branchOptions}
        isFormValid={isFormValid}
        details={details}
        isPartner={false}
        setSelectedBranchId={(branchId: number) =>
          setSelectedBranchId(branchId)
        }
        isPasswordInvalid={isPasswordInvalid}
      />
    </>
  );
}
