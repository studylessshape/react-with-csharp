import { getAllRoles } from "@/services/role";
import { handleResp } from "@/utils/respFlow";
import { Select, withField } from "@douyinfe/semi-ui";
import type { OptionProps, SelectProps } from "@douyinfe/semi-ui/lib/es/select";
import { useEffect, useState } from "react";

export function RoleSelect(props: SelectProps) {
  const { optionList, loading: _loading, ...selectProps } = props;
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([] as OptionProps[]);

  var renderLoading = false;
  useEffect(() => {
    if (!renderLoading) {
      renderLoading = true;
      setLoading(true);
      handleResp(getAllRoles(), {
        handleOk: (data) =>
          setRoles(
            data.map((d) => ({ value: d.claimValue, label: d.claimValue }))
          ),
      }).finally(() => {
        renderLoading = false;
        setLoading(false);
      });
    }
  }, []);

  return (
    <Select {...selectProps} loading={loading} optionList={roles}></Select>
  );
}

export const FormRoleSelect = withField(RoleSelect);
